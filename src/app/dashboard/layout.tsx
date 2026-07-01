import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import  DashboardShell  from "@/components/dashboard/dashboard-shell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Protect all dashboard routes
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <DashboardShell
      user={{
        name: session.user.name ?? "User",
        email: session.user.email,
      }}
    >
      {children}
    </DashboardShell>
  );
}