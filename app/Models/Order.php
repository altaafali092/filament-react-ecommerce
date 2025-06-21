<?php

namespace App\Models;

use Filament\Notifications\Notification;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Notifications\Notifiable;

class Order extends Model
{
    // public $timestamps = false;

    use  Notifiable;
 

    protected $fillable = [
        'payment_session_id',
        'user_id',
        'vendor_user_id', 
        'total_price',
        'status',
        'payment_method', 
        'online_payment_commission',
        'website_subtotal',
        'vendor_subtotal',
        'payment_intent',
    ];

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function vendorUser():BelongsTo
    {
        return $this->belongsTo(User::class,'vendor_user_id');
    }
    public function vendor(): BelongsTo
    {
        return $this->belongsTo(Vendor::class,'vendor_user_id','user_id');
    }



    protected static function booted()
{
    static::updated(function ($order) {
        if ($order->isDirty('status')) {
            Notification::make()
                ->title('Status Updated')
                ->body('Order ID "' . $order->id . '" status updated to "' . ucfirst($order->status) . '".')
                ->success()
                ->sendToDatabase(auth()->user());
        }
    });
}
}
