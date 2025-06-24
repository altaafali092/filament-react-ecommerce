<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderItem extends Model
{

    public $timestamps = false;

    protected $fillable = [

        'order_id',
        'product_id',
        'quantity',
        'price',
        'variation_type_options_ids',
    ];

    protected $casts = [
        'variation_type_options_ids' => 'array', 
    ];
    

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }


    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function getVariationDetailsAttribute()
{
    $result = [];

    if (!is_array($this->variation_type_options_ids)) {
        return $result;
    }

    foreach ($this->variation_type_options_ids as $variationTypeId => $optionId) {
        $type = \App\Models\VariationType::find($variationTypeId);
        $option = \App\Models\VariationTypeOption::find($optionId);

        if ($type && $option) {
            $result[] = [
                'type_id' => $type->id,
                'type_name' => $type->name,
                'option_id' => $option->id,
                'option_name' => $option->name,
            ];
        }
    }

    return $result;
}

}
