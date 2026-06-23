"use client";

import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/lib/axios";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

const formSchema = z.object({
  token: z.string().length(6, "Le code OTP doit contenir exactement 6 caractères."),
});

export const VerifyOTPForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      token: "",
    },
    mode: "onChange",
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const dest = `/config-account?email=${encodeURIComponent(email)}&token=${encodeURIComponent(values.token)}`;

    try {
      const params = { email, token: values.token };
      
      await api.post("/auth/verify-otp", params);

      toast.success("Successfully Verified");
      router.push(dest);
    } catch (err) {
      toast.error(
        err instanceof AxiosError ? err.response?.data?.message : "Invalid OTP",
      );
    }
  };

  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting },
  } = form;

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form id="verification-form" onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Verify your account</CardTitle>
            <CardDescription>
              Enter the OTP code sent to your email.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <FieldGroup className="w-full flex items-center justify-center">
              <Controller
                name="token"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="w-fit flex flex-col items-center justify-center gap-2">
                    <InputOTP
                      maxLength={6}
                      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                      value={field.value}
                      onChange={field.onChange}
                      className="w-full"
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </CardContent>
          <CardFooter>
            <Field orientation="horizontal" className="w-full">
              <Button
                type="submit"
                form="verification-form"
                className="w-full"
                disabled={isSubmitting || !isValid}
              >
                {isSubmitting ? (
                  <>
                    <Spinner />
                    Verifying...
                  </>
                ) : (
                  <>Verify</>
                )}
              </Button>
            </Field>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};