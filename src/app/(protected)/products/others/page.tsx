import { ProductsGrid } from "@/features/products/products-grid";

const OthersProductsPage = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-4xl font-bold">Other People&apos;s Products</h2>
        <p className="text-muted-foreground">
          See what other users have on the platform
        </p>
      </div>
      <div className="grid grid-cols-4 gap-8 pb-8">
        <ProductsGrid category="other"/>
      </div>
    </div>
  );
};

export default OthersProductsPage;
