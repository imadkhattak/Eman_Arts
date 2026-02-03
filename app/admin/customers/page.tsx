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
import { Input } from "@/components/ui/input";
import { Search, User } from "lucide-react";
import { StoreData, Customer } from "@/lib/db";

export default function CustomersManagement() {
  const [data, setData] = useState<StoreData | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch("/api/store");
    const json = await res.json();
    setData(json);
  };

  if (!data) return <div className="p-8">Loading customers...</div>;

  const filteredCustomers = data.customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif text-zinc-900">Customer Management</h1>
        <p className="text-zinc-500 font-sans">View your collector network and their order history.</p>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
        <Input 
          placeholder="Search by name or email..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 h-12 bg-white border-none shadow-sm rounded-2xl focus-visible:ring-zinc-900"
        />
      </div>

      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-50">
            <TableRow className="hover:bg-transparent border-zinc-100">
              <TableHead className="w-[80px] font-sans text-xs uppercase tracking-widest font-bold">Collector</TableHead>
              <TableHead className="font-sans text-xs uppercase tracking-widest font-bold">Email</TableHead>
              <TableHead className="font-sans text-xs uppercase tracking-widest font-bold text-center">Orders</TableHead>
              <TableHead className="text-right font-sans text-xs uppercase tracking-widest font-bold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-12 text-zinc-400 font-sans italic">
                  No customers found.
                </TableCell>
              </TableRow>
            ) : (
              filteredCustomers.map((customer) => (
                <TableRow key={customer.id} className="hover:bg-zinc-50/50 border-zinc-50 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center">
                        <User className="w-4 h-4 text-zinc-400" />
                      </div>
                      <span className="font-sans font-medium text-zinc-900">{customer.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-sans text-sm text-zinc-500">{customer.email}</TableCell>
                  <TableCell className="text-center font-sans font-medium text-zinc-900">
                    {customer.orderHistory.length}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-full bg-zinc-100 text-zinc-500">
                      Active Collector
                    </span>
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
