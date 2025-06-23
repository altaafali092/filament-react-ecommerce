import CurrencyFormatter from '@/components/CurrencyFormatter'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Order } from '@/types/frontend'
import React from 'react'

type OrderItemProps = {
    order: Order
}

const OrderItem = ({ order }: OrderItemProps) => {
    console.log(order)
    return (

        <Card>
            <CardHeader>
                <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {order.orderItems.map(item => (
                        <div key={item.id} className="flex items-center gap-4 border rounded-lg p-4">
                            <img src={item.product.image} alt={item.product.title} className="h-16 w-16 rounded" />
                            <div className="flex-1">
                                <p className="font-medium">{item.product.title}</p>
                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                <div className="text-sm text-gray-500">
                                    Variations:{" "}
                                    {Object.entries(item.variation_type_options_ids).map(([typeId, optionId]) => (
                                        <span key={typeId} className="mr-2">
                                            Type {typeId}: Option {optionId}
                                        </span>
                                    ))}
                                </div>

                            </div>
                            <div className="font-medium"><CurrencyFormatter amount={item.price} /></div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default OrderItem