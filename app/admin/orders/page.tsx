"use client";

import React, { useEffect, useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Eye, ShoppingBag } from "lucide-react";
import { StoreData, Order } from "@/lib/db";
import { toast } from "sonner";

export default function OrdersManagement() {
  const [data, setData] = useState<StoreData | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch("/api/store");
    const json = await res.json();
    setData(json);
  };

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    if (!data) return;

    const updatedOrders = data.orders.map(o => o.id === orderId ? { ...o, status } : o);
    const updatedData = { ...data, orders: updatedOrders };

    const res = await fetch("/api/store", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (res.ok) {
      toast.success(`Order marked as ${status}`);
      setData(updatedData);
      if (selectedOrder?.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status });
      }
    }
  };

  if (!data) return <div className="p-8">Loading orders...</div>;

  const filteredOrders = data.orders.filter(o => 
    o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.id.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-sans font-bold text-zinc-900">Order Management</h1>
        <p className="text-zinc-500 font-sans">Track and process customer orders.</p>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
        <Input 
          placeholder="Search by customer name or order ID..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 h-12 bg-white border-none shadow-sm rounded-2xl focus-visible:ring-zinc-900"
        />
      </div>

      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-50">
            <TableRow className="hover:bg-transparent border-zinc-100">
              <TableHead className="font-sans text-xs uppercase tracking-widest font-bold">Order ID</TableHead>
              <TableHead className="font-sans text-xs uppercase tracking-widest font-bold">Customer</TableHead>
              <TableHead className="font-sans text-xs uppercase tracking-widest font-bold">Date</TableHead>
              <TableHead className="font-sans text-xs uppercase tracking-widest font-bold">Total</TableHead>
              <TableHead className="font-sans text-xs uppercase tracking-widest font-bold">Status</TableHead>
              <TableHead className="text-right font-sans text-xs uppercase tracking-widest font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-zinc-400 font-sans">
                  No orders found.
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow key={order.id} className="hover:bg-zinc-50/50 border-zinc-50 transition-colors">
                  <TableCell className="font-mono text-xs text-zinc-400">#{order.id.slice(-6)}</TableCell>
                  <TableCell>
                    <div className="font-sans font-medium text-zinc-900">{order.customerName}</div>
                    <div className="text-xs text-zinc-400">{order.customerEmail}</div>
                  </TableCell>
                  <TableCell className="font-sans text-sm">{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="font-sans font-bold">${order.total.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-full ${
                      order.status === 'completed' ? 'bg-green-100 text-green-700' : 
                      order.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="rounded-xl hover:bg-zinc-100"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Eye className="w-4 h-4 text-zinc-500" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg rounded-3xl">
                        <DialogHeader>
                          <DialogTitle className="font-sans font-bold text-2xl">Order Details</DialogTitle>
                        </DialogHeader>
                        {selectedOrder && (
                          <div className="space-y-6 py-4">
                            <div className="flex justify-between items-start border-b border-zinc-100 pb-4">
                              <div>
                                <h4 className="text-xs uppercase tracking-widest font-bold text-zinc-400 mb-1">Customer</h4>
                                <p className="font-sans font-medium">{selectedOrder.customerName}</p>
                                <p className="text-sm text-zinc-500">{selectedOrder.customerEmail}</p>
                              </div>
                              <div className="text-right">
                                <h4 className="text-xs uppercase tracking-widest font-bold text-zinc-400 mb-1">Status</h4>
                                <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-full ${
                                  selectedOrder.status === 'completed' ? 'bg-green-100 text-green-700' : 
                                  selectedOrder.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                  {selectedOrder.status}
                                </span>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <h4 className="text-xs uppercase tracking-widest font-bold text-zinc-400">Items</h4>
                              {selectedOrder.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center text-sm font-sans">
                                  <span>{item.quantity} × {item.title}</span>
                                  <span className="font-medium">${(item.price * item.quantity).toLocaleString()}</span>
                                </div>
                              ))}
                              <div className="pt-2 border-t border-zinc-100 flex justify-between items-center font-sans font-bold text-lg">
                                <span>Total</span>
                                <span>${selectedOrder.total.toLocaleString()}</span>
                              </div>
                            </div>

                            <div className="pt-4 flex gap-4">
                              {selectedOrder.status === 'pending' && (
                                <>
                                  <Button 
                                    className="flex-1 rounded-xl bg-green-600 hover:bg-green-700 h-12"
                                    onClick={() => updateOrderStatus(selectedOrder.id, 'completed')}
                                  >
                                    Mark as Completed
                                  </Button>
                                  <Button 
                                    variant="outline"
                                    className="flex-1 rounded-xl border-zinc-200 h-12 text-red-600 hover:bg-red-50"
                                    onClick={() => updateOrderStatus(selectedOrder.id, 'cancelled')}
                                  >
                                    Cancel Order
                                  </Button>
                                </>
                              )}
                              {selectedOrder.status !== 'pending' && (
                                <Button 
                                  variant="outline"
                                  className="w-full rounded-xl border-zinc-200 h-12"
                                  onClick={() => updateOrderStatus(selectedOrder.id, 'pending')}
                                >
                                  Revert to Pending
                                </Button>
                              )}
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
