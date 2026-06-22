"use client";

import { useState } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2Icon } from "lucide-react";
import { api } from "@/lib/axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { AxiosError } from "axios";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface Props {
  userId: string;
}

export const DeleteUserButton = ({ userId }: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteAccount = async (userId: string) => {
    if (!userId) {
      toast.error("Missing identifier.");
      return;
    }

    setIsDeleting(true);
    try {
      await api.delete(`/auth/users/${userId}`);

      toast.success("Deleted Successfully.");

      Cookies.remove("auth_token");

      setIsOpen(false)

      window.location.href = "/signup";
    } catch (err) {
      const errorMessage =
        err instanceof AxiosError ? err.response?.data?.message : "Error deleting your account.";
      toast.error(errorMessage);
    } finally {
      setIsDeleting(false);
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