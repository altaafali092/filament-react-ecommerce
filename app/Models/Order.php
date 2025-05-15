<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    // public $timestamps = false;

    protected $fillable = [
        'payment_session_id',
        'user_id',
        'vendor_user_id', // Add this field
        'total_price',
        'status',
        'payment_method', // Add this field
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


    
    


    protected function status(): Attribute
    {
        return Attribute::make(
            get: fn(string $value) => strtolower($value),
            set: fn(string $value) => strtolower($value),
        );
    }
}
