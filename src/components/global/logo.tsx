import { StoreIcon } from "lucide-react"

export const LogoIcon = () => {
  return (
    <div className="rounded-md p-2 bg-primary text-white">
      <StoreIcon />
    </div>
  )
}

export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <LogoIcon />
      <p className="text-xl font-medium">Soko.inc</p>
    </div>
  )
}