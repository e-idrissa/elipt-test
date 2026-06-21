"use client";

import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useState } from "react";
import Image from "next/image";

const formSchema = z.object({
  token: z.string().min(4, "Token is required."),
  email: z.email(),
  avatar: z.string().min(4, "Image is required."),
  password: z.string().min(4, "Password must be at least 4 characters."),
  confirmedPassword: z
    .string()
    .min(4, "Confirmed Password must be at least 4 characters."),
});

export const ConfigAccountForm = () => {
  const [avatarImg, setAvatarImg] = useState<string>(
    "/images/sample-product.jpg",
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      token: "",
      email: "",
      avatar: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    });
  }

  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting },
  } = form;

  return (
    <form id="config-account-form" onSubmit={handleSubmit(onSubmit)}>
      <Card className="">
        <CardHeader className="px-6">
          <CardTitle>Update account</CardTitle>
          <CardDescription>
            Fill in all fields to update your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6">
          <FieldGroup className="flex flex-row items-center gap-6">
            <Controller
              name="avatar"
              control={control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="w-[45%] aspect-square relative"
                >
                  <FieldLabel htmlFor="config-account-form-avatar">
                    <div className=" size-full overflow-hidden rounded-lg">
                      <Image
                        src={avatarImg}
                        alt="productImage"
                        height={150}
                        width={180}
                        className="aspect-square w-full object-cover"
                      />
                    </div>
                  </FieldLabel>
                  <div className="w-10">
                    <Input
                      {...field}
                      id="config-account-form-avatar"
                      aria-invalid={fieldState.invalid}
                      type="file"
                      className="absolute top-4 left-4 w-10 hidden"
                    />
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <div className="space-y-4 flex-1">
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="config-account-form-password">
                      Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id="config-account-form-password"
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
              <Controller
                name="confirmedPassword"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="config-account-form-confirmedPassword">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id="config-account-form-confirmedPassword"
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
            </div>
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
                  Updating...
                </>
              ) : (
                <>Update</>
              )}
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </form>
  );
};
