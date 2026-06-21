import { Button, buttonVariants } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { ShoppingCartIcon } from "lucide-react";
import Image from "next/image";

interface Props {
  title: string;
  description: string;
  image: string;
  price: number;
}

export const ProductDetails = ({ title, description, image, price }: Props) => {
  return (
    <Drawer direction="right">
      <DrawerTrigger
        className={cn("flex-1", buttonVariants({ variant: "default" }))}
      >
        Details
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Product details</DrawerTitle>
          <DrawerDescription>
            View all details about your product.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-6 space-y-4">
          <div className="w-full bg-primary overflow-hidden rounded-lg">
            <Image
              src={image}
              loading="eager"
              alt="productImage"
              height={200}
              width={230}
              className="aspect-square w-full object-cover"
            />
          </div>
          <p className="text-emerald-700 text-3xl font-semibold">$ {price}</p>
          <p className="text-xl font-medium">{title}</p>
          <p className="">{description}</p>
        </div>
        <DrawerFooter>
          <Button>
            <ShoppingCartIcon /> Add to cart
          </Button>
          <DrawerClose className={cn(buttonVariants({ variant: "outline" }))}>
            Cancel
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
