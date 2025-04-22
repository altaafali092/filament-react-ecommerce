<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Product;
use App\Services\CartService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use PhpParser\Node\Expr\FuncCall;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(CartService $cartService)
    {
        $cartItems = $cartService->getCartItemsGrouped();
        // Add this to check
        return Inertia::render('Frontend/CartIndex', [
            'cartItems' => $cartItems,
        ]);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, CartService $cartService, Product $product)
    {
        $request->mergeIfMissing([
            'quantity' => 1,
        ]);
        $data = $request->validate([
            'option_ids' => ['nullable', 'array'],
            'quantity' => ['required', 'integer', 'min:1'],
        ]);
        $cartService->addItemToCart(
            $product,
            $data['quantity'],
            $data['option_ids'] ?: [],

        );
        return back()->with('success', 'product added successfully');
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product, CartService $cartService)
    {
        $request->validate([
            'quantity' => ['integer', 'min:1'],
        ]);
        $optionIds = $request->input('option_ids') ?: [];
        $quantity = $request->input('quantity');

        $cartService->updateItemQuantity($product->id, $quantity, $optionIds);
        return back()->with('success', 'product quantity updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, CartService $cartService, Product $product)
    {
        // dd('Hit controller', $request->all());


        $cartService->removeItemFromCart($product->id, $request->input('option_ids'));


        return back()->with('success', 'Product removed successfully');
    }




    public function checkout() {}
}
