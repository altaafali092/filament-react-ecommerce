<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductDetailResource;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Models\ProductVariation;
use App\Models\ShippingAddress;
use App\Services\CartService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FrontendController extends Controller
{
    public function index()
    {
        $products = Product::where('status', 'published')->paginate(10);
        return Inertia::render('welcome', [
            'products' => ProductResource::collection($products),
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
            'shipping'=>$shipping,
        ]);
    }
}
