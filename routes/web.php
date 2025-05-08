<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\FrontendController;
use App\Http\Controllers\PaymentControlller;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;




Route::get('/', [FrontendController::class, 'index'])->name('home');
Route::get('cartInfo', [FrontendController::class, 'cartInfo'])->name('cartInfo');
Route::get('product-detail/{product:slug}', [FrontendController::class, 'productDetail'])->name('product-detail');

Route::get('blogs',[FrontendController::class, 'blogs'])->name('blogs.index');
Route::get('blogs/{blog:slug}',[FrontendController::class, 'blogDetails'])->name('blogs.show');

Route::get('faqs',[FrontendController::class, 'faqs'])->name('faqs.index');

Route::controller(CartController::class)->group(function () {
    Route::post('cart-add/{product}', 'store')->name('cart.store');
    Route::get('cart-index', 'index')->name('cart.index');
    Route::put('cart/{product}', 'update')->name('cart.update');
    Route::delete('cart/{product}', 'destroy')->name('cart.destroy');
});
Route::post('payment/webhook',[PaymentControlller::class, 'webhook'])->name('webhook');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});
Route::middleware(['verified'])->group(function(){
Route::post('cart-checkout',[CartController::class,'checkout'])->name('cart.checkout');
Route::get('/checkout', [FrontendController::class, 'showCheckout'])->name('checkout.detail');
Route::get('/payment/success',[PaymentControlller::class, 'success'])->name('payment.success');
Route::get('/payment/fail',[PaymentControlller::class, 'failure'])->name('payment.fail');
});

Route::get('vendor-register',[FrontendController::class, 'vendorRegisterPage'])->name('vendor.registerPage');
Route::post('vendor-register', [FrontendController::class, 'vendorRegister'])->name('vendor.register');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
