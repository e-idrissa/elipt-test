import { Logo } from "@/components/global/logo"
import { VerifyOTPForm } from "@/features/auth/verify-otp-form"

const VerifyOtpPage = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex items-center justify-center">
          <Logo />
        </div>
        <VerifyOTPForm />
      </div>
    </div>
  )
}

export default VerifyOtpPage