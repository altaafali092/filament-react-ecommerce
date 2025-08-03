<?php

namespace App\Http\Controllers;

use App\Enums\OrderStatusEnum;
use App\Http\Requests\Contact\StoreContactMesaageRequest;
use App\Http\Requests\Vendor\Register\StoreVendorRegisterRequest;
use App\Http\Resources\BlogResource;
use App\Http\Resources\FAQResource;
use App\Http\Resources\ProductDetailResource;
use App\Http\Resources\ProductResource;
use App\Http\Resources\SliderResource;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\OrderViewResource;
use App\Http\Resources\PrivacyPolicyResource;
use App\Models\Blog;
use App\Models\FAQ;
use App\Models\Product;
use App\Models\ShippingAddress;
use App\Models\Slider;
use App\Models\Category;
use App\Models\Contact;
use App\Models\Order;
use App\Models\PrivacyPolicy;
use App\Models\User;
use App\Services\CartService;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

use function Termwind\render;

class FrontendController extends Controller
{
    public function index()
    {
        $products = Product::where('status', 'published')->latest()->paginate(10);
        $blogs = Blog::where('status', 1)->limit(3)->latest()->get();
        $sliders = Slider::where('status', 1)->latest()->get();
        $faqs = FAQ::where('status', 1)->limit(5)->latest()->get();
        $categories = Category::where('active', 1)->get();


        $mostOrderedProducts = Product::select('products.*')
            ->withCount(['orderItems as total_ordered_quantity' => function ($query) {
                $query->select(DB::raw('SUM(quantity)'));
            }])
            ->where('status', 'published')
            ->orderByDesc('total_ordered_quantity')
            ->limit(10)
            ->get();

        return Inertia::render('welcome', [
            'products' => ProductResource::collection($products),
            'blogs' => BlogResource::collection($blogs)->toArray(request()),
            'sliders' => SliderResource::collection($sliders)->toArray(request()),
            'faqs' => FAQResource::collection($faqs)->toArray(request()),
            'categories' => CategoryResource::collection($categories)->toArray(request()),
            'mostOrderedProducts' => ProductResource::collection($mostOrderedProducts),

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

    public function shopByCategory(Request $request, Category $category)
    {
        $products = $category->products()
            ->where('status', 'published')
            ->with(['user', 'department']) // <-- eager load these relations here
            ->orderBy('id', 'desc')
            ->paginate(20)
            ->appends($request->query());

        $total = $products->total(); // use total() for total items in pagination

        return Inertia::render('Frontend/Product/CategoryProduct', [
            'category' => new CategoryResource($category),
            'products' => ProductResource::collection($products)->additional([
                'meta' => [
                    'current_page' => $products->currentPage(),
                    'last_page' => $products->lastPage(),
                    'next_page_url' => $products->nextPageUrl(),
                    'prev_page_url' => $products->previousPageUrl(),
                    'per_page' => $products->perPage(),
                    'total' => $total,
                ],
            ]),
        ]);
    }

    public function contact()
    {

        return Inertia::render('Frontend/Contact/Index');
    }
    public function contactMessage(StoreContactMesaageRequest $request)
    {

        Contact::create($request->validated());

        return back()->with('success', 'Your message successfully submitted');
    }

    public function policyPage()
    {
        $privacy = PrivacyPolicy::where('term', 'privacy_policy')->latest()->get();
        $terms = PrivacyPolicy::where('term', 'term_and_condition')->latest()->get();

        return Inertia::render('Frontend/FAQ/policy', [
            'privacyPolicies' => PrivacyPolicyResource::collection($privacy)->toArray(request()),
            'termsPolicies' => PrivacyPolicyResource::collection($terms)->toArray(request()),
        ]);
    }

    public function orderPage()
    {
        $user = Auth::user();
        $totalOrder = Order::where('user_id', $user->id)->count();
        $pending = Order::where('user_id', $user->id)->where('status', 'pending')->count();
        $cancelled = Order::where('user_id', $user->id)->where('status', 'cancelled')->count();
        $draft = Order::where('user_id', $user->id)->where('status', 'draft')->count();
        $delivered = Order::where('user_id', $user->id)->where('status', 'delivered')->count();

        $query = Order::query();
        if (request('name')) {
            $query->whereHas('orderItems', function ($query) {
                $query->whereHas('product', function ($query) {
                    $query->where('title', 'like', '%' . request('name') . '%');
                });
            });
        }
        if (request('status')) {
            $query->where('status', request('status'));
        }

        $orders = $query->with(['vendorUser.vendor'])
            ->where('user_id', $user->id)
            ->orderByDesc('created_at')
            ->get();

        return Inertia::render('Frontend/OrderPage/Index', [
            'orders' => OrderViewResource::collection($orders)->toArray(request()),
            'totalOrder' => $totalOrder,
            'pending' => $pending,
            'cancelled' => $cancelled,
            'draft' => $draft,
            'delivered' => $delivered,
            'filters' => [
                'name' => request('name'),
                'status' => request('status'),
            ],
        ]);
    }

    public function orderDetail(Order $order)
    {
        $order->load(['user', 'user.shippingAddress', 'orderItems.product']);

        return Inertia::render('Frontend/OrderPage/OrderDetail', [
            'order' => new OrderViewResource($order),
        ]);
    }

    public function cancelOrder(Order $order)
    {
        // if($order->created_at->diffInMinutes(now())>30 ){
        //     return back()->with('error','You Cannot make Order Cancel');
        // };
        $order->update([
            'status' => OrderStatusEnum::Cancelled->value,
        ]);
        return to_route('orderPage')->with('success', 'Order has been cancelled successfully.');
    }

    public function invoice(Order $order)
    {
        $order->load(['user', 'user.shippingAddress', 'orderItems.product']);
        return Inertia::render('Frontend/OrderPage/InvoicePage', [
            'order' => new OrderViewResource($order),
        ]);
    }
}
