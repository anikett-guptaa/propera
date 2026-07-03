import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export default async function AuthRedirectPage() {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  const organization = await prisma.organization.findFirst({
    where: {
      ownerId: session.user.id,
    },
  });

  // New user
  if (!organization) {
    redirect("/onboarding");
  }

  switch (organization.onboardingStep) {
    case 1:
      redirect("/onboarding/property");

    case 2:
      redirect("/onboarding/rooms");

    default:
      redirect("/dashboard");
  }
}