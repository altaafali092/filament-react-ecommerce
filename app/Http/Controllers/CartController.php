<?php

namespace App\Http\Controllers;

use App\Enums\OrderStatusEnum;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Services\CartService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use PhpParser\Node\Expr\FuncCall;

use function Pest\Laravel\delete;

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



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, CartService $cartService, Product $product)
    {
        $request->mergeIfMissing([
            'quantity' => 1,
        ]);
        $data = $request->validate([
            'option_ids' => ['nullable', 'array'],
            'quantity' => ['required', 'integer', 'min:1'],
        ]);
        $cartService->addItemToCart(
            $product,
            $data['quantity'],
            $data['option_ids'] ?: [],

        );
        return back()->with('success', 'product added successfully');
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
        $allCartItems = $cartService->getCartItemsGrouped();

        if (empty($allCartItems)) {
            return redirect()->route('cart.index')->with('error', 'Your cart is empty.');
        }

        DB::beginTransaction();

        try {
            $checkoutCartItems = $allCartItems;

            if ($vendorId && isset($allCartItems[$vendorId])) {
                $checkoutCartItems = [$vendorId => $allCartItems[$vendorId]];
            }

            $orders = [];

            foreach ($checkoutCartItems as $vendorUserId => $item) {
                $user = $item['user'];
                $cartItems = $item['items'];

                $totalPrice = $item['totalPrice'] ?? 0;

                $order = Order::create([
                    'user_id' => $request->user()->id,
                    'vendor_user_id' => $user['id'],
                    'total_price' => $totalPrice,
                    'status' => OrderStatusEnum::Draft->value,
                    'payment_method' => 'cash_on_delivery',
                    'online_payment_commission' => 0,
                    'website_commision' => $totalPrice,
                    'vendor_commision' => $totalPrice,
                    'payment_intent' => null,
                ]);

                foreach ($cartItems as $cartItem) {
                    OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $cartItem['product_id'],
                        'quantity' => $cartItem['quantity'],
                        'price' => $cartItem['price'],
                        'variation_type_options_ids' => json_encode($cartItem['option_ids'] ?? []),
                    ]);
                }

                $orders[] = $order;
            }

            // Optionally, delete items from the cart if the order is confirmed
            $deleted = CartItem::query()
                ->where('user_id', $order->user_id)
                ->whereIn('product_id', $order->orderItems->pluck('product_id')->toArray())
                ->where('saved_for_later', false)
                ->delete();

            DB::commit();
            

            return redirect()->route('payment.success')->with('success', 'Thank you for your order!');
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error('Checkout Error: ' . $e->getMessage(), [
                'trace' => $e->getTrace()
            ]);

            return back()->with('error', 'Order placement failed. Please try again.');
        }
    }
}
