<?php

namespace App\Http\Controllers;

use App\Http\Requests\Vendor\Register\StoreVendorRegisterRequest;
use App\Http\Resources\BannerResource;
use App\Http\Resources\BlogResource;
use App\Http\Resources\FAQResource;
use App\Http\Resources\ProductDetailResource;
use App\Http\Resources\ProductResource;
use App\Http\Resources\SliderResource;
use App\Models\Banner;
use App\Models\Blog;
use App\Models\FAQ;
use App\Models\Product;
use App\Models\ProductVariation;
use App\Models\ShippingAddress;
use App\Models\Slider;
use App\Models\User;
use App\Models\Vendor;
use App\Models\VendorUser;
use App\Services\CartService;
use Doctrine\DBAL\Query\Limit;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class FrontendController extends Controller
{
    public function index()
    {
        $products = Product::where('status', 'published')->paginate(10);
        $blogs = Blog::where('status', 1)->limit(3)->latest()->get();
        $sliders=Slider::where('status',1)->latest()->get();
        $faqs =FAQ::where('status', 1)->limit(5)->latest()->get();
        $banners=Banner::where('is_active',1)->latest()->get();
        return Inertia::render('welcome', [
            'products' => ProductResource::collection($products),
            'blogs' => BlogResource::collection($blogs)->toArray(request()),
            'sliders' => SliderResource::collection($sliders)->toArray(request()),
            'faqs'=>FAQResource::collection($faqs)->toArray(request()),
            'banners'=>BannerResource::collection($banners)->toArray(request()),

        ]);
    }
    public function productDetail(Product $product)
    {
        $product->load([
            'user',
            'department',
            'variationTypes.options.media', // to load options and their images
            'variations', // most important!
        ]);

        return Inertia::render('Frontend/Product/ProductDetail', [
            'product' => new ProductDetailResource($product),
            'variationOptions' => request('options', []),
        ]);
    }



    public function cartInfo()
    {
        $user = Auth::user();
        $cartItems = app(CartService::class)->getCartItems();
        $shipping = ShippingAddress::with('user')->where('user_id', Auth::id())->first();
        return Inertia::render('Frontend/Checkout/CheckoutDetail', [
            'user' => $user,
            'cartItems' => $cartItems,
            'shipping' => $shipping,
        ]);
    }


    public function blogs()
    {
        $blogs = Blog::where('status', 1)->latest()->get();

        return Inertia::render('Frontend/Blogs/Index', [

            'blogs' => BlogResource::collection($blogs)->toArray(request()),
        ]);
    }
    public function blogDetails(Blog $blog)
    {

        return Inertia::render('Frontend/Blogs/Show', [

            'blog' => new BlogResource($blog),
        ]);
    }

    public function vendorRegisterPage()
    {
        return Inertia::render('vendorUser/Register');
    }

    public function vendorRegister(StoreVendorRegisterRequest $request)
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);

        User::create($data + ['role' => 'vendor', 'vendor_status' => 'pending']);
        return Inertia::location(route('filament.admin.auth.login'));

    }

    public function faqs()
    {
        $faqs = FAQ::where('status', 1)->latest()->get();
        return Inertia::render('Frontend/FAQ/Index', [
            'faqs' => FAQResource::collection($faqs)->toArray(request()),
        ]);
    }
}
