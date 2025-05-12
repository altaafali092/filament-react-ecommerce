import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import AuthLayout from "@/pages/layout/AuthLayout";
import { Head, Link, router } from "@inertiajs/react";
import { CartItems, Shipping } from "@/types/frontend";
import { Button } from "@/components/ui/button";



interface CheckoutDetailProps {
    shipping: Shipping;
    cartItems: CartItems[];
}

export default function CheckoutDetail({ shipping, cartItems }: CheckoutDetailProps) {
    const total = cartItems.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
    );

    const handleCheckout = () => {
        router.post(route('cart.checkout'), {

            preserveState: true,
            preserveScroll: true,
        });
    };




    return (
        <AuthLayout>
            <Head title="Billing" />
            <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-300 to-purple-300 dark:from-blue-700 dark:to-purple-700">
                <div className="max-w-7xl mx-auto mt-20 flex flex-col md:flex-row gap-8 p-6">

                    {/* Shipping Details */}
                    <div className="w-full md:w-1/2 space-y-6">
                        <h1 className="text-2xl font-bold">Checkout</h1>
                        <Card>
                            <CardContent className="p-6 space-y-4 text-sm text-gray-800">
                                <h2 className="text-xl font-semibold mb-2">Shipping Details</h2>

                                {/* Use shipping prop to display details */}
                                <p><strong>User Name:</strong> {shipping?.user?.name || "-"}</p>
                                <p><strong>Email:</strong> {shipping?.user?.email || "-"}</p>
                                <p><strong>Phone:</strong> {shipping?.phone || "-"}</p>
                                <p><strong>Alternate Phone:</strong> {shipping?.alternative_phone || "-"}</p>
                                <Separator />
                                <p><strong>Full Address:</strong> {shipping?.full_address || "-"}</p>
                                <p><strong>City:</strong> {shipping?.city || "-"}</p>
                                <p><strong>District:</strong> {shipping?.district || "-"}</p>
                                <p><strong>Province:</strong> {shipping?.province || "-"}</p>
                                <p><strong>Postal Code:</strong> {shipping?.postal_code || "-"}</p>
                                <p><strong>Nearest Landmark:</strong> {shipping?.nearest_landmarks || "-"}</p>

                                {shipping?.full_address ? (
                                    <button
                                        type="button"
                                        onClick={handleCheckout}
                                        className="w-full bg-blue-900 text-white py-3 rounded font-medium mt-6"
                                    >
                                        Check Out
                                    </button>
                                ) : (
                                    <>
                                    <p className="text-sm text-red-600 mt-6">
                                        Please complete your shipping address to proceed with checkout.
                                    </p>
                                    <Link href={route('profile.shippingAddress')}>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex items-center gap-2 border-purple-300  dark:text-white text-purple-600 hover:bg-purple-100 hover:scale-105 transition-transform"
                                       
                                    >Update Shipping Address</Button>
                                    </Link>
                                    </>
                                )}

                            </CardContent>
                        </Card>
                    </div>

                    {/* Order Summary */}
                    <div className="w-full md:w-1/2 space-y-6 sticky top-1">
                        <h2 className="text-xl font-bold">Order Summary</h2>
                        <Card>
                            <CardContent className="p-4 space-y-4">
                                {cartItems.length > 0 ? (
                                    cartItems.map((item) => (
                                        <div key={item.id} className="flex items-center border-b pb-4 gap-4">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                            <div className="flex-1 text-sm">
                                                <p className="font-medium">{item.title}</p>
                                                {item.options && Array.isArray(item.options) && item.options.length > 0 && (
                                                    <div className="text-gray-500 space-x-2 text-xs mb-1">
                                                        {item.options.map((opt) => (
                                                            <span key={opt.id}>
                                                                <strong>{opt.type?.name || 'Option'}:</strong> {opt.name}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                                <p className="text-gray-500">Qty: {item.quantity}</p>
                                                <p className="font-semibold">Price: ₹{(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-sm text-gray-500">No items in cart.</p>
                                )}
                                <Separator />
                                <div className="flex justify-between font-bold text-lg pt-2">
                                    <span>Total</span>
                                    <span>₹{total.toFixed(2)}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}