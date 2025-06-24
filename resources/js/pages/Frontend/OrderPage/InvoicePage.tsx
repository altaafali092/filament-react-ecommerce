import { usePage } from '@inertiajs/react';
import { Order } from '@/types/frontend';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

export default function InvoicePage() {
  const { order } = usePage<{ order: Order }>().props;

  const printRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const formatDateTime = (dateString: string): string => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric", month: "short", day: "numeric",
      hour: "numeric", minute: "numeric"
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Invoice</h1>
        <Button variant="outline" onClick={handlePrint}><Printer className="w-4 h-4 mr-2" /> Print Invoice</Button>
      </div>

      <div ref={printRef} className="bg-white p-8 rounded shadow max-w-4xl mx-auto">

        <div className="flex justify-between mb-10">
          <div>
            <h2 className="text-xl font-bold">Your Company Name</h2>
            <p>123 Street, City</p>
            <p>Phone: +123456789</p>
            <p>Email: support@example.com</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Invoice # {order.id}</p>
            <p className="text-sm text-gray-500">Date: {formatDateTime(order.created_at)}</p>
            <p className="text-sm text-gray-500">Payment: {order.payment_method}</p>
            <p className="text-sm text-gray-500">Status: {order.status}</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold mb-2">Bill To:</h3>
          <p>{order.user?.name}</p>
          <p>{order.user?.shipping_address?.address}</p>
          <p>{order.user?.email}</p>
        </div>

        <table className="w-full mb-8 border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Item</th>
              <th className="p-2 border">Qty</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.order_items?.map((item, index) => (
              <tr key={index}>
                <td className="p-2 border">{item.product?.name}</td>
                <td className="p-2 border">{item.quantity}</td>
                <td className="p-2 border">{item.price}</td>
                <td className="p-2 border">{(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-right">
          <p className="text-lg font-bold">Total: ${order.total_price}</p>
        </div>
      </div>
    </div>
  );
}
