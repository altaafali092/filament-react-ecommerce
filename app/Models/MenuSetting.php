<?php

namespace App\Models;

use App\Enums\MenuType;
use App\Enums\MenuTypeEnum;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MenuSetting extends Model
{
    protected $fillable = [
        'menuable_type',
        'menuable_id',
        'title',
        'slug',
        'menu_id',
        'menuable_key',
        'position',
        'menu_type',
        'menu_url',
        'is_active',
        'created_by',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'menu_id' => 'integer',
        'position' => 'integer',
        'menu_type' => MenuTypeEnum::class,
    ];

    protected $appends = ['url'];

    protected $with = ['menus'];

    /*
     |--------------------------------------------------------------------------
     | Accessors
     |--------------------------------------------------------------------------
     */
    public function url(): Attribute
    {
        return Attribute::get(function ($value, array $attributes) {
            $this->loadMissing('menuable');

            return match ($attributes['menu_type']) {
            
                MenuTypeEnum::CATEGORY->value,
                MenuTypeEnum::STATIC->value => route('front.static', $attributes['slug']),
                default => '#',
            };
        });
    }

    
    protected static function booted(): void
    {
        static::saving(function ($menuSetting) {
            if ($menuSetting->menu_type === 'static') {
                $menuSetting->menu_url = route('front.static', ['slug' => $menuSetting->slug]);
            }
        });
    }

    /*
     |--------------------------------------------------------------------------
     | Relationships
     |--------------------------------------------------------------------------
     */
    public function menu(): BelongsTo
    {
        return $this->belongsTo(MenuSetting::class, 'menu_id');
    }

    public function menus(): HasMany
    {
        return $this->hasMany(MenuSetting::class, 'menu_id');
    }

    public function menuable() // 👈 Add this method
    {
        return $this->morphTo();
    }
}
