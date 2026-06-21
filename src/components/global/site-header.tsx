"use client";

import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";

import { LogoIcon } from "./logo";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton } from "@/features/auth/signout-button";

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
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="@shadcn"
            className="grayscale"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-56"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                  className="grayscale"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Eddy Hemedy</span>
                <span className="truncate text-xs text-muted-foreground">
                  eddy@gmail.com
                </span>
              </div>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <SignOutButton />
      </DropdownMenuContent>
    </DropdownMenu>
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
