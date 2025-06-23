import CurrencyFormatter from '@/components/CurrencyFormatter'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Order } from '@/types/frontend'

interface OrderSummaryProps {
    order: Order
}

const OrderSummary = ({ order }: OrderSummaryProps) => {

    const subtotal = parseFloat(order.total_price.toString())
    const shipping = 5.98
    const tax = 24.00
    const total = subtotal + shipping + tax

    return (
        <Card>
            <CardHeader>
                <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span><CurrencyFormatter amount={subtotal} /></span>
                </div>
                <div className="flex justify-between">
                    <span>Shipping</span>
                    <span><CurrencyFormatter amount={shipping} /></span>
                </div>
                <div className="flex justify-between">
                    <span>Tax</span>
                    <span><CurrencyFormatter amount={tax} /></span>
                </div>
                <div className="flex justify-between">
                    <span>Discount</span>
                    <span><CurrencyFormatter amount={0} /></span>
                </div>
                <hr />
                <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span><CurrencyFormatter amount={total} /></span>
                </div>
            </CardContent>
        </Card>
    )
}

export default OrderSummary
