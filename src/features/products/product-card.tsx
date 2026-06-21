import Image from "next/image";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProductDetails } from "./product-details";
import { EditProductForm } from "./edit-product-form";
import { DeleteProductForm } from "./delete-product-form";
interface Props {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
}

export const ProductCard = ({
  id,
  image,
  title,
  description,
  price,
}: Props) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="size-full overflow-hidden rounded-lg">
          <Image
            src={image}
            loading="eager"
            alt="productImage"
            height={150}
            width={180}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="w-full flex items-center justify-between pt-2">
          <CardTitle>{title}</CardTitle>
          <div className="rounded-md px-2 py-1 bg-emerald-700/20 text-emerald-700 font-medium">
            $ {price}
          </div>
        </div>
        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex items-center gap-2">
        <ProductDetails
          title={title}
          description={description}
          image={image}
          price={price}
        />
        <EditProductForm
          id={id}
          title={title}
          description={description}
          image={image}
          price={price}
        />
        <DeleteProductForm id={id} />
      </CardFooter>
    </Card>
  );
};
