import { InsightCards } from "@/features/dashboard/insight-cards";
import { NewProductForm } from "@/features/dashboard/new-product-form";
import { ProductCard } from "@/features/products/product-card";
import { CalendarRangeIcon } from "lucide-react";

const data = [
  {
    id: "1",
    title: "Nike Shoes",
    description:
      "Sportive Nike shoes made with recents medical and sportive technologies, blend for confort and style",
    image: "/images/shoe.jpg",
    price: 30,
  },
  {
    id: "2",
    title: "Nike Shoes",
    description:
      "Sportive Nike shoes made with recents medical and sportive technologies, blend for confort and style",
    image: "/images/sample-product.jpg",
    price: 30,
  },
  {
    id: "3",
    title: "Nike Shoes",
    description:
      "Sportive Nike shoes made with recents medical and sportive technologies, blend for confort and style",
    image: "/images/sample-product.jpg",
    price: 30,
  },
  {
    id: "4",
    title: "Nike Shoes",
    description:
      "Sportive Nike shoes made with recents medical and sportive technologies, blend for confort and style",
    image: "/images/sample-product.jpg",
    price: 30,
  },
  {
    id: "5",
    title: "Nike Shoes",
    description:
      "Sportive Nike shoes made with recents medical and sportive technologies, blend for confort and style",
    image: "/images/sample-product.jpg",
    price: 30,
  },
  {
    id: "6",
    title: "Nike Shoes",
    description:
      "Sportive Nike shoes made with recents medical and sportive technologies, blend for confort and style",
    image: "/images/sample-product.jpg",
    price: 30,
  },
];

const DashboardPage = () => {
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
        <div className="grid grid-cols-4 gap-8 pb-8">
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
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
