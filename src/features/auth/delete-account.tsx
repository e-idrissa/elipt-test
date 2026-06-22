"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Trash2Icon } from "lucide-react";
import { api } from "@/lib/axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface Props {
  userId: string;
}

export const DeleteUserButton = ({ userId }: Props) => {

  const handleDeleteAccount = async (userId: string) => {
    if (!userId) {
      toast.error("Missing identifier.");
      return;
    }

    try {
      await api.delete(`/auth/users/${userId}`);

      toast.success("Deleted Successfully.");

      Cookies.remove("auth_token");

      window.location.href = "/signup";
    } catch (err) {
      const errorMessage =
        err instanceof AxiosError ? err.response?.data?.message : "Error deleting your account.";
      toast.error(errorMessage);
    }
  };

  return (
    <DropdownMenuItem
      onClick={() => handleDeleteAccount(userId)}
      className={cn(buttonVariants({ variant: "destructive"}), "bg-transparent")}
    >
      <Trash2Icon className="mr-2 h-4 w-4" />
      <span>Delete account</span>
    </DropdownMenuItem>
  );
};