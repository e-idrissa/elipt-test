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
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

const formSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters.")
    .max(32, "Title must be at most 32 characters."),
  description: z
    .string()
    .min(4, "Description must be at least 4 characters.")
    .max(200, "Description must be at most 200 characters."),
  image: z.string().min(1, "Image is required."),
  price: z.number().positive("Price must be greater than 0"),
});

export const NewProductForm = () => {
  const [productImg, setProductImg] = useState<string>(
    "/images/sample-product.jpg",
  );
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      image: "",
      price: 0,
    },
  });

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { isValid, isSubmitting },
  } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await api.post("/products/create", values);
      toast.success("Product created successfully!");
      
      reset();
      setProductImg("/images/sample-product.jpg");
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error(
        err instanceof AxiosError
          ? err.response?.data?.message || "Failed to create product"
          : "Failed. Try again",
      );
    }
  }

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

      const response = await api.post("/products/upload-cover", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const serverImageUrl = response.data.secureUrl || response.data.Url;
      if (!serverImageUrl) throw new Error("Invalid image URL returned.");

      setValue("image", serverImageUrl, { shouldValidate: true });
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error uploading image.");
      setProductImg("/images/sample-product.jpg");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form id="new-product-form" onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader className="px-6">
          <CardTitle>Create a new Product</CardTitle>
          <CardDescription>
            Fill in all fields to create a new product
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6">
          <FieldGroup className="flex flex-row items-center gap-6">
            
            {/* ZONE UPLOAD D'IMAGE DE-DUPLIQUEE */}
            <Controller
              name="image"
              control={control}
              render={({ fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="w-[38%] aspect-square relative flex flex-col justify-between"
                >
                  <FieldLabel
                    htmlFor="product-form-cover"
                    className="cursor-pointer group relative block size-full rounded-lg overflow-hidden border border-dashed border-muted-foreground/50 hover:border-primary transition"
                  >
                    <Image
                      src={productImg}
                      loading="eager"
                      alt="Product preview"
                      fill
                      className={cn(
                        "object-cover transition-opacity",
                        isUploading ? "opacity-40" : "group-hover:opacity-80",
                      )}
                    />
                    {isUploading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/20">
                        <Spinner />
                      </div>
                    )}
                  </FieldLabel>
                  <Input
                    id="product-form-cover"
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
                  render={({ field: { onChange, value, ...fieldRest }, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="w-1/3">
                      <FieldLabel htmlFor="new-product-form-price">
                        Price
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupAddon>
                          <DollarSignIcon />
                        </InputGroupAddon>
                        <InputGroupInput
                          {...fieldRest}
                          value={value || ""}
                          id="new-product-form-price"
                          aria-invalid={fieldState.invalid}
                          placeholder="99"
                          type="number"
                          autoComplete="off"
                          onChange={(e) => onChange(e.target.valueAsNumber || 0)}
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
                  disabled={isSubmitting || isUploading || !isValid}
                >
                  {isSubmitting ? (
                    <>
                      <Spinner className="mr-2" />
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