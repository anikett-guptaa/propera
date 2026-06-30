"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  organizationSchema,
  type OrganizationInput,
} from "@/lib/validations/organization";

import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthCard } from "@/components/auth/auth-card";
import { LoadingButton } from "@/components/auth/loading-button";
import { OnboardingStepper } from "@/components/onboarding/onboarding-stepper";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Building2, Sparkles } from "lucide-react";

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 40);
}

const steps = [
  { label: "Organization", status: "active" as const },
  { label: "Property", status: "pending" as const },
  { label: "Rooms", status: "pending" as const },
];

export default function OnboardingPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isSubmitting, dirtyFields },
  } = useForm<OrganizationInput>({
    resolver: zodResolver(organizationSchema),
    defaultValues: { name: "", slug: "" },
  });

  const nameValue = watch("name");

  useEffect(() => {
    if (!dirtyFields.slug) {
      setValue("slug", generateSlug(nameValue), { shouldValidate: false });
    }
  }, [nameValue, dirtyFields.slug, setValue]);

  async function onSubmit(_data: OrganizationInput) {
    // TODO: Replace with real API call — createOrganization(data)
    await new Promise((resolve) => setTimeout(resolve, 800));
    router.push("/onboarding/property");
  }

  return (
    <AuthLayout>
      <OnboardingStepper steps={steps} />

      <AuthCard>
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Set up your organization
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
              This is how your business will appear across Propera.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-sm font-medium">
              Organization name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="e.g. Gupta Hostels"
              autoComplete="organization"
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
              <p className="text-xs text-red-500 dark:text-red-400">
                {errors.name.message}
              </p>
            ) : (
              <p className="text-xs text-zinc-400 dark:text-zinc-500">
                The name of your hostel, PG, or property business.
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="slug" className="text-sm font-medium">
                Organization slug
              </Label>
              {!dirtyFields.slug && nameValue.length > 0 && (
                <span className="flex items-center gap-1 text-[11px] text-zinc-400 dark:text-zinc-500">
                  <Sparkles className="w-3 h-3" />
                  Auto-generated
                </span>
              )}
            </div>
            <div className="flex items-center rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 overflow-hidden focus-within:ring-2 focus-within:ring-zinc-300 dark:focus-within:ring-zinc-600 focus-within:border-zinc-400 dark:focus-within:border-zinc-500 transition-all">
              <span className="px-3 py-2 text-sm text-zinc-400 dark:text-zinc-500 bg-zinc-50 dark:bg-zinc-800 border-r border-zinc-200 dark:border-zinc-700 select-none shrink-0">
                propera.in/
              </span>
              <input
                id="slug"
                type="text"
                placeholder="gupta-hostels"
                autoComplete="off"
                spellCheck={false}
                aria-invalid={!!errors.slug}
                {...register("slug", { onChange: () => trigger("slug") })}
                className="flex-1 px-3 py-2 text-sm text-zinc-900 dark:text-white bg-transparent outline-none placeholder:text-zinc-300 dark:placeholder:text-zinc-600"
              />
            </div>
            {errors.slug ? (
              <p className="text-xs text-red-500 dark:text-red-400">
                {errors.slug.message}
              </p>
            ) : (
              <p className="text-xs text-zinc-400 dark:text-zinc-500">
                Used in URLs. Only lowercase letters, numbers, and hyphens.
              </p>
            )}
          </div>

          <div className="border-t border-zinc-100 dark:border-zinc-800 pt-1" />

          <LoadingButton
            type="submit"
            loading={isSubmitting}
            className="w-full bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
          >
            Continue
          </LoadingButton>
        </form>
      </AuthCard>

      <p className="text-xs text-center text-zinc-400 dark:text-zinc-500 mt-5">
        You can change these details later in Settings.
      </p>
    </AuthLayout>
  );
}