import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  const organization = await prisma.organization.findFirst({
    where: {
      ownerId: session.user.id,
    },
  });

  if (organization?.onboardingStep === 3) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}