import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  acceptPrivacyPolicy: z.boolean().refine((val) => val === true, {
    message: "კონფიდენციალურობის პოლიტიკაზე თანხმობა აუცილებელია",
  }),
  acceptTermsConditions: z.boolean().refine((val) => val === true, {
    message: "წესებსა და პირობებზე თანხმობა აუცილებელია",
  }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginSchema = z.infer<typeof loginSchema>;
