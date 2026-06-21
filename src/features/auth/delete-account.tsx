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

  const handleDeleteAccount = async () => {
    if (!userId) {
      toast.error("Impossible de récupérer votre identifiant utilisateur.");
      return;
    }

    setIsDeleting(true);
    try {
      await api.delete(`/AppUsers/Delete/${userId}`);

      toast.success("Deleted Successfully.");

      Cookies.remove("auth_token");

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
    <AlertDialog>
      <AlertDialogTrigger>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="w-full text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer"
        >
          <Trash2Icon className="mr-2 h-4 w-4" />
          <span>Delete account</span>
        </DropdownMenuItem>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteAccount}
            disabled={isDeleting}
            className={cn(buttonVariants({ variant: "destructive"}))}
          >
            {isDeleting ? (
              <>
                <Spinner className="mr-2 h-4 w-4" />
                Deleting...
              </>
            ) : (
              "delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};