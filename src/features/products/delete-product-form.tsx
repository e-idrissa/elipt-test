"use client";

import { Trash2Icon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

interface Props {
  id: string;
}

export const DeleteProductForm = ({ id }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const router = useRouter();

  const handleDeleteProduct = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!id) return;

    setIsDeleting(true);

    try {
      const token = Cookies.get("auth_token");

      await api.delete(`/products/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Deleted Successfully.");
      setIsDeleting(false);
      router.refresh();
    } catch (err) {
      console.error(err);
      const errorMessage =
        err instanceof AxiosError
          ? err.response?.data?.message || "Error deleting your product."
          : "Error deleting your product.";
      toast.error(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger
        className={cn(buttonVariants({ variant: "destructive" }))}
      >
        <Trash2Icon className="h-4 w-4" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            product from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteProduct}
            disabled={isDeleting}
            className={cn(buttonVariants({ variant: "destructive" }))}
          >
            {isDeleting ? (
              <>
                <Spinner /> Deleting...
              </>
            ) : (
              "Continue"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
