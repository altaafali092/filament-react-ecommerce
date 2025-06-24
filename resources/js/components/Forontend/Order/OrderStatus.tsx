import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Order } from '@/types/frontend';
import React from 'react'
interface OrderStatusProps {
    order: Order;
}
const OrderStatus = ({order}:OrderStatusProps) => {
    const formatDateTime = (dateString: string): string => {
        return new Date(dateString).toLocaleString("en-US", {
          year: "numeric", month: "short", day: "numeric",
          hour: "numeric", minute: "numeric"
        });
      };


    return (
        <Card>
            <CardHeader>
                <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent>
                <ol className="relative border-l border-gray-200">
                    {/* Sample timeline - you can make this dynamic */}
                    <li className="mb-10 ml-6">
                        <span className="absolute flex items-center justify-center w-6 h-6 bg-green-100 rounded-full -left-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full" />
                        </span>
                        <h3 className="font-medium leading-tight">Order Delivered</h3>
                        <p className="text-sm text-gray-500">Package delivered to your address</p>
                        <time className="text-sm text-gray-400">{formatDateTime(order.created_at)}</time>
                    </li>
                    <li className="mb-10 ml-6">
                        <span className="absolute flex items-center justify-center w-6 h-6 bg-green-100 rounded-full -left-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full" />
                        </span>
                        <h3 className="font-medium leading-tight">Order Placed</h3>
                        <p className="text-sm text-gray-500">Order successfully placed</p>
                        <time className="text-sm text-gray-400">{formatDateTime(order.created_at)}</time>
                    </li>
                </ol>
            </CardContent>
        </Card>
    )
}

export default OrderStatus