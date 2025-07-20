<?php

namespace App\Http\Controllers;

use App\Enums\OrderStatusEnum;
use App\Mail\CheckoutCompleted;
use App\Mail\NewOrderMail;
use App\Mail\UserOrderConfirmationMail;
use App\Mail\VendorOrderNotificationMail;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\ProductVariation;
use App\Models\ShippingAddress;
use App\Services\CartService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Illuminate\Support\Str;


class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(CartService $cartService)
    {
        $cartItems = $cartService->getCartItemsGrouped();
        // Add this to check
        return Inertia::render('Frontend/CartIndex', [
            'cartItems' => $cartItems,
        ]);
    }

    public function store(Request $request, CartService $cartService, Product $product)
    {
        // Merge default quantity if not provided
        $request->mergeIfMissing([
            'quantity' => 1,
        ]);

        // Validate input
        $data = $request->validate([
            'option_ids' => ['nullable', 'array'],
            'quantity' => ['required', 'integer', 'min:1'],
        ]);

        // Normalize option IDs
        $optionIds = $data['option_ids'] ?? [];

        // Sort and stringify for comparison
        $normalizedOptionIds = collect($optionIds)->sort()->values()->toArray();

        // Find the matching variation
        $selectedVariation = $product->variations->first(function (ProductVariation $variation) use ($normalizedOptionIds) {
            $variationOptionIds = is_string($variation->variation_type_option_ids)
                ? json_decode($variation->variation_type_option_ids, true)
                : $variation->variation_type_option_ids;

            return collect($variationOptionIds)->sort()->values()->toArray() === $normalizedOptionIds;
        });

        // Optional: fallback to product-level stock validation
        if (!$selectedVariation) {
            // Just validate, don't decrease
            if ($product->quantity < $data['quantity']) {
                return back()->with('error', 'Requested quantity exceeds available stock.');
            }
        } else {
            if ($selectedVariation->quantity < $data['quantity']) {
                return back()->with('error', 'Requested quantity exceeds available stock.');
            }
        }

        // ✅ Add to cart — no stock decrease
        $cartService->addItemToCart($product, $data['quantity'], $optionIds);

        return back()->with('success', 'Item added to Cart Successfully');
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product, CartService $cartService)
    {
        $request->validate([
            'quantity' => ['integer', 'min:1'],
        ]);
        $optionIds = $request->input('option_ids') ?: [];
        $quantity = $request->input('quantity');

        $cartService->updateItemQuantity($product->id, $quantity, $optionIds);
        return back()->with('success', 'product quantity updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, CartService $cartService, Product $product)
    {
        // dd('Hit controller', $request->all());

        $cartService->removeItemFromCart($product->id, $request->input('option_ids'));
        return back()->with('success', 'Product removed successfully');
    }





    public function checkout(Request $request, CartService $cartService)
    {
        $vendorId = $request->input('vendor_user_id');
        $allCartItemsGrouped = $cartService->getCartItemsGrouped();

        if (empty($allCartItemsGrouped)) {
            return redirect()->route('cart.index')->with('error', 'Your cart is empty.');
        }

        DB::beginTransaction();

        try {
            $checkoutCartItems = $allCartItemsGrouped;

            if ($vendorId && isset($allCartItemsGrouped[$vendorId])) {
                $checkoutCartItems = [$vendorId => $allCartItemsGrouped[$vendorId]];
            }

            $orders = [];

            foreach ($checkoutCartItems as $vendorUserId => $vendorCart) {
                $cartItems = $vendorCart['items'];

                // Validate stock before proceeding
                foreach ($cartItems as $item) {
                    $product = Product::with('variations')->find($item['product_id']);
                    $optionIds = $item['option_ids'] ?? [];

                    // Find variation
                    $selectedVariation = $product->variations->first(function ($variation) use ($optionIds) {
                        $variationOptionIds = is_string($variation->variation_type_option_ids)
                            ? json_decode($variation->variation_type_option_ids, true)
                            : $variation->variation_type_option_ids;

                        return collect($variationOptionIds)->sort()->values()->toArray() === collect($optionIds)->sort()->values()->toArray();
                    });

                    // Check variation stock
                    if ($selectedVariation && $selectedVariation->quantity < $item['quantity']) {
                        DB::rollBack();
                        return back()->with('error', "Some items in your cart are no longer available.");
                    }

                    // Fallback to product-level stock
                    if (!$selectedVariation && $product->quantity < $item['quantity']) {
                        DB::rollBack();
                        return back()->with('error', "Some items in your cart are no longer available.");
                    }
                }

                // All stock is valid — proceed to create order
                $user = $request->user();
                $totalPrice = $vendorCart['totalPrice'] ?? 0;

                $order = Order::create([
                    'user_id' => $user->id,
                    'vendor_user_id' => $vendorCart['user']['id'],
                    'total_price' => $totalPrice,
                    'status' => OrderStatusEnum::Draft->value,
                    'payment_method' => 'cash_on_delivery',
                    'online_payment_commission' => 0,
                    'website_commision' => $totalPrice,
                    'vendor_commision' => $totalPrice,
                    'payment_intent' => null,
                    'payment_session_id' => Str::uuid(),
                ]);

                foreach ($cartItems as $cartItem) {
                    OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $cartItem['product_id'],
                        'quantity' => $cartItem['quantity'],
                        'price' => $cartItem['price'],
                        'variation_type_options_ids' => json_encode($cartItem['option_ids'] ?? []),
                    ]);

                    // Decrease stock now
                    $product = Product::with('variations')->find($cartItem['product_id']);
                    $optionIds = $cartItem['option_ids'] ?? [];

                    $selectedVariation = $product->variations->first(function ($variation) use ($optionIds) {
                        $variationOptionIds = is_string($variation->variation_type_option_ids)
                            ? json_decode($variation->variation_type_option_ids, true)
                            : $variation->variation_type_option_ids;

                        return collect($variationOptionIds)->sort()->values()->toArray() === collect($optionIds)->sort()->values()->toArray();
                    });

                    if ($selectedVariation) {
                        $selectedVariation->quantity -= $cartItem['quantity'];
                        $selectedVariation->in_stock = $selectedVariation->quantity > 0;
                        $selectedVariation->save();
                    } else {
                        $product->quantity -= $cartItem['quantity'];
                        $product->save();
                    }
                }

                // Email logic
                $shippingAddress = ShippingAddress::where('user_id', $user->id)->first();
                Mail::to($user->email)->send(new UserOrderConfirmationMail($order, $shippingAddress));

                $vendorEmail = $vendorCart['user']['email'] ?? null;
                if ($vendorEmail) {
                    Mail::to($vendorEmail)->send(new VendorOrderNotificationMail($order));
                }

                $orders[] = $order;
            }

            // ✅ Clear cart after order is created
            $cartService->clearCart();

            DB::commit();

            return redirect()->route('payment.success')->with('success', 'Thank you for your order!');
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error('Checkout Error: ' . $e->getMessage(), ['trace' => $e->getTrace()]);
            return back()->with('error', 'Order placement failed. Please try again.');
        }
    }
}
