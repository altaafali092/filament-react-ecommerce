<?php

namespace App\Models;

use Filament\Pages\Concerns\InteractsWithHeaderActions;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class VariationTypeOption extends Model implements HasMedia
{
    use InteractsWithMedia;

    public $timestamps= false;
    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('thumb')
            ->width(100);
        $this->addMediaConversion('small')
            ->width(300);
        $this->addMediaConversion('large')
            ->width(1200);
    }
}
