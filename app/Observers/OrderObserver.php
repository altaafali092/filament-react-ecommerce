<?php

namespace App\Observers;

use App\Models\Order;
use App\Models\User;
use Filament\Notifications\Notification;

class OrderObserver
{
    /**
     * Handle the Order "created" event.
     */
    public function created(Order $order): void
    {
        // 1. Notify Admins
        $admins = User::where('role', 'superadmin')->get();

        foreach ($admins as $admin) {
            Notification::make()
                ->title('🔔 New Order Placed')
                ->body("A new order #{$order->id} has been placed by {$order->customer_name}.")
                ->sendToDatabase($admin, false);
        }

        // 2. Notify Related Vendor (if exists)
        if ($order->vendor_id) {
            $vendor = User::find($order->vendor_id);

            if ($vendor) {
                Notification::make()
                    ->title('📦 New Order for Your Product')
                    ->body("An order #{$order->id} has been placed for your item(s).")
                    ->sendToDatabase($vendor, false);
            }
        }
    }


    /**
     * Handle the Order "updated" event.
     */
    public function updated(Order $order): void
    {
        //
    }

    /**
     * Handle the Order "deleted" event.
     */
    public function deleted(Order $order): void
    {
        //
    }

    /**
     * Handle the Order "restored" event.
     */
    public function restored(Order $order): void
    {
        //
    }

    /**
     * Handle the Order "force deleted" event.
     */
    public function forceDeleted(Order $order): void
    {
        //
    }
}
