
import { usePage } from '@inertiajs/react';
import { Order } from '@/types/frontend';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Pencil } from 'lucide-react';
import UserDetail from './UserDetail';
import ShippingDetail from './ShippingDetail';
import OrderSummary from './OrderSummary';
import OrderItem from './OrderItem';
import OrderStatus from './OrderStatus';

export default function OrderDetailPage() {
  const { order } = usePage<{ order: Order[] }>().props;


  const formatDateTime = (dateString: string): string => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric", month: "short", day: "numeric",
      hour: "numeric", minute: "numeric"
    });
  };

  return (


    <div className="min-h-[80vh] px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Order #{order.id}</h1>
          <p className="text-gray-500">Placed on {formatDateTime(order.created_at)}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Download className="w-4 h-4 mr-2" /> Invoice</Button>
          <Button variant="outline"><Pencil className="w-4 h-4 mr-2" /> Edit Order</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          <OrderStatus order={order} />

          <OrderItem order={order} />
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col gap-6">
          <OrderSummary order={order} />

          <UserDetail order={order} />

          <ShippingDetail order={order} />
        </div>
      </div>
    </div>

  );
}
