import Link from "next/link"
import { Logo } from "@/components/global/logo"
import { SigninForm } from "@/features/auth/signin-form"

const SignInPage = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex items-center justify-center">
          <Logo />
        </div>
        <SigninForm />
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-primary underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignInPage