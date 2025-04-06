<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductDetailResource;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Models\ProductVariation;
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

}
