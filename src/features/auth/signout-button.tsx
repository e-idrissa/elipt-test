"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";
import Cookies from "js-cookie";
import { toast } from "sonner";

export const SignOutButton = () => {
  const handleLogout = () => {
    Cookies.remove("auth_token");

    toast.success("Déconnexion réussie.");

    window.location.href = "/signin";
  };

  return (
    <DropdownMenuItem
      onClick={handleLogout}
      className="w-full text-destructive focus:text-destructive cursor-pointer"
    >
      <LogOutIcon className="mr-2 h-4 w-4" />
      <span>Sign out</span>
    </DropdownMenuItem>
  );
};
