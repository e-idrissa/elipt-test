"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { api } from "@/lib/axios";
import { Spinner } from "@/components/ui/spinner";
import { BanknoteIcon, InboxIcon, StoreIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  userId: string;
}

export const InsightCards = () => {
  const [yours, setYours] = useState<number>(0);
  const [others, setOthers] = useState<number>(0);
  const [cash, setCash] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAndFilterProducts = async () => {
      try {
        setLoading(true);

        const [minesRes, otherRes] = await Promise.all([
          api.get("/products/my-products"),
          api.get("/products/other-products"),
        ]);

        const myProducts: Product[] = minesRes.data.data || [];
        const otherProducts: Product[] = otherRes.data.data || [];

        setYours(myProducts.length);
        setOthers(otherProducts.length);

        const totalInvestment = myProducts.reduce((sum, product) => {
          return sum + (Number(product.price) || 0);
        }, 0);
        
        setCash(totalInvestment);
      } catch (error) {
        console.error("Error fetching insights data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndFilterProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Spinner className="h-6 w-6" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardDescription className="flex items-center gap-1.5 font-medium">
            <BanknoteIcon className="h-4 w-4 text-emerald-600" />
            Total Investment
          </CardDescription>
        </CardHeader>
        <CardContent className="text-3xl font-bold tracking-tight">
          $ {cash.toLocaleString()}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardDescription className="flex items-center gap-1.5 font-medium">
            <InboxIcon className="h-4 w-4 text-blue-600" />
            Your Products
          </CardDescription>
        </CardHeader>
        <CardContent className="text-3xl font-bold tracking-tight">
          {yours}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardDescription className="flex items-center gap-1.5 font-medium">
            <StoreIcon className="h-4 w-4 text-amber-600" />
            Others Products
          </CardDescription>
        </CardHeader>
        <CardContent className="text-3xl font-bold tracking-tight">
          {others}
        </CardContent>
      </Card>
    </div>
  );
};