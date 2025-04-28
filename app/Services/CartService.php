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
        if (Auth::check()) {
            $this->updateItemQuantityInDatabase($productId, $quantity, $optionIds);
        } else {
            $this->updateItemQuantityInCookies($productId, $quantity, $optionIds);
        }
    }
    public function removeItemFromCart(int $productId, $optionIds = null)

    {
        if (Auth::check()) {
            $this->removeCartItemFromDatabase($productId, $optionIds);
        } else {
            $this->removeCartItemsFromCookies($productId, $optionIds);
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

                $productIds = collect($cartItems)->pluck('product_id')->unique();
                $products = Product::whereIn('id', $productIds)
                    ->with('user.vendor')
                    ->get()
                    ->keyBy('id');

                $cartItemData = [];

                foreach ($cartItems as $cartItem) {
                    $product = $products->get($cartItem['product_id']);
                    if (!$product) {
                        continue;
                    }

                    // ✅ Safely decode option_ids
                    $optionIds = $cartItem['option_ids'];
                    if (is_string($optionIds)) {
                        $optionIds = json_decode($optionIds, true);
                    }
                    if (!is_array($optionIds)) {
                        $optionIds = [];
                    }

                    $optionInfo = [];
                    $options = VariationTypeOption::with('variationType')
                        ->whereIn('id', $optionIds)
                        ->get()
                        ->keyBy('id');

                    $imageUrl = null;

                    foreach ($optionIds as $optionId) {
                        $option = $options->get($optionId);

                        if (!$option) continue;

                        // Only set image once
                        if (!$imageUrl) {
                            $imageUrl = $option->getFirstMediaUrl('images', 'small');
                        }

                        $optionInfo[] = [
                            'id' => $optionId,
                            'name' => $option->name,
                            'type' => [
                                'id' => $option->variationType->id,
                                'name' => $option->variationType->name,
                            ],
                        ];
                    }

                    $cartItemData[] = [
                        'id' => $cartItem['id'],
                        'product_id' => $product->id,
                        'title' => $product->title,
                        'slug' => $product->slug,
                        'price' => $cartItem['price'],
                        'quantity' => $cartItem['quantity'],
                        'option_ids' => $optionIds,
                        'options' => $optionInfo,
                        'image' => $imageUrl ?: $product->getFirstMediaUrl('images', 'size'),
                        'user' => [
                            'id' => $product->created_by,
                            'name' => optional($product->user->vendor)->store_name,
                        ],
                    ];
                }

                // ✅ Set to cached property
                $this->cachedCartItems = $cartItemData;
            }

            return $this->cachedCartItems;
        } catch (\Exception $e) {
            Log::error($e->getMessage() . PHP_EOL . $e->getTraceAsString());
            return []; // Fallback empty array to satisfy the return type
        }
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
            ->where('variation_type_option_ids', json_encode($optionIds))
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
            ->where('variation_type_option_ids', json_encode($optionIds))
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
                'variation_type_option_ids' => json_encode($optionIds),
            ]);
        }
    }

    protected function saveItemToCookies(int $productId, int $quantity, $price, array $optionIds): void
    {
        $cartItems = $this->getCartItemsFromCookies();

        ksort($optionIds); // ensure consistent ordering
        $itemKey = $productId . '_' . json_encode($optionIds);

        if (isset($cartItems[$itemKey])) {
            $cartItems[$itemKey]['quantity'] += $quantity;
            $cartItems[$itemKey]['price'] = $price;
        } else {
            $cartItems[$itemKey] = [
                'id' => (string) Str::uuid(),
                'product_id' => $productId,
                'quantity' => $quantity,
                'price' => $price,
                'option_ids' => $optionIds,
            ];
        }

        Cookie::queue(self::COOKIE_NAME, json_encode($cartItems), self::COOKIE_LIFETIME);
    }



    private function removeCartItemFromDatabase(int $productId, $optionIds = null)
    {
        $userId = Auth::id();
        sort($optionIds); // Sort for consistent comparison

        CartItem::where('user_id', $userId)
            ->where('product_id', $productId)
            ->get()
            ->each(function ($item) use ($optionIds) {
                $stored = is_array($item->variation_type_option_ids)
                    ? $item->variation_type_option_ids
                    : json_decode($item->variation_type_option_ids, true);

                sort($stored);

                if ($stored === $optionIds) {
                    $item->delete();
                }
            });
    }


    protected function removeCartItemsFromCookies(int $productId,  array $optionIds): void
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
                $optionIds = is_array($cartItem->variation_type_option_ids)
                    ? $cartItem->variation_type_option_ids
                    : json_decode($cartItem->variation_type_option_ids, true);

                return [
                    'id' => $cartItem->id,
                    'product_id' => $cartItem->product_id,
                    'quantity' => $cartItem->quantity,
                    'price' => $cartItem->price,
                    'option_ids' => $optionIds,
                ];
            })
            ->toArray();

        return $cartItems;
    }

    protected function getCartItemsFromCookies(): array
    {
        $cookie = Cookie::get(self::COOKIE_NAME);

        $decoded = json_decode($cookie, true); // decode as associative array

        return is_array($decoded) ? $decoded : []; // fallback if cookie is null or malformed
    }


    public function getCartItemsGrouped(): array
    {
        $cartItems = $this->getCartItems();
        return collect($cartItems)
            ->groupBy(fn($item) => $item['user']['id'])
            ->map(fn($items, $userId) => [
                'user' => $items->first()['user'],
                'items' => $items->toArray(),
                'totalQuantity' => $items->sum('quantity'),
                'totalPrice' => $items->sum(fn($item) => $item['price'] * $item['quantity'],)
            ])->toArray();
    }

    public function moveCartItemsToDatabase($userId): void
    {
        $cartItems = $this->getCartItemsFromCookies();

        foreach ($cartItems as $itemKey => $cartItem) {
            // Make sure option_ids is sorted before using in key comparison
            ksort($cartItem['option_ids']);
            $optionIdsJson = json_encode(array_values($cartItem['option_ids']));

            // Check if the item already exists in the user's cart
            $existingItem = CartItem::where('user_id', $userId)
                ->where('product_id', $cartItem['product_id'])
                ->where('variation_type_option_ids', $optionIdsJson)
                ->first();

            if ($existingItem) {
                $existingItem->update([
                    'quantity' => $existingItem->quantity + $cartItem['quantity'],
                    'price' => $cartItem['price'],
                ]);
            } else {
                CartItem::create([
                    'user_id' => $userId,
                    'product_id' => $cartItem['product_id'], // ✅ fixed typo from 'produxt_id'
                    'quantity' => $cartItem['quantity'],
                    'variation_type_option_ids' => $cartItem['option_ids'], // ✅ fixed typo from 'cariation_type_option_ids'
                    'price' => $cartItem['price'], // ✅ you missed this if it's required
                ]);
            }
        }

        // ✅ Clear the cookie after merging
        Cookie::queue(Cookie::forget(self::COOKIE_NAME));
    }
}
