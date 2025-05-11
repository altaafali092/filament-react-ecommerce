<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderViewResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    public static $wrap = false;

    public function toArray(Request $request): array
    {
        return [

            'id' => $this->id,
            'total_price' => $this->total_price,
            'status' => $this->status,
            'created_at' => $this->created_at ? \Carbon\Carbon::parse($this->created_at)->format('Y-m-d H:i:s') : null,
            'vendorUser' => new VendorUserResource($this->vendorUser),
            'orderItems' => $this->orderItems->map(fn($item) => [
                'id' => $this->id,
                'quantity' => $item->quantity,
                'price' => $item->price,
                'variation_type_option_ids' => $item->variation_type_option_ids,
                'product' => [
                    'id' => $item->product->id,
                    'title' => $item->product->title,
                    'slug' => $item->product->slug,
                    'description' => $item->product->description,
                    'image' => $item->product->getImagesForOptions($item->variation_type_option_ids ?: []),
                ]

            ])
        ];
    }
}
