import { z } from "zod"

export const TrainerFormSchema = z.object({
  phone: z.string().optional().or(z.literal("")),
  birth_date: z.string().optional().or(z.literal("")),
  specialty: z.string().optional().or(z.literal("")),
  bio: z.string().optional().or(z.literal("")),
  certifications: z.string().optional().or(z.literal("")),
  years_experience: z.coerce.number().min(0, { message: "Gli anni di esperienza devono essere almeno 0" }).default(0),
})
