<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\FrontendController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;




Route::get('/', [FrontendController::class, 'index'])->name('home');
Route::get('product-detail/{product:slug}', [FrontendController::class, 'productDetail'])->name('product-detail');


Route::controller(CartController::class)->group(function () {
    Route::post('cart-add/{product}', 'store')->name('cart.store');
    Route::delete('cart',  'index')->name('cart.index');
    Route::put('cart/{product}', 'update')->name('cart.update');
    Route::get('checkout', [CartController::class, 'checkout'])->name('cart.checkout');
    Route::delete('cart/{product}', 'destroy')->name('cart.destroy');
});


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
