"use client"

import { usePage } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Search } from "lucide-react"
import { Order } from "@/types/frontend"
import StatusCard from "./StatusCard"
import { Input } from "@/components/ui/input"
import { useState } from "react"

// ✅ Define your props type
type OrdersPageProps = {
  orders: Order[]
  totalOrder: number
  pending: number
  processing: number
  cancelled: number
  draft: number
  delivered: number
}

export default function OrdersPage() {
  const { orders, totalOrder, pending, processing, cancelled, draft, delivered } = usePage<OrdersPageProps>().props

  const [searchTerm, setSearchTerm] = useState("")

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }
  

  const statusCards = [
    { title: "Total Orders", value: totalOrder, color: "text-black" },
    { title: "Processing", value: draft, color: "text-blue-600" },
    { title: "Pending", value: pending, color: "text-yellow-600" },
    { title: "Cancelled", value: cancelled, color: "text-red-600" },
    { title: "Delivered", value: delivered, color: "text-green-600" }
  ];

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
            <p className="text-muted-foreground">Manage and track all your orders</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          {statusCards.map((card, index) => (
            <StatusCard key={index} title={card.title} value={card.value} color={card.color} />
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Orders ({orders.length})</CardTitle>
            <div className="flex gap-4">
              <CardDescription>
                {orders.length > 0 ? `Showing ${orders.length} orders` : "No orders found"}
              </CardDescription>
              <div className="relative w-full sm:w-[300px] ml-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

          </CardHeader>

          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vendor Name</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No orders found matching your criteria
                      </TableCell>
                    </TableRow>
                  ) : (
                    orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">
                          {order.vendorUser?.store_name}
                        </TableCell>
                        <TableCell className="font-medium">
                          {order.orderItems.map((item) => (
                            <div key={item.id} className="flex gap-1">
                              <img className="h-20 w-20 rounded-full" src={item.product.image} alt="" />
                              <div key={item.id}>{item.product.title}</div>

                            </div>
                          ))}

                        </TableCell>

                        <TableCell>{formatDate(order.created_at)}</TableCell>
                        <TableCell>{order.status}</TableCell>
                        <TableCell className="font-medium">{formatCurrency(order.total_price)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                            <span className="sr-only">View order details</span>
                          </Button>
                        </TableCell>
                      </TableRow>

                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div >
  )
}
