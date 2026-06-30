import { z } from "zod";

export const propertySchema = z.object({
  name: z
    .string()
    .min(1, "Property name is required")
    .min(2, "Must be at least 2 characters")
    .max(80, "Must be under 80 characters"),
  type: z.enum(
    ["hostel", "pg", "apartment", "residential", "commercial", "villa"],
    { error: "Please select a property type" }
  ),
  addressLine: z
    .string()
    .min(1, "Address is required")
    .max(120, "Must be under 120 characters"),
  city: z
    .string()
    .min(1, "City is required")
    .max(60, "Must be under 60 characters"),
  state: z
    .string()
    .min(1, "State is required")
    .max(60, "Must be under 60 characters"),
  pincode: z
    .string()
    .min(1, "Pincode is required")
    .regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
  country: z.string().min(1, "Country is required").default("India"),
  floors: z.coerce
    .number()
    .min(1, "At least 1 floor")
    .max(50, "Maximum 50 floors"),
  description: z.string().max(300, "Must be under 300 characters").optional(),
});

export const roomsFormSchema = z
  .object({
    mode: z.enum(["auto", "manual"]),
    floors: z.coerce
      .number()
      .min(1, "At least 1 floor")
      .max(50, "Maximum 50 floors")
      .optional(),
    roomsPerFloor: z.coerce
      .number()
      .min(1, "At least 1 room per floor")
      .max(100, "Maximum 100 rooms per floor")
      .optional(),
    startNumber: z.coerce
      .number()
      .min(1, "Must start from at least 1")
      .max(9000, "Start number too large")
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.mode === "auto") {
      if (data.floors === undefined || isNaN(data.floors)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "At least 1 floor",
          path: ["floors"],
        });
      }
      if (data.roomsPerFloor === undefined || isNaN(data.roomsPerFloor)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "At least 1 room per floor",
          path: ["roomsPerFloor"],
        });
      }
      if (data.startNumber === undefined || isNaN(data.startNumber)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Must start from at least 1",
          path: ["startNumber"],
        });
      }
    }
  });

export type PropertyInput = z.infer<typeof propertySchema>;
export type RoomsFormInput = z.infer<typeof roomsFormSchema>;