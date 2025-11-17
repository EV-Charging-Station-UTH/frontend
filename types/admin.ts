import { z } from "zod";

export const StationSchema = z.object({
  stationId: z.number(),
  name: z.string(),
  location: z.string().optional(),
});
export type Station = z.infer<typeof StationSchema>;

export const CreateStationSchema = z.object({
  name: z.string().min(2),
  location: z.string().optional(),
});
export type CreateStationPayload = z.infer<typeof CreateStationSchema>;

export const UserSchema = z.object({ userId: z.number(), name: z.string() });
export type User = z.infer<typeof UserSchema>;

export const PlanSchema = z.object({
  planId: z.number(),
  name: z.string(),
  price: z.number().optional(),
});
export type Plan = z.infer<typeof PlanSchema>;

export type Report = { [k: string]: any };
