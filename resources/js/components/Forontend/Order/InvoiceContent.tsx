import React, { forwardRef } from 'react';
import { IFrontOfficeSetting, Order } from '@/types/frontend';

interface Props {
  order: Order;
  officeSettings: IFrontOfficeSetting | null;
}

const InvoiceContent = forwardRef<HTMLDivElement, Props>(({ order, officeSettings }, ref) => {
  const formatDateTime = (dateString: string): string => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric", month: "short", day: "numeric",
      hour: "numeric", minute: "numeric"
    });
  };

  return (
    <div ref={ref} className="bg-white p-8 rounded shadow max-w-3xl mx-auto">
      <div className="flex justify-between mb-10">
        <div>
        
          <img 
            src={officeSettings?.office_logo ?? ''} 
            alt="Office Logo" 
            className="h-10 md:h-12 w-25" 
          />
          <h2 className="text-md font-bold my-auto">{officeSettings?.office_name}</h2>
          <p>{officeSettings?.office_address}</p>
          <p>{officeSettings?.office_phone},{officeSettings?.office_email}</p>
         
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Invoice # {order.id}</p>
          <p className="text-sm text-gray-500">Date: {formatDateTime(order.created_at)}</p>
          <p className="text-sm text-gray-500">Payment: {order.payment_method === 'cash_on_delivery' ? 'Cash On Delivery' : order.payment_method}</p>

          <p className="text-sm text-gray-500">Status: {order.status}</p>
        </div>
      </div>

      <div className="flex justify-between mb-8">
        <div>
          <h3 className="text-md font-bold mb-2">Bill To:</h3>
          <p>{order.user?.name}</p>
          <p>{order.user?.email}</p>
          <p>{order.user?.shippingAddress?.phone}</p>
        </div>
        <div>
          <h3 className="text-md font-bold mb-2">Ship To:</h3>
          <p>{order.user?.shippingAddress?.nearest_landmarks},{order.user?.shippingAddress?.full_address}</p>
          <p>{order.user?.shippingAddress?.city}-{order.user?.shippingAddress?.postal_code}</p>
          <p>{order.user?.shippingAddress?.full_address},{order.user?.shippingAddress?.district}, {order.user?.shippingAddress?.province}</p>
        </div>
      </div>

      <table className="w-full mb-8 border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Item</th>
            <th className="p-2 border">variation</th>
            <th className="p-2 border">Qty</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Total</th>
          </tr>
        </thead>
        <tbody>
          {order.orderItems?.map((item, index) => (
            <tr key={index}>
              <td className="p-2 border">{item.product?.title}</td>
              <td className="p-2 border">
                {item.variation_details.map((variation, index) => (
                  <span key={index} className="mr-2">
                    {variation.type_name}: {variation.option_name}
                  </span>
                ))}
              </td>
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
  );
});

export default InvoiceContent;
