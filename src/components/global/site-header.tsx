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
import { DeleteUserButton } from "@/features/auth/delete-account";

interface Props {
  email: string | undefined;
  fname: string | undefined;
  lname: string | undefined;
  avatar: string | undefined;
  userId: string | undefined;
}

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

const UserButton = ({ email, lname, fname, avatar, userId }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            src={avatar}
            loading="eager"
            alt="@shadcn"
            className="grayscale"
          />
          <AvatarFallback>
            {lname![0]}
            {fname![0]}
          </AvatarFallback>
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
                  src={avatar}
                  loading="eager"
                  alt="@shadcn"
                  className="grayscale"
                />
                <AvatarFallback>
                  {lname![0]}
                  {fname![0]}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {lname} {fname}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {email}
                </span>
              </div>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <SignOutButton />
        <DeleteUserButton userId={userId!}/>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const Siteheader = ({ lname, fname, avatar, userId, email }: Props) => {
  return (
    <div className="flex items-center justify-between">
      <Link href="/dashboard">
        <LogoIcon />
      </Link>
      <div className="flex items-center gap-4 py-6">
        <ProductsDropdown />
        <UserButton email={email} fname={fname} lname={lname} avatar={avatar} userId={userId} />
      </div>
    </div>
  );
};
