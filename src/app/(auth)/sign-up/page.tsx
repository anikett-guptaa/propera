"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { authClient } from "@/lib/auth-client";
import { signUpSchema, type SignUpInput } from "@/lib/validations/auth";

import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthHeader } from "@/components/auth/auth-header";
import { AuthFooter } from "@/components/auth/auth-footer";
import { SocialLogin } from "@/components/auth/social-login";
import { PasswordInput } from "@/components/auth/password-input";
import { LoadingButton } from "@/components/auth/loading-button";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function SignUpPage() {
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
  });

  async function onSubmit(data: SignUpInput) {
    setAuthError(null);
    const { error } = await authClient.signUp.email({
      name: data.name,
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
          title="Create your account"
          description="Start your 14-day free trial. No credit card required."
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
          {/* Name */}
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Full name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Rahul Gupta"
              autoComplete="name"
              autoFocus
              aria-invalid={!!errors.name}
              {...register("name")}
              className={
                errors.name
                  ? "border-red-400 focus-visible:ring-red-300 dark:border-red-700"
                  : ""
              }
            />
            {errors.name && (
              <p className="text-xs text-red-500 dark:text-red-400">
                {errors.name.message}
              </p>
            )}
          </div>

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
            <Label htmlFor="password" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Password
            </Label>
            <PasswordInput
              id="password"
              autoComplete="new-password"
              placeholder="Min. 8 characters"
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

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <Label htmlFor="confirmPassword" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Confirm password
            </Label>
            <PasswordInput
              id="confirmPassword"
              autoComplete="new-password"
              placeholder="Re-enter your password"
              aria-invalid={!!errors.confirmPassword}
              {...register("confirmPassword")}
              className={
                errors.confirmPassword
                  ? "border-red-400 focus-visible:ring-red-300 dark:border-red-700"
                  : ""
              }
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 dark:text-red-400">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <LoadingButton type="submit" loading={isSubmitting} className="mt-2">
            Create account
          </LoadingButton>
        </form>

        <p className="text-xs text-zinc-400 dark:text-zinc-500 text-center mt-4 leading-relaxed">
          By creating an account you agree to our{" "}
          <a
            href="/terms"
            className="underline underline-offset-4 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
          >
            Terms
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className="underline underline-offset-4 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
          >
            Privacy Policy
          </a>
          .
        </p>
      </AuthCard>

      <AuthFooter
        text="Already have an account?"
        linkText="Sign in"
        href="/sign-in"
      />
    </AuthLayout>
  );
}