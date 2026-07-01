import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // Redirect authenticated users away from auth pages
  if (session) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}