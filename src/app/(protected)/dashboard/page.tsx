import { InsightCards } from "@/features/dashboard/insight-cards";
import { NewProductForm } from "@/features/dashboard/new-product-form";
import { ProductsGrid } from "@/features/products/products-grid";
import { CalendarRangeIcon } from "lucide-react";

const DashboardPage = async () => {
  const date = new Date();

  return (
    <div className="space-y-16">
      <div className="w-full grid grid-cols-4 gap-12 my-10">
        <div className="col-span-2">
          <NewProductForm />
        </div>
        <div className="space-y-10 col-span-2">
          <div className="rounded-md p-2 px-3 flex items-center gap-2 bg-primary text-xs text-white w-fit">
            <CalendarRangeIcon className="size-4" />
            <p>{date.toDateString()}</p>
          </div>
          <div className="space-y-2">
            <h1 className="text-5xl font-bold">Welcome back, Eddy</h1>
            <p className="text-muted-foreground">
              Good to see you again. Get started by adding another product for
              your customers
            </p>
            <p className="text-muted-foreground">
              You are doing a good job so far
            </p>
          </div>
          <InsightCards />
        </div>
      </div>
      <div className="space-y-6">
        <h2 className="text-2xl font-medium">All Products</h2>
        <ProductsGrid category="all"/>
        {/* <div className="grid grid-cols-4 gap-8 pb-8">
          {data.map((d, idx) => (
            <ProductCard
              key={idx}
              id={d.id}
              image={d.image}
              title={d.title}
              description={d.description}
              price={d.price}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default DashboardPage;
