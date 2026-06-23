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
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { api } from "@/lib/axios";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { AxiosError } from "axios";

const formSchema = z.object({
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
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avatar: "",
      password: "",
      confirmedPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const dest = "/dashboard";

    try {
      const params = { avatar: values.avatar, password: values.password, email, token };

      await api.put("/auth/config-account", params);

      toast.success("Successfully configured.")
      router.push(dest)
    } catch (err) {
      toast.error(
        err instanceof AxiosError
          ? err.response?.data?.message
          : "Failed to configure your account.",
      );
    }
  };

  const {
    handleSubmit,
    control,
    setValue,
    formState: { isValid, isSubmitting },
  } = form;

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    const localUrl = URL.createObjectURL(file);
    setAvatarImg(localUrl);

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post("/auth/avatar-upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const serverImageUrl = response.data.secureUrl || response.data.Url;

      setValue("avatar", serverImageUrl, { shouldValidate: true });

      toast.success("Upload completed !");
    } catch (error) {
      console.error(error);
      toast.error("Error uploading image");
      setAvatarImg(avatarImg);
    } finally {
      setIsUploading(false);
    }
  };

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
              render={({ fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="w-[45%] aspect-square relative"
                >
                  <FieldLabel
                    htmlFor="config-account-form-avatar"
                    className="cursor-pointer group relative block size-full rounded-lg overflow-hidden border border-dashed border-muted-foreground/50 hover:border-primary transition"
                  >
                    <Image
                      src={avatarImg}
                      loading="eager"
                      alt="Aperçu du produit"
                      fill
                      className={cn(
                        "object-cover transition-opacity",
                        isUploading ? "opacity-40" : "group-hover:opacity-80",
                      )}
                    />
                    {isUploading && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Spinner />
                      </div>
                    )}
                  </FieldLabel>
                  <Input
                    id="config-account-form-avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={isUploading || isSubmitting}
                    className="hidden"
                  />
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
              form="config-account-form"
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
