import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Order } from '@/types/frontend';
import React from 'react'

interface UserDetailProps {
  order: Order;
}
const UserDetail = ({ order }: UserDetailProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <p className="font-medium">{order?.user?.name}</p>
          <p className="text-sm text-gray-500">{order?.user?.email}</p>
          <p className="text-sm text-gray-500">{order?.user?.shippingAddress?.phone},{order?.user?.shippingAddress?.alternative_phone}</p>
        </div>
      </CardContent>
    </Card>

  )
}
export default UserDetail;
