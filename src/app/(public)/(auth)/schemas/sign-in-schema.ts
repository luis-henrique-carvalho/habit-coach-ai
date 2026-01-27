import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .email("Email inválido")
    .min(1, "Email é obrigatório"),
  password: z
    .string()
    .min(1, "Senha é obrigatória"),
});

export type SignInFormData = z.infer<typeof signInSchema>;
