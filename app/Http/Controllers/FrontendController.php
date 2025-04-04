<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;

use Inertia\Inertia;

class FrontendController extends Controller
{
    public function index()
    {
        $products=Product::where('status','published')->paginate(10);
        return Inertia::render('welcome',[
            'products'=>ProductResource::collection($products),
        ]);
    }
    public function detail()
    {
        return Inertia::render('Frontend/Product/ProductDetail');

    }
}
