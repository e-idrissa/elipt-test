"use client";

import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";

import { LogoIcon } from "./logo";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

const ProductsDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost">
            Products <ChevronDownIcon />
          </Button>
        }
      />
      <DropdownMenuContent className="w-40" align="start">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Products Categories</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link href="/products/yours">Your Products</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
          <Link href="/products/others">Others Products</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const UserButton = () => {
  return (
    <Drawer direction="right">
      <DrawerTrigger>
        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="@shadcn"
            className="grayscale"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        eddy is awesome
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose className={cn(buttonVariants({ variant: "outline" }))}>
            Cancel
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export const Siteheader = () => {
  return (
    <div className="flex items-center justify-between">
      <Link href="/dashboard">
        <LogoIcon />
      </Link>
      <div className="flex items-center gap-4 py-6">
        <ProductsDropdown />
        <UserButton />
      </div>
    </div>
  );
};
