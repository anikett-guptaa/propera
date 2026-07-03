"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

interface CreatePropertyInput {
  name: string;
  type: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  floors: number;
  description?: string;
}

export async function createProperty(data: CreatePropertyInput) {
  const session = await getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const organization = await prisma.organization.findFirst({
    where: {
      ownerId: session.user.id,
    },
  });

  if (!organization) {
    throw new Error("Organization not found.");
  }

  const property = await prisma.property.create({
    data: {
      name: data.name,
      type: data.type,
      addressLine: data.addressLine,
      city: data.city,
      state: data.state,
      pincode: data.pincode,
      country: data.country,
      floors: data.floors,
      description: data.description,
      organizationId: organization.id,
    },
  });

  await prisma.organization.update({
    where: {
      id: organization.id,
    },
    data: {
      onboardingStep: 2,
    },
  });

  return property;
}