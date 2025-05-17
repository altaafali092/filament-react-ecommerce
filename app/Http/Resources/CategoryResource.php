<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
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
            'name' => $this->name,
            'slug' => $this->slug,
            'image' => $this->image ? asset('storage/' . $this->image) : null,
            'active'=> $this->active,
            'parent_id' => $this->parent_id,
            'is_featured' => $this->is_featured,
            // 'children' => CategoryResource::collection($this->children),
        ];
    }
}
