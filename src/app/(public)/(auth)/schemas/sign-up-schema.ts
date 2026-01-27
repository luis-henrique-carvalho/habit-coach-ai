import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(2, "Nome deve ter pelo menos 2 caracteres")
      .max(100, "Nome deve ter no máximo 100 caracteres"),
    email: z
      .string()
      .email("Email inválido")
      .min(1, "Email é obrigatório"),
    password: z
      .string()
      .min(8, "Senha deve ter pelo menos 8 caracteres")
      .regex(/[A-Z]/, "Senha deve conter pelo menos 1 letra maiúscula")
      .regex(/[0-9]/, "Senha deve conter pelo menos 1 número"),
    confirmPassword: z
      .string()
      .min(1, "Confirme sua senha"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
