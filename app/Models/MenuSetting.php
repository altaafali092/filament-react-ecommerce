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

    // 👇 Eager load children
    protected $with = ['children'];

    public function url(): Attribute
    {
        return Attribute::get(function ($value, array $attributes) {
            $this->loadMissing('menuable');
            return match ($attributes['menu_type']) {
                // MenuTypeEnum::CATEGORY->value => route('front.shopByCategory', $attributes['slug']),
                MenuTypeEnum::CATEGORY->value =>route('shopByCategory', ['category' => $attributes['slug']]),
                MenuTypeEnum::STATIC->value => route('front.static', $attributes['slug']),
                default => '#',
            };
        });
    }


    protected static function booted(): void
    {
        static::saving(function ($menuSetting) {
            $menuSetting->loadMissing('menuable');
            if ($menuSetting->menu_type === 'static') {
                $menuSetting->menu_url = route('front.static', ['slug' => $menuSetting->slug]);
            }
            if ($menuSetting->menu_type === MenuTypeEnum::CATEGORY->value && $menuSetting->menuable) {
                $menuSetting->menu_url = route('shopByCategory', [
                    'category' => $menuSetting->menuable->name // or use slug if your route uses slug
                ]);
            }
        });
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(MenuSetting::class, 'menu_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(MenuSetting::class, 'menu_id');
    }

    public function menuable()
    {
        return $this->morphTo();
    }
}
