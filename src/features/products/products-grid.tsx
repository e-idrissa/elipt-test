"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/features/products/product-card";
import { api } from "@/lib/axios";
import { Spinner } from "@/components/ui/spinner";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  userId: string;
}

interface ProductsGridProps {
  category: "mines" | "all" | "other";
  emptyMessage?: string;
}

export const ProductsGrid = ({
  category,
}: ProductsGridProps) => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAndFilterProducts = async () => {
      try {
        setLoading(true);

        const [minesRes, otherRes] = await Promise.all([
          api.get("/products/my-products"),
          api.get("/products/other-products"),
        ]);

        const myProducts = minesRes.data || [];
        const otherProducts = otherRes.data || [];

        
        if (category === "mines") {
          setData(myProducts.data);
        } else if (category === "other") {
          setData(otherProducts.data);
        } else if (category === "all") {
          setData([...myProducts.data, ...otherProducts.data]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndFilterProducts();
  }, [category]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spinner className="h-6 w-6" />
      </div>
    );
  }

  return (
    <div className="w-full">
      {data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-8">
          {data.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              image={product.image}
              title={product.title}
              description={product.description}
              price={product.price}
            />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground py-4 italic">
          No products yet
        </p>
      )}
    </div>
  );
};
