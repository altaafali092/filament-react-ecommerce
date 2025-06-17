<?php

namespace App\Http\Middleware;

use App\Http\Resources\BannerResource;
use App\Http\Resources\MenuResource;
use App\Http\Resources\OfficeSettingResource;
use App\Models\Banner;
use App\Models\MenuSetting;
use App\Models\OfficeSetting;
use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class HandleFrontendRequest
{
    /**
     * Handle an incoming request.
     
     */
    public function handle(Request $request, Closure $next): Response
    {
        $officeSettings = new OfficeSettingResource(OfficeSetting::firstOrFail());

        $banners = BannerResource::collection(
            Banner::where('is_active', 1)
                ->latest()
                ->get()
        );

        $menus = MenuResource::collection(
            MenuSetting::where('is_active', 1)
                ->whereNull('menu_id') // only top-level menus
                ->with(['children' => fn($query) => $query->where('is_active', 1)])
                ->orderBy('position')
                ->get()
        )->resolve();

        Inertia::share([

            'officeSettings' => $officeSettings,
            'banners' => $banners,
            'menus' => $menus,
        ]);
        return $next($request);
    }
}
