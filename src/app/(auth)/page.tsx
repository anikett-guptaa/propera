"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";

import { forgotPasswordSchema, type ForgotPasswordInput } from "@/lib/validations/auth";

import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthHeader } from "@/components/auth/auth-header";
import { AuthFooter } from "@/components/auth/auth-footer";
import { LoadingButton } from "@/components/auth/loading-button";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSubmit(data: ForgotPasswordInput) {
    // TODO: Replace with real API call — authClient.requestPasswordReset(data.email)
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmittedEmail(data.email);
    setSubmitted(true);
  }

  return (
    <AuthLayout>
      <AuthCard>
        {submitted ? (
          <div className="py-4 text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            <div>
              <h2 className="text-base font-semibold text-ink-950 dark:text-white">
                Check your email
              </h2>
              <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                We sent a password reset link to{" "}
                <span className="font-medium text-ink-950 dark:text-white">
                  {submittedEmail}
                </span>
              </p>
            </div>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              Did not receive it? Check your spam folder or{" "}
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="underline underline-offset-4 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
              >
                try again
              </button>
            </p>
          </div>
        ) : (
          <>
            <AuthHeader
              title="Forgot your password?"
              description="Enter your email and we will send you a reset link."
            />

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  autoFocus
                  aria-invalid={!!errors.email}
                  {...register("email")}
                  className={
                    errors.email
                      ? "border-red-400 focus-visible:ring-red-300 dark:border-red-700"
                      : ""
                  }
                />
                {errors.email && (
                  <p className="text-xs text-red-500 dark:text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <LoadingButton type="submit" loading={isSubmitting} className="mt-2">
                Send reset link
              </LoadingButton>
            </form>
          </>
        )}
      </AuthCard>

      <AuthFooter
        text="Remember your password?"
        linkText="Sign in"
        href="/sign-in"
      />
    </AuthLayout>
  );
}