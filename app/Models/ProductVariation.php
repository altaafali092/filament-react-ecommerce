<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductVariation extends Model
{
    protected $guarded = [];


    protected $casts = [
        'variation_types_option_ids' => 'array',
        'quantity' => 'integer',
        'in_stock' => 'boolean',
    ];

    // Decrease stock when order is placed
    public function decreaseStock(int $quantity = 1): void
    {
        $this->quantity = max(0, $this->quantity - $quantity);
        $this->in_stock = $this->quantity > 0;
        $this->save();
    }

    /**
     * Restock this variation
     */
    public function restock(int $quantity): void
    {
        $this->quantity += $quantity;
        $this->in_stock = true;
        $this->save();
    }
}
