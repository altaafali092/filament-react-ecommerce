<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductVariation extends Model
{
    protected $guarded = [];

    protected $casts =
    [
        'variation_types_option_ids' => 'json',
    ];
    // public function product()
    // {
    //     return $this->belongsTo(Product::class);
    // }
}
