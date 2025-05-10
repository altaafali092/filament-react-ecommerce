<?php

namespace App\Http\Controllers;

use App\Enums\OrderStatusEnum;
use App\Http\Resources\OrderViewResource;
use App\Models\CartItem;
use App\Models\Order;
use Doctrine\DBAL\Driver\PgSQL\Exception\UnexpectedValue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use UnexpectedValueException;


class PaymentControlller extends Controller
{
    // public function success(Request $request)
    // {
    //     $user = Auth::user();
    //     $session_id = $request->get('session_id');
    //     $orders = Order::where('payment_session_id', $session_id)
    //     ->where('user_id', $user->id)
    //     ->get();

    //     if ($orders->count() === 0) {
    //         abort(400);
    //     }
    //     foreach ($orders as $order) {
    //         if ($order->user_id !== $user->id) {
    //             abort(403);
    //         }
    //     }

    //     return Inertia::render('Frontend/Payment/Success', [
    //         'orders' => OrderViewResource::collection($orders),
    //     ])->with('success','Your order has been placed');

    // }
    public function success(Request $request)
    {
        $user = Auth::user();

        // Get most recent orders for this user
        $orders = Order::where('user_id', $user->id)
            ->orderByDesc('created_at')
            ->limit(10) // or however many you want to show
            ->get();

        if ($orders->isEmpty()) {
            return redirect()->route('cart.index')->with('error', 'You have no orders yet.');
        }

        return Inertia::render('Frontend/Payment/Success', [
            'orders' => OrderViewResource::collection($orders),
        ])->with('success', 'Your order has been placed');
    }

    public function failure()
    {
        return "failed";
    }

    public function webhook(Request $request)
    {
        // Cash on Delivery doesn't require Stripe webhook processing
        // So, if the order is Cash on Delivery, simply update the order status

        $orderId = $request->input('order_id'); // Assuming the order ID is passed in the request for COD
        $order = Order::find($orderId);

        if (!$order) {
            return response('Order not found', 404);
        }

        if ($order->payment_method !== 'cash_on_delivery') {
            return response('Incorrect payment method for this order', 400);
        }

        DB::beginTransaction();

        try {
            // Update order status to "Paid" for COD
            $order->status = OrderStatusEnum::Paid->value;
            $order->save();

            // Mark the order items as processed (e.g., reduce inventory)
            foreach ($order->orderItems as $orderItem) {
                /** @var OrderItem $orderItem */
                $options = $orderItem->variation_type_options_ids;
                $product = $orderItem->product;
                if ($options) {
                    sort($options);
                    $variation = $product->variations()
                        ->where('variation_type_option_ids', $options)
                        ->first();
                    if ($variation && $variation->quantity !== null) {
                        $variation->quantity -= $orderItem->quantity;
                        $variation->save();
                    }
                } else {
                    if ($product->quantity !== null) {
                        $product->quantity -= $orderItem->quantity;
                        $product->save();
                    }
                }
            }

            // Optionally, delete items from the cart if the order is confirmed
            CartItem::query()
                ->where('user_id', $order->user_id)
                ->whereIn('product_id', $order->orderItems->pluck('product_id')->toArray())
                ->where('save_for_later', false)
                ->delete();

            DB::commit();

            return response('Order processed successfully', 200);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error processing COD order: ' . $e->getMessage(), [
                'trace' => $e->getTrace()
            ]);
            return response('Error processing order', 500);
        }
    }
}
