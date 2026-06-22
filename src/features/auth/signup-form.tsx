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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";

const formSchema = z.object({
  fname: z
    .string()
    .min(3, "First Name must be at least 3 characters.")
    .max(32, "First Name must be at most 32 characters."),
  lname: z
    .string()
    .min(3, "Last name must be at least 3 characters.")
    .max(32, "Last name must be at most 32 characters."),
  email: z.email(),
});

export const SignupForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fname: "",
      lname: "",
      email: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const dest = `/verify-otp?email=${encodeURIComponent(values.email)}`;

    try {
      await api.post("/auth/sign-up", values);

      toast.success("Success. Check for the OTP in your inbox.");
      router.push(dest);
    } catch (err) {
      toast.error(
        err instanceof AxiosError
          ? err.response?.data?.message
          : "Failed to initialize account",
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
      <form id="sign-up-form" onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Create your account</CardTitle>
            <CardDescription>
              Enter your email below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Controller
                name="fname"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="sign-up-form-fname">
                      First Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id="sign-up-form-fname"
                      aria-invalid={fieldState.invalid}
                      placeholder="Eddy"
                      type="text"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="lname"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="sign-up-form-lname">
                      Last Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id="sign-up-form-lanme"
                      aria-invalid={fieldState.invalid}
                      placeholder="Hemedy"
                      type="text"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="sign-up-form-email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="sign-up-form-email"
                      aria-invalid={fieldState.invalid}
                      type="email"
                      placeholder="eddy@gmail.com"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </CardContent>
          <CardFooter>
            <Field orientation="horizontal">
              <Button
                type="submit"
                form="sign-up-form"
                className="w-full"
                disabled={isSubmitting || !isValid}
              >
                {isSubmitting ? (
                  <>
                    <Spinner />
                    Creating...
                  </>
                ) : (
                  <>Create</>
                )}
              </Button>
            </Field>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};
