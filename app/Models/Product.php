<?php

namespace App\Models;

use App\Enums\ProductEnum;
use App\Filament\Resources\ProductResource;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Product extends Model implements HasMedia
{
    use InteractsWithMedia;



    // public $casts =
    // [
    //     'variations' => 'array',
    // ];
    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('thumb')
            ->width(100);
        $this->addMediaConversion('small')
            ->width(300);
        $this->addMediaConversion('large')
            ->width(1200);
    }

    public function scopeForVendor(Builder $query)
    {
        return $query->where('created_by', auth()->user()->id);
    }

    public function scopePublished(Builder $query)
    {
        return $query->where('status', ProductEnum::Published);
    }
    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
    public function variationTypes(): HasMany
    {
        return $this->hasMany(VariationType::class);
    }


    // app/Models/Product.php

    public function variations(): HasMany
    {
        return $this->hasMany(ProductVariation::class, 'product_id');
    }
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function getPriceForOptions($optionIds = [])
    {
        $optionIds = array_values($optionIds);
        sort($optionIds);

        foreach ($this->variations as $variation) {
            $a = $variation->variation_type_options_ids;

            // If it's stored as JSON in the database, decode it
            if (is_string($a)) {
                $a = json_decode($a, true);
            }

            if (!is_array($a)) {
                continue; // Skip this variation if it's still not an array
            }

            sort($a);

            if ($optionIds == $a) {
                return $variation->price !== null ? $variation->price : $this->price;
            }
        }

        return $this->price;
    }

    public function getImagesForOptions(array $optionIds= null)
    {
        if($optionIds){
            $optionIds = array_values($optionIds);
            sort($optionIds);
            $options = VariationTypeOption::whereIn('id',$optionIds)->get();

            foreach ($options as $key => $option) {

                $image = $option->getFristMediaUrl('images','small');
                if($image){
                    return $image;
                }
            }
        }
        return $this->getFirstMediaUrl('images','small');
    }

}
