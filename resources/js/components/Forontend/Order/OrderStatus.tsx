import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Order } from '@/types/frontend';
import React from 'react'


import { FileEdit, Clock, Truck, CheckCircle } from 'lucide-react';

interface OrderStatusProps {
    order: Order;
}

const OrderStatus = ({order}: OrderStatusProps) => {
    const formatDateTime = (dateString: string): string => {
        return new Date(dateString).toLocaleString("en-US", {
            year: "numeric", month: "short", day: "numeric",
            hour: "numeric", minute: "numeric"
        });
    };

    const statusTimeline = [
        { key: 'draft', title: 'Order Drafted', description: 'Order is being prepared.',icon: FileEdit, iconColor: 'text-gray-500' },
        { key: 'processing', title: 'Order Processing', description: 'Order is being processed.',icon: Clock, iconColor: 'text-gray-500' },
        { key: 'vendor delivered at store', title: 'Vendor Delivered at Store', description: 'Vendor has delivered the package.', icon: Truck, iconColor: 'text-gray-500' },
        { key: 'on the way', title: 'On the way', description: 'Order is on the way to the customer.', icon: Truck, iconColor: 'text-gray-500' },
        { key: 'delivered', title: 'Order Delivered', description: 'Order successfully delivered.', icon: CheckCircle, iconColor: 'text-green-500' },
    ];

    // Find current status index
    const currentStatusIndex = statusTimeline.findIndex(status => status.key === order.status);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent>
                <ol className="relative border-l border-gray-200">
                    {statusTimeline.map((status, index) => {
                        const isCompleted = index <= currentStatusIndex;
                        return (
                            <li key={status.key} className="mb-10 ml-6">
                                <span className={`absolute flex items-center justify-center w-6 h-6 ${isCompleted ? 'bg-green-100' : 'bg-gray-100'} rounded-full -left-3`}>
                                    <div className={`w-3 h-3 ${isCompleted ? 'bg-green-500' : 'bg-gray-400'} rounded-full`} />
                                </span>
                                <h3 className="font-medium leading-tight">
                                    <div className="flex items-center">
                                        <div className={`mr-2 ${status.iconColor}`}>{React.createElement(status.icon)}</div>
                                        {status.title}
                                    </div>
                                </h3>
                                <p className="text-sm text-gray-500">{status.description}</p>
                                {index === 0 && (
                                    <time className="text-sm text-gray-400">{formatDateTime(order.created_at)}</time>
                                )}
                            </li>
                        )
                    })}
                </ol>
            </CardContent>
        </Card>
    )
}

export default OrderStatus
