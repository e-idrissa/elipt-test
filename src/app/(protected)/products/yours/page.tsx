import { ProductsGrid } from "@/features/products/products-grid"


const YourProductsPage = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-4xl font-bold">Your Products</h2>
        <p className="text-muted-foreground">
          See all products you created on the platform
        </p>
      </div>
      <div className="grid grid-cols-4 gap-8 pb-8">
        <ProductsGrid category="mines"/>
      </div>
    </div>
  )
}

export default YourProductsPage