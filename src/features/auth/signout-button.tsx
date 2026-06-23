"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const SignOutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const dest = "/signin";
    {
      Cookies.remove("auth_token");

      toast.success("Successfully signed out.");
      router.push(dest);
    }
  };

  return (
    <DropdownMenuItem
      onClick={() => handleLogout()}
      className="w-full cursor-pointer"
    >
      <LogOutIcon className="mr-2 h-4 w-4" />
      <span>Sign out</span>
    </DropdownMenuItem>
  );
};
