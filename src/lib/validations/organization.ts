import { z } from "zod";

export const organizationSchema = z.object({
  name: z
    .string()
    .min(1, "Organization name is required")
    .min(2, "Must be at least 2 characters")
    .max(60, "Must be under 60 characters"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .min(2, "Must be at least 2 characters")
    .max(40, "Must be under 40 characters")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Only lowercase letters, numbers, and hyphens allowed"
    ),
});

export type OrganizationInput = z.infer<typeof organizationSchema>;