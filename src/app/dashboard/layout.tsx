import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import  DashboardShell  from "@/components/dashboard/dashboard-shell";
import { prisma } from "@/lib/prisma";

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

  const organization = await prisma.organization.findFirst({
  where: {
    ownerId: session.user.id,
  },
});

if (!organization) {
  redirect("/onboarding");
}

switch (organization.onboardingStep) {
  case 1:
    redirect("/onboarding/property");

  case 2:
    redirect("/onboarding/rooms");
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