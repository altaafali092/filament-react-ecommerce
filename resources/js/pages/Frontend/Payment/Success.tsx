import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import AuthLayout from '@/pages/layout/AuthLayout';
import { Order, PageProps } from '@/types/frontend';
import { Head, Link } from '@inertiajs/react';
import { CheckCircle2 } from 'lucide-react';
import React from 'react';
import CurrencyFormatter from '@/components/CurrencyFormatter';

function Success({ orders }: PageProps<{ orders: { data: Order[] } }>) {
    console.log(orders);
  return (
    <AuthLayout>
      <Head title="Order Vibes 🔥" />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 p-4">
        <div className="w-full max-w-md space-y-6 mt-20">
          {/* Success Header */}
          <div className="text-center space-y-4 animate-in fade-in zoom-in duration-500">
            <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-500 dark:text-emerald-400" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Order Slayed! 🎉
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Your purchase is locked in. Time to vibe!
            </p>
          </div>

          {/* Order Cards */}
          {orders.data.map((order) => (
            <Card
              key={order.id}
              className="border-none shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-all hover:shadow-xl"
            >
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                  Order #{order.id}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Seller</span>
                  <Link
                    href="#"
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    {order.vendorUser.store_name}
                  </Link>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Items</span>
                  <span className="font-medium">{order.orderItems.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Total</span>
                  <span className="font-medium">
                    <CurrencyFormatter amount={order.total_price} />
                  </span>
                </div>
                <Separator className="my-2" />
                <Link href="#">
                  <Button
                    variant="outline"
                    className="w-full bg-transparent border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-gray-900 transition-colors"
                  >
                    Check Order Deets 👀
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}

          {/* Back to Shop CTA */}
          <div className="text-center">
            <Link href="/shop">
              <Button
                className="bg-pink-500 text-white hover:bg-pink-600 dark:bg-pink-600 dark:hover:bg-pink-700 transition-colors"
              >
                Keep Shopping 🛍️
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Success;

