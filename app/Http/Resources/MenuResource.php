<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MenuResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    // public static $wrap = false;
    public function toArray(Request $request): array
    {
        return[
            'id'=>$this->id,
            'menu_id'=>$this->menu_id,
            'title'=>$this->title,
            'slug'=>$this->slug,
            'menu_type'=>$this->menu_type,
            'menuable_id'=>$this->menuable_id,
            'menuable_key'=>$this->menuable_key,
            'menu_url'=>$this->menu_url,
            'position'=>$this->position,
            'is_active'=>$this->is_active,

            'children' => MenuResource::collection($this->whenLoaded('children')),
        ];
    }
}
