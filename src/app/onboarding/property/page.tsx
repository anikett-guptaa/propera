"use client";

import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Resolver } from "react-hook-form";
import { createProperty } from "@/actions/property";
import {
  Building2,
  Users,
  Home,
  Landmark,
  Briefcase,
  TreePine,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import {
  propertySchema,
  type PropertyInput,
} from "@/lib/validations/onboarding";
import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthCard } from "@/components/auth/auth-card";
import { OnboardingStepper } from "@/components/onboarding/onboarding-stepper";
import { WizardFooter } from "@/components/onboarding/wizard-footer";
import { PropertyTypeCard } from "@/components/onboarding/property-type-card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const steps = [
  { label: "Organization", status: "done" as const },
  { label: "Property", status: "active" as const },
  { label: "Rooms", status: "pending" as const },
];

interface PropertyType {
  value: PropertyInput["type"];
  label: string;
  description: string;
  icon: LucideIcon;
}

const propertyTypes: PropertyType[] = [
  {
    value: "hostel",
    label: "Hostel",
    description: "Shared accommodation with multiple tenants",
    icon: Users,
  },
  {
    value: "pg",
    label: "PG (Paying Guest)",
    description: "Paying guest accommodation with meals",
    icon: Home,
  },
  {
    value: "apartment",
    label: "Apartment",
    description: "Residential apartment complex",
    icon: Building2,
  },
  {
    value: "residential",
    label: "Residential Building",
    description: "Multi-unit residential property",
    icon: Landmark,
  },
  {
    value: "commercial",
    label: "Commercial Building",
    description: "Office or commercial rental space",
    icon: Briefcase,
  },
  {
    value: "villa",
    label: "Villa",
    description: "Independent villa or bungalow",
    icon: TreePine,
  },
];

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-red-500 dark:text-red-400">{message}</p>;
}

function FieldHint({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs text-zinc-400 dark:text-zinc-500">{children}</p>
  );
}

export default function OnboardingPropertyPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PropertyInput>({
    resolver: zodResolver(propertySchema) as Resolver<PropertyInput>,
    defaultValues: {
      country: "India",
      floors: 1,
    },
  });

  async function onSubmit(data: PropertyInput): Promise<void> {
  try {
    await createProperty({
      name: data.name,
      type: data.type,
      addressLine: data.addressLine,
      city: data.city,
      state: data.state,
      pincode: data.pincode,
      country: data.country,
      floors: Number(data.floors),
      description: data.description,
    });

    router.push("/onboarding/rooms");
  } catch (error) {
    console.error(error);
  }
}

  return (
    <AuthLayout>
      <OnboardingStepper steps={steps} />

      <AuthCard className="max-w-[480px] mx-auto">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Add your first property
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
              You can add more properties from the dashboard later.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
          {/* Property Name */}
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-sm font-medium">
              Property name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="e.g. Gupta Boys Hostel"
              autoFocus
              aria-invalid={!!errors.name}
              {...register("name")}
              className={
                errors.name
                  ? "border-red-400 focus-visible:ring-red-300 dark:border-red-700"
                  : ""
              }
            />
            {errors.name ? (
              <FieldError message={errors.name.message} />
            ) : (
              <FieldHint>The public name of this property.</FieldHint>
            )}
          </div>

          {/* Property Type */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Property type</Label>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {propertyTypes.map((pt) => (
                    <PropertyTypeCard
                      key={pt.value}
                      label={pt.label}
                      description={pt.description}
                      icon={pt.icon}
                      selected={field.value === pt.value}
                      onClick={() => field.onChange(pt.value)}
                    />
                  ))}
                </div>
              )}
            />
            <FieldError message={errors.type?.message} />
          </div>

          <div className="border-t border-zinc-100 dark:border-zinc-800" />

          {/* Address */}
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              Address
            </p>

            <div className="space-y-1.5">
              <Label htmlFor="addressLine" className="text-sm font-medium">
                Address line
              </Label>
              <Input
                id="addressLine"
                type="text"
                placeholder="123 MG Road, Koregaon Park"
                aria-invalid={!!errors.addressLine}
                {...register("addressLine")}
                className={
                  errors.addressLine
                    ? "border-red-400 focus-visible:ring-red-300 dark:border-red-700"
                    : ""
                }
              />
              <FieldError message={errors.addressLine?.message} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="city" className="text-sm font-medium">
                  City
                </Label>
                <Input
                  id="city"
                  type="text"
                  placeholder="Pune"
                  aria-invalid={!!errors.city}
                  {...register("city")}
                  className={
                    errors.city
                      ? "border-red-400 focus-visible:ring-red-300 dark:border-red-700"
                      : ""
                  }
                />
                <FieldError message={errors.city?.message} />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="state" className="text-sm font-medium">
                  State
                </Label>
                <Input
                  id="state"
                  type="text"
                  placeholder="Maharashtra"
                  aria-invalid={!!errors.state}
                  {...register("state")}
                  className={
                    errors.state
                      ? "border-red-400 focus-visible:ring-red-300 dark:border-red-700"
                      : ""
                  }
                />
                <FieldError message={errors.state?.message} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="pincode" className="text-sm font-medium">
                  Pincode
                </Label>
                <Input
                  id="pincode"
                  type="text"
                  placeholder="411001"
                  maxLength={6}
                  aria-invalid={!!errors.pincode}
                  {...register("pincode")}
                  className={
                    errors.pincode
                      ? "border-red-400 focus-visible:ring-red-300 dark:border-red-700"
                      : ""
                  }
                />
                <FieldError message={errors.pincode?.message} />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="country" className="text-sm font-medium">
                  Country
                </Label>
                <Input
                  id="country"
                  type="text"
                  {...register("country")}
                  aria-invalid={!!errors.country}
                  className={
                    errors.country
                      ? "border-red-400 focus-visible:ring-red-300 dark:border-red-700"
                      : ""
                  }
                />
                <FieldError message={errors.country?.message} />
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-100 dark:border-zinc-800" />

          {/* Additional */}
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              Additional information
            </p>

            <div className="space-y-1.5">
              <Label htmlFor="floors" className="text-sm font-medium">
                Number of floors
              </Label>
              <Input
                id="floors"
                type="number"
                min={1}
                max={50}
                placeholder="3"
                aria-invalid={!!errors.floors}
                {...register("floors")}
                className={
                  errors.floors
                    ? "border-red-400 focus-visible:ring-red-300 dark:border-red-700"
                    : ""
                }
              />
              {errors.floors ? (
                <FieldError message={errors.floors.message} />
              ) : (
                <FieldHint>
                  Used to auto-generate rooms in the next step.
                </FieldHint>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="description" className="text-sm font-medium">
                  Description
                </Label>
                <span className="text-xs text-zinc-400 dark:text-zinc-500">
                  Optional
                </span>
              </div>
              <Textarea
                id="description"
                placeholder="Brief description of this property…"
                rows={3}
                aria-invalid={!!errors.description}
                {...register("description")}
                className={
                  errors.description
                    ? "border-red-400 focus-visible:ring-red-300 dark:border-red-700 resize-none"
                    : "resize-none"
                }
              />
              <FieldError message={errors.description?.message} />
            </div>
          </div>

          <div className="border-t border-zinc-100 dark:border-zinc-800 pt-1" />

          <WizardFooter
            backHref="/onboarding"
            backLabel="Organization"
            submitLabel="Continue"
            loading={isSubmitting}
          />
        </form>
      </AuthCard>

      <p className="text-xs text-center text-zinc-400 dark:text-zinc-500 mt-5">
        You can edit property details anytime from the dashboard.
      </p>
    </AuthLayout>
  );
}