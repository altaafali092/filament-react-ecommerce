import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Order } from '@/types/frontend'
import React from 'react'
interface shippingAddProps
{
    order:Order
}
const ShippingDetail = ({order}:shippingAddProps) => {

    return (
        <Card>
            <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent>
                <div>
                    <p className="font-medium">{order.user?.shippingAddress?.full_address}</p>
                    <p className="text-sm text-gray-500">{order.user?.shippingAddress?.city},{order.user?.shippingAddress?.district},{order.user?.shippingAddress?.province}</p>
                    <p className="text-sm text-gray-500">{order.user?.shippingAddress?.nearest_landmarks},{order.user?.shippingAddress?.postal_code}</p>
                </div>
            </CardContent>
        </Card>
    )
}

export default ShippingDetail