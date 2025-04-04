<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

     public static $wrap= false;
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'price' => $this->price,
            'quantity' => $this->quantity,
            'image' => $this->getFirstMediaUrl('images'),
            'images' => $this->getMedia('images')->map(function ($image) {
                return [
                    'id' => $image->id,
                    'thumb'=> $image->getUrl('thumb'),
                    'small'=> $image->getUrl('small'),
                    'large'=> $image->getUrl('large'),

                ];
            }),
            'user' => [
                'id' => $this->created_by,
                'name' => $this->user->name,
            ],
            'department' => [
                'id' => $this->department->id,
                'name' => $this->department->name,
            ],
            'variationTypes'=>$this->variationTypes->map(function($variationType){
                return [
                    'id' => $variationType->id,
                    'name' => $variationType->name,
                    'type' => $variationType->type,
                    'options' => $variationType->options->map(function($option){
                        return [
                            'id' => $option->id,
                            'name' => $option->name,
                            'images'=>$option->getMedia('images')->map(function($image){
                                return [
                                    'id' => $image->id,
                                    'thumb'=> $image->getUrl('thumb'),
                                    'small'=> $image->getUrl('small'),
                                    'large'=> $image->getUrl('large'),
                                ];
                            }),

                        ];
                    }),
                ];
            }),
            'variations'=>$this->variations->map(function($variation){
                return [
                    'id' => $variation->id,
                    'quantity' => $variation->quantity,
                    'price' => $variation->price,
                    'variation_type_option_ids' => $variation->variation_types_option_ids,
                ];
            })
        ];
    }
}
