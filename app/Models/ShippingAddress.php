<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ShippingAddress extends Model
{
    protected $fillable = [
        'user_id',
        'phone',
        'alternative_phone',
        'full_address',
        'city',
        'district',
        'province',
        'nearest_landmarks',
        'postal_code',
    ];
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
