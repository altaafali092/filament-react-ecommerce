<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OfficeSettingResource extends JsonResource
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
            'office_logo' => $this->office_logo ? asset('storage/' . $this->office_logo) : null,
            'office_name' => $this->office_name,
            'office_address' => $this->office_address,
            'office_phone' => $this->office_phone,
            'office_email' => $this->office_email,
            'office_facebook' => $this->office_facebook,
            'office_tiktok' => $this->office_tiktok,
            'office_youtube' => $this->office_youtube,
            'office_instagram' => $this->office_instagram,
            'office_whatsapp' => $this->office_whatsapp,
        ];
    }
}
