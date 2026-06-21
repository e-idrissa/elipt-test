import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { LogOutIcon } from "lucide-react"

export const SignOutButton = () => {
  return (
    <DropdownMenuItem className="w-full">
      <LogOutIcon />
      Sign out
    </DropdownMenuItem>
  )
}