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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { DollarSignIcon } from "lucide-react";
import { api } from "@/lib/axios";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  title: z
    .string()
    .min(4, "Password must be at least 4 characters.")
    .max(32, "Password must be at most 32 characters."),
  description: z
    .string()
    .min(4, "Password must be at least 4 characters.")
    .max(200, "Password must be at most 200 characters."),
  image: z.string().min(4, "Image is required."),
  price: z.number(),
});

export const NewProductForm = () => {
  const [productImg, setProductImg] = useState<string>(
    "/images/sample-product.jpg",
  );
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      price: 0,
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
    setValue,
    formState: { isValid, isSubmitting },
  } = form;

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    const localUrl = URL.createObjectURL(file);
    setProductImg(localUrl);

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post("/AppUsers/UploadImage", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const serverImageUrl = response.data.secure_url || response.data.url;

      setValue("image", serverImageUrl, { shouldValidate: true });

      toast.success("Image téléversée avec succès !");
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de l'upload de l'image.");
      setProductImg(productImg);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form id="new-product-form" onSubmit={handleSubmit(onSubmit)}>
      <Card className="">
        <CardHeader className="px-6">
          <CardTitle>Create a new Product</CardTitle>
          <CardDescription>
            Fill in all fields to create a new product
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6">
          <FieldGroup className="flex flex-row items-center gap-6">
            <Controller
              name="image"
              control={control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="w-[38%] aspect-square relative"
                >
                  <Field
                    data-invalid={fieldState.invalid}
                    className="w-[38%] aspect-square relative"
                  >
                    <FieldLabel
                      htmlFor="new-product-form-image"
                      className="cursor-pointer group relative block size-full rounded-lg overflow-hidden border border-dashed border-muted-foreground/50 hover:border-primary transition"
                    >
                      <Image
                        src={productImg}
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
                      id="new-product-form-image"
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
                  <div className="w-10">
                    <Input
                      {...field}
                      id="new-product-form-image"
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
              <div className="flex items-center gap-4">
                <Controller
                  name="title"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="flex-1">
                      <FieldLabel htmlFor="new-product-form-title">
                        Title
                      </FieldLabel>
                      <Input
                        {...field}
                        id="new-product-form-title"
                        aria-invalid={fieldState.invalid}
                        placeholder="Sneakers"
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
                  name="price"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="w-1/3">
                      <FieldLabel htmlFor="new-product-form-price">
                        Price
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupAddon>
                          <DollarSignIcon />
                        </InputGroupAddon>
                        <InputGroupInput
                          {...field}
                          id="new-product-form-price"
                          aria-invalid={fieldState.invalid}
                          placeholder="Sneakers"
                          type="number"
                          autoComplete="off"
                        />
                      </InputGroup>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
              <Controller
                name="description"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="new-product-form-description">
                      Description
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupTextarea
                        {...field}
                        id="new-product-form-description"
                        aria-invalid={fieldState.invalid}
                        placeholder="Product description..."
                        className="min-h-[80px]"
                        rows={4}
                        autoComplete="off"
                      />
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Field orientation="horizontal">
                <Button
                  type="submit"
                  form="new-product-form"
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
            </div>
          </FieldGroup>
        </CardContent>
      </Card>
    </form>
  );
};
