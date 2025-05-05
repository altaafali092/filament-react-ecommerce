<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BlogResource extends JsonResource
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
            'id'=>$this->id,
            'title'=>$this->title,
            'slug'=>$this->slug,
            'image' => $this->image ? asset('storage/' . $this->image) : null,
            'description'=>$this->description,
            'published_by'=>$this->published_by,
            'created_at'=>$this->created_at,
        ];
    }
}
