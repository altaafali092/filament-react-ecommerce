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


    public function variations(): HasMany
    {
        return $this->hasMany(ProductVariation::class, 'product_id');
    }
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
