"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { authClient } from "@/lib/auth-client";
import { signInSchema, type SignInInput } from "@/lib/validations/auth";

import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthHeader } from "@/components/auth/auth-header";
import { AuthFooter } from "@/components/auth/auth-footer";
import { SocialLogin } from "@/components/auth/social-login";
import { PasswordInput } from "@/components/auth/password-input";
import { LoadingButton } from "@/components/auth/loading-button";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function SignInPage() {
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
  });

  async function onSubmit(data: SignInInput) {
    setAuthError(null);
    const { error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
      callbackURL: "/auth/redirect",
    });
    if (error) {
      setAuthError(error.message ?? "Something went wrong. Please try again.");
      return;
    }
    router.push("/auth/redirect");
  }

  async function handleGoogleLogin() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/auth/redirect",
    });
  }

  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title="Welcome back"
          description="Sign in to your Propera account to continue."
        />

        <SocialLogin onGoogleLogin={handleGoogleLogin} />

        {/* Divider */}
        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-200 dark:border-white/[0.08]" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white dark:bg-ink-900 px-3 text-xs text-zinc-400 dark:text-zinc-500">
              or continue with email
            </span>
          </div>
        </div>

        {/* Auth error banner */}
        {authError && (
          <div className="mb-4 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 px-4 py-3">
            <p className="text-sm text-red-600 dark:text-red-400">{authError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          {/* Email */}
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

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Password
              </Label>
              <Link
                href="/forgot-password"
                className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white underline underline-offset-4 transition-colors"
                tabIndex={-1}
              >
                Forgot password?
              </Link>
            </div>
            <PasswordInput
              id="password"
              autoComplete="current-password"
              placeholder="••••••••"
              aria-invalid={!!errors.password}
              {...register("password")}
              className={
                errors.password
                  ? "border-red-400 focus-visible:ring-red-300 dark:border-red-700"
                  : ""
              }
            />
            {errors.password && (
              <p className="text-xs text-red-500 dark:text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          <LoadingButton type="submit" loading={isSubmitting} className="mt-2">
            Sign in
          </LoadingButton>
        </form>
      </AuthCard>

      <AuthFooter
        text="Don't have an account?"
        linkText="Sign up"
        href="/sign-up"
      />
    </AuthLayout>
  );
}