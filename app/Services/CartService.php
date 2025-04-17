<?php

namespace App\Services;

use App\Models\CartItem;
use App\Models\Product;
use App\Models\VariationType;
use App\Models\VariationTypeOption;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;


use function Pest\Laravel\json;

class CartService
{


    private ?array $cachedCartItems = null;

    protected const COOKIE_NAME = 'cartItem';

    protected const COOKIE_LIFETIME = 60 * 24 * 365;


    public function addItemToCart(Product $product, int $quantity = 1, $optionIds = null)
    {
        if ($optionIds === null) {
            $optionIds = $product->variationTypes
                ->mapWithKeys(fn(VariationType $type) => [$type->id => $type->options[0]?->id])
                ->toArray();
        }
        $price = $product->getPriceForOptions($optionIds);

        if (Auth::check()) {
            $this->saveItemToDatabase($product->id, $quantity, $price, $optionIds);
        } else {
            $this->saveItemToCookies($product->id, $quantity, $price, $optionIds);
        }
    }

    public function updateItemQuantity(int $productId, int $quantity, $optionIds = null)
    {
       if(Auth::check()){
        $this->updateItemQuantityInDatabase($productId,$quantity,$optionIds);
       }else{
        $this->updateItemQuantityInCookies($productId,$quantity,$optionIds);
       }
    }
    public function removeItemFromCart(int $productId,int $quantity, $optionIds = null)
    {
        if(Auth::check()){
            $this->removeCartItemFromDatabase($productId,$quantity,$optionIds);
        }else{
            $this->removeCartItemsFromCookies($productId,$quantity,$optionIds);
        }
    }
    public function getCartItems(): array
    {
        try {
            if ($this->cachedCartItems === null) {
                if (Auth::check()) {
                    $cartItems = $this->getCartItemsFromDatabase();
                } else {
                    $cartItems = $this->getCartItemsFromCookies();
                }
                $productIds = collect($cartItems)->map(fn($item) => $item['product_id']);
                $products = whereIn('id', $productIds)->with('user.vendor')->get()->keyBy('id');

                $cartItemData = [];
                foreach ($cartItems as $key => $cartItem) {
                    $product = data_get($products, $cartItem['product_id']);
                    if (!$product) continue;

                    $optionInfo = [];
                    $options = VariationTypeOption::with('variationType')
                        ->whereIn('id', $cartItem['option_ids'])
                        ->get()->keyBy('id');

                    $imageUrl = null;
                    foreach ($cartItem['options_ids'] as $option_id) {
                        $option = data_get($options, $option_id);
                        if (!$imageUrl) {
                            $imageUrl = $options->getFirstMediaUrl('images', 'small');
                        }
                        $optionInfo[] = [
                            'id' => $option_id,
                            'name' => $option->name,
                            'type' => [
                                'id' => $option->variationType->id,
                                'name' => $option->vaiationType->name,

                            ],

                        ];
                    }
                }
                $cartItemData[] = [
                    'id' => $cartItem['id'],
                    'product_id' => $product->id,
                    'title' => $product->title,
                    'slug' => $product->slug,
                    'price' => $cartItem['price'],
                    'quantity' => $cartItem['quantity'],
                    'option_ids' => $cartItem['option_ids'],
                    'options' => $optionInfo,
                    'image' => $imageUrl ?: $product->getFirstMediaUrl('images', 'size'),
                    'user' => [
                        'id' => $product->created_by,
                        'name' => $product->user->vendor->store_name,
                    ],
                ];
            }
            return $this->cachedCartItems;
        } catch (\Exception $e) {
            Log::error($e->getMessage() . PHP_EOL . $e->getTraceAsString());
        }
        return [];
    }


    public function getTotalQuantity(): int
    {
        $totalQuantity = 0;
        foreach ($this->getCartItems() as $item) {
            $totalQuantity += $item['quantity'];
        }
        return $totalQuantity;
    }
    public function getTotalPrice(): float
    {
        $total = 0;
        foreach ($this->getCartItems() as $item) {
            $total += $item['quantity'] * $item['price'];
        }
        return $total;
    }

    protected function updateItemQuantityInDatabase(int $productId, int $quantity, array $optionIds): void
    {
        $userId = Auth::id();
        $cartItem = CartItem::where('user_id', $userId)
            ->where('product_id', $productId)
            ->where('variation_type_options_ids', json_encode($optionIds))
            ->first();
        if ($cartItem) {
            $cartItem->update([
                'quantity' => $quantity,
            ]);
        }
    }
    protected function updateItemQuantityInCookies(int $productId, int $quantity, array $optionIds): void
    {
        $cartItems = $this->getCartItemsFromCookies();
        ksort($optionIds);
        $itemKey = $productId . '_' . json_encode($optionIds);
        if (isset($cartItems[$itemKey])) {
            $cartItems[$itemKey]['quantity'] = $quantity;
        }
        Cookie::queue(self::COOKIE_NAME, json_encode($cartItems), self::COOKIE_LIFETIME);
    }
    protected function saveItemToDatabase(int $productId, int $quantity, $price, array $optionIds): void
    {
        $userId = Auth::id();
        ksort($optionIds);
        $cartItem = CartItem::where('user_id', $userId)
            ->where('product_id', $productId)
            ->where('variation_type_options_ids', json_encode($optionIds))
            ->first();
        if ($cartItem) {
            $cartItem->update([
                'quantity' => DB::raw('quantity +' . $quantity),
            ]);
        } else {
            CartItem::create([
                'user_id' => $userId,
                'product_id' => $productId,
                'quantity' => $quantity,
                'price' => $price,
                'variation_type_option_ids' => $optionIds,
            ]);
        }
    }

    protected function saveItemToCookies(int $productId, int $quantity, $price, array $optionIds): void
    {
        $cartItems = $this->getCartItemsFromCookies();
        ksort($optionIds);
        $itemKey = $productId . '_' . json_encode($optionIds);
        if (isset($cartItems[$itemKey])) {
            $cartItems[$itemKey]['quantity'] += $quantity;
            $cartItems[$itemKey]['price'] = $price;
        } else {
            $cartItem[$itemKey] = [
                'id' => Str::uuid(),
                'product_id' => $productId,
                'quantity' => $quantity,
                'price' => $price,
                'option_ids' => $optionIds,
            ];
        }
        Cookie::queue(self::COOKIE_NAME, json_encode($cartItems), self::COOKIE_LIFETIME);
    }

    protected function removeCartItemFromDatabase(int $productId, int $quantity, array $optionIds): void
    {
        $userId = Auth::id();
        ksort($optionIds);
        CartItem::where('product_id', $productId)
            ->where('variation_type_option_ids', json_encode($optionIds))
            ->delete();
    }
    protected function removeCartItemsFromCookies(int $productId, int $quantity, array $optionIds): void
    {
        $cartItems = $this->getCartItemsFromCookies();
        ksort($optionIds);
        $cartKey = $productId . '_' . json_encode($optionIds);
        unset($cartItems[$cartKey]);
        Cookie::queue(self::COOKIE_NAME, json_encode($cartItems), self::COOKIE_LIFETIME);
    }
    protected function getCartItemsFromDatabase()
    {
        $userId = Auth::id();
        $cartItems = CartItem::where('user_id', $userId)
            ->get()
            ->map(function ($cartItem) {
                return [
                    'id' => $cartItem->id,
                    'product_id' => $cartItem->product_id,
                    'quantity' => $cartItem->quantity,
                    'price' => $cartItem->price,
                    'option_ids' => $cartItem->variation_type_option_ids,
                ];
            })
            ->toArray();
        return $cartItems;
    }
    protected function getCartItemsFromCookies()
    {
        $cartItems = json_encode(Cookie::get(self::COOKIE_NAME, '[]'), true);
        return $cartItems;
    }
}
