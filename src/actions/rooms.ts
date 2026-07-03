"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

interface CreateRoomsInput {
  mode: "auto" | "manual";
  floors?: number;
  roomsPerFloor?: number;
}

export async function createRooms(data: CreateRoomsInput) {
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

  const property = await prisma.property.findFirst({
    where: {
      organizationId: organization.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!property) {
    throw new Error("Property not found.");
  }

  if (data.mode === "auto") {
    const rooms = [];

    for (let floor = 1; floor <= data.floors!; floor++) {
      for (let room = 1; room <= data.roomsPerFloor!; room++) {
        rooms.push({
          propertyId: property.id,
          floor,
          roomNumber: String(floor * 100 + room),
        });
      }
    }

    await prisma.room.createMany({
      data: rooms,
    });
  }

  await prisma.organization.update({
    where: {
      id: organization.id,
    },
    data: {
      onboardingStep: 3,
    },
  });

  return true;
}