"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

interface CreateOrganizationInput {
  name: string;
  slug: string;
}

export async function createOrganization(
  data: CreateOrganizationInput
) {
  const session = await getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  // Check if slug already exists
  const existing = await prisma.organization.findUnique({
    where: {
      slug: data.slug,
    },
  });

  if (existing) {
    throw new Error("This organization URL is already taken.");
  }

  return await prisma.organization.create({
    data: {
      name: data.name,
      slug: data.slug,
      type: "hostel",
      ownerId: session.user.id,
    },
  });
}