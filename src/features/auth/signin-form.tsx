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
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { api } from "@/lib/axios";

const formSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(4, "Password must be at least 4 characters.")
    .max(32, "Password must be at most 32 characters."),
});

export const SigninForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const dest = "/dashboard";

    try {
      const response = await api.post("/auth/sign-in", values);

      const token = response.data?.Token || response.data?.accessToken;
      const user = response.data?.DataUser;

      if (!token) {
        throw new Error("Missing token");
      }

      Cookies.set("auth_token", token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
      Cookies.set("user_id", user._id, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
      Cookies.set("user_fname", user.fname, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
      Cookies.set("user_lname", user.lname, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
      Cookies.set("user_avatar", user.cover || "", {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
      Cookies.set("user_email", user.email || "", {
        expires: 7,
        secure: true,
        sameSite: "strict",
      })

      toast.success("Welcome back");
      router.push(dest);
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error(
        err instanceof AxiosError
          ? err.response?.data?.message || err.response?.data?.message
          : "An unexpected error occurred",
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
      <form id="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Sign In</CardTitle>
            <CardDescription>Enter your email below to signin</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="sign-in-form-email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="sign-in-form-email"
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
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="sign-in-form-password">
                      Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id="sign-in-form-password"
                      aria-invalid={fieldState.invalid}
                      type="password"
                      placeholder="••••••••"
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
                form="sign-in-form"
                className="w-full"
                disabled={isSubmitting || !isValid}
              >
                {isSubmitting ? (
                  <>
                    <Spinner />
                    Signing in...
                  </>
                ) : (
                  <>Sign In</>
                )}
              </Button>
            </Field>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};
