import { ProductCard } from "@/features/products/product-card";

const data = [
  {
    id: "1",
    title: "Nike Shoes",
    description:
      "Sportive Nike shoes made with recents medical and sportive technologies, blend for confort and style",
    image: "/images/sample-product.jpg",
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
  )
}

export default YourProductsPage