import React, { useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { CreditCard } from 'lucide-react';
import AuthLayout from '../layout/AuthLayout';
import { GroupedCartItems, PageProps } from '@/types/frontend';
import CurrencyFormatter from '@/components/CurrencyFormatter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import CartItem from '@/components/Forontend/CartItem';
import toast from 'react-hot-toast';



function CartIndex({
    csrf_token,
    totalPrice,
    totalQuantity,
    cartItems,
    flash
}: PageProps<{ cartItems: Record<number, GroupedCartItems> }>) {
    const isEmpty = Object.keys(cartItems).length === 0;



    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    return (
        <AuthLayout>
            <Head title="Your Cart" />
            <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8   bg-gradient-to-r from-gray-300 to-purple-300 dark:from-gray-900 dark:to-black">
                <div className="max-w-7xl mx-auto mt-20">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-4xl font-extrabold dark:text-white text-gray-900 tracking-tight drop-shadow-md">
                            Your Cart 🛒
                        </h1>
                        <Link href={route('home')}>
                            <Button
                                variant="outline"
                                className="flex items-center  gap-2 border-purple-300 dark:bg-border-purple-300 text-purple-600  dark:text-white hover:bg-purple-100 hover:scale-105 transition-transform"
                            >
                                Back to Shop 🛍️
                            </Button>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left: Cart Items */}
                        <div className="lg:col-span-2 space-y-6">
                            {isEmpty ? (
                                <Card className="border-0 bg-white/80 backdrop-blur-sm">
                                    <CardContent className="py-12 text-center text-gray-600">
                                        <span className="text-2xl">
                                            Your cart is empty 😿
                                        </span>
                                        <p className="mt-2 text-lg">
                                            Time to shop some 🔥 deals!
                                        </p>
                                        <Link href={route('home')}>
                                            <Button
                                                className="mt-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:scale-105 transition-transform"
                                                size="lg"
                                            >
                                                Let's Shop! 🛍️
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            ) : (
                                Object.values(cartItems).map((cartItem) => (
                                    <Card
                                        key={cartItem.user.id}
                                        className="border-0 bg-white/90 dark:bg-gray-500 backdrop-blur-sm shadow-lg"
                                    >
                                        <CardHeader>
                                            <div className="flex justify-between items-center">
                                                <Link
                                                    href=''
                                                    className="text-xl font-bold text-purple-600 hover:text-purple-700 dark:text-white transition-colors"
                                                >
                                                    {cartItem.user.name} ✨
                                                </Link>
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <form
                                                                action={route('cart.checkout')}
                                                                method="POST"
                                                            >
                                                                <input
                                                                    type="hidden"
                                                                    name="_token"
                                                                    value={csrf_token}
                                                                />
                                                                <input
                                                                    type="hidden"
                                                                    name="vendor_id"
                                                                    value={cartItem.user.id}
                                                                />
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    className="flex items-center gap-2 border-purple-300  dark:text-white text-purple-600 hover:bg-purple-100 hover:scale-105 transition-transform"
                                                                >
                                                                    <CreditCard className="w-4 h-4 text-pink-500" />
                                                                    Pay this vendor 💸
                                                                </Button>
                                                            </form>
                                                        </TooltipTrigger>
                                                        <TooltipContent className="bg-purple-500 text-white">
                                                            Checkout {cartItem.user.name}'s items only! 🚀
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <Separator className="bg-purple-200" />
                                            {cartItem.items.map((item) => (
                                                <CartItem item={item} key={item.id} />
                                            ))}
                                        </CardContent>
                                    </Card>
                                ))
                            )}
                        </div>

                        {/* Right: Summary */}
                        <div className="h-fit lg:sticky lg:top-35">
                            <Card className="border-0 bg-white/90  dark:bg-gray-900 backdrop-blur-sm shadow-lg">
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                                        Order Summary 💰
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex justify-between text-base text-gray-700 mb-4 dark:text-white">
                                        <span>Subtotal ({totalQuantity} items):</span>
                                        <CurrencyFormatter amount={totalPrice} />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Link
                                        href={route('cartInfo')}
                                        className="w-full text-center py-3 px-6 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium rounded-md transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={isEmpty}
                                    >
                                        Checkout Now
                                    </Link>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}

export default CartIndex;