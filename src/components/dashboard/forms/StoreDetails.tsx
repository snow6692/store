"use client";

import { FC, useEffect } from "react";

import { Store } from "@prisma/client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Schema

import { AlertDialog } from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { StoreFormSchema } from "@/lib/schemas/store";
import ImageUpload from "../shared/ImageUpload";
import { upsertCategory } from "@/actions/category";
import { v4 } from "uuid";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
interface CategoryDetailsProps {
  data?: Store;
}

const StoreDetails: FC<CategoryDetailsProps> = ({ data }) => {
  const router = useRouter();
  // Form hook for managing form state and validation
  const form = useForm<StoreFormSchema>({
    mode: "onChange", // Form validation mode
    resolver: zodResolver(StoreFormSchema), // Resolver for form validation
    defaultValues: {
      // Setting default form values from data (if available)
      name: data?.name,
      description: data?.description,
      email: data?.email,
      phone: data?.phone,
      logo: data?.logo ? [{ url: data?.logo }] : [],
      cover: data?.cover ? [{ url: data?.cover }] : [],
      url: data?.url || "",
      featured: data?.featured || false,
      status: data?.status.toString(),
    },
  });

  // Loading status based on form submission
  const isLoading = form.formState.isSubmitting;

  // Reset form values when data changes
  useEffect(() => {
    if (data) {
      form.reset({
        ...data,
        logo: [{ url: data?.logo }],
        cover: [{ url: data?.cover }],
      });
    }
  }, [data, form]);

  // Submit handler for form submission
  const handleSubmit = async (values: StoreFormSchema) => {
    try {
      // Upsert the Store data
      const response = await upsertCategory({
        id: data?.id ? data.id : v4(),
        name: values.name,
        image: values.image[0].url,
        url: values.url,
        featured: values.featured,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      toast.success(response.name + " store added");

      if (data?.id) {
        router.refresh();
      } else {
        router.push("/dashboard/admin/categories");
      }
    } catch (error: any) {
      toast.error("OOPS!" + error.toString());
    }
  };

  return (
    <AlertDialog>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Store Information</CardTitle>
          <CardDescription>
            {data?.id
              ? `Update ${data?.name} Store information.`
              : " Lets create a Store. You can edit Store later from the settings page."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              {/* Logo an cover */}
              <div className="relative py-2 md:mb-24">
                <FormField
                  control={form.control}
                  name="logo"
                  render={({ field }) => (
                    // <FormItem className="absolute top-52 sm:top-32 sm:ml-56">
                    <FormItem className="absolute top-[22rem] sm:top-36 md:left-20">
                      <FormControl>
                        <ImageUpload
                          type="profile"
                          value={field.value.map((image) => image.url)}
                          disabled={isLoading}
                          onChange={(url) => field.onChange([{ url }])}
                          onRemove={(url) =>
                            field.onChange([
                              ...field.value.filter(
                                (current) => current.url !== url,
                              ),
                            ])
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cover"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <ImageUpload
                          type="cover"
                          value={field.value.map((image) => image.url)}
                          disabled={isLoading}
                          onChange={(url) => field.onChange([{ url }])}
                          onRemove={(url) =>
                            field.onChange([
                              ...field.value.filter(
                                (current) => current.url !== url,
                              ),
                            ])
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Name  */}

              <div className="flex flex-col gap-6 pt-52 sm:pt-0">
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Store name</FormLabel>
                      <FormControl>
                        <Input placeholder="Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* description */}
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Store Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* email && phone */}
                <div className="flex flex-col gap-6 md:flex-row">
                  <FormField
                    disabled={isLoading}
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Store email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email" {...field} type="email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    disabled={isLoading}
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Store phone</FormLabel>
                        <FormControl>
                          <Input placeholder="phone" {...field} type="" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Store url</FormLabel>
                      <FormControl>
                        <Input placeholder="/store-url" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Featured</FormLabel>
                        <FormDescription>
                          This Store will appear on the home page
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                <div className="">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading
                      ? "loading..."
                      : data?.id
                        ? "Save Store information"
                        : "Create Store"}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </AlertDialog>
  );
};

export default StoreDetails;
