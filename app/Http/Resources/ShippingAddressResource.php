<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShippingAddressResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'phone' => $this->phone,
            'alternative_phone' => $this->alternative_phone,
            'full_address' => $this->full_address,
            'city' => $this->city,
            'district' => $this->district,
            'province' => $this->province,
            'nearest_landmarks' => $this->nearest_landmarks,
            'postal_code' => $this->postal_code,
        ];
    }
}
