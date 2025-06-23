
import { usePage } from '@inertiajs/react';
import { Order } from '@/types/frontend';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Pencil } from 'lucide-react';
import  UserDetail  from './UserDetail';
import ShippingDetail from './ShippingDetail';
import OrderSummary from './OrderSummary';
import OrderItem from './OrderItem';

export default function OrderDetailPage() {
  const { order } = usePage<{order:Order[]}>().props;

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

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

           <OrderItem order={order}/>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-6">
           <OrderSummary order={order}/>

          <UserDetail order={order}/>

           <ShippingDetail order={order}/>
          </div>
        </div>
      </div>
   
  );
}
