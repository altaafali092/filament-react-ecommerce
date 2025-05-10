<?php

namespace App\Http\Middleware;

use App\Http\Resources\BannerResource;
use App\Http\Resources\OfficeSettingResource;
use App\Models\Banner;
use App\Models\OfficeSetting;
use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class HandleFrontendRequest
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $officeSettings = new OfficeSettingResource(OfficeSetting::first());
        $banners = new BannerResource(Banner::where('is_active',1)->latest()->get());

        Inertia::share([   
           
            'officeSettings'=> $officeSettings,
            'banners'=> $banners,
        ]);
        return $next($request);
    }
}
