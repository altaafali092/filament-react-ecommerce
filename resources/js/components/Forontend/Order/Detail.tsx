import { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { usePage } from '@inertiajs/react';
import { IFrontOfficeSetting, Order } from '@/types/frontend';
import { Button } from '@/components/ui/button';
import { Pencil, Printer } from 'lucide-react';
import UserDetail from './UserDetail';
import ShippingDetail from './ShippingDetail';
import OrderSummary from './OrderSummary';
import OrderItem from './OrderItem';
import OrderStatus from './OrderStatus';
import InvoiceContent from './InvoiceContent';  // import new invoice component
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';  // assuming shadcn dialog

export default function OrderDetailPage() {
  const { order } = usePage<{ order: Order }>().props;
  const { officeSettings } = usePage<{ officeSettings: IFrontOfficeSetting | null }>().props;
  const [open, setOpen] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    documentTitle: 'Invoice',
    content: () => printRef.current as HTMLElement,
  });


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
          <Button variant="outline" onClick={() => setOpen(true)}>
            <Printer className="w-4 h-4 mr-2" /> Invoice
          </Button>
          <Button variant="outline"><Pencil className="w-4 h-4 mr-2" />Edit Order</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <OrderStatus order={order} />
          <OrderItem order={order} />
        </div>
        <div className="flex flex-col gap-6">
          <OrderSummary order={order} />
          <UserDetail order={order} />
          <ShippingDetail order={order} />
        </div>
      </div>

      {/* Invoice Popup */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[95vw] max-w-[95vw] sm:w-10 md:w-auto md:max-w-2xl lg:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Invoice</DialogTitle>
          </DialogHeader>

          <div ref={printRef}>
            <InvoiceContent order={order} officeSettings={officeSettings} />
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={handlePrint}><Printer className="w-4 h-4 mr-2" /> Download</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
