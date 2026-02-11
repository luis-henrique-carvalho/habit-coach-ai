import { z } from "zod";

export const upsertHabitSchema = z
  .object({
    id: z.string().optional(),
    name: z
      .string()
      .min(1, "Nome é obrigatório")
      .max(100, "Nome deve ter no máximo 100 caracteres"),
    description: z
      .string()
      .max(500, "Descrição deve ter no máximo 500 caracteres")
      .optional()
      .or(z.literal("")),
    recurrenceType: z.enum(["daily", "weekly", "weekly_count"], {
      error: "Tipo de recorrência inválido",
    }),
    recurrenceWeekdays: z
      .array(z.number().int().min(0).max(6))
      .optional(),
    recurrenceWeeklyCount: z
      .number()
      .int()
      .min(1, "Informe um valor entre 1 e 7")
      .max(7, "Informe um valor entre 1 e 7")
      .optional(),
    preferredTime: z
      .string()
      .regex(/^\d{2}:\d{2}$/, "Formato de hora inválido (HH:mm)")
      .optional()
      .or(z.literal("")),
  })
  .refine(
    (data) => {
      if (data.recurrenceType === "weekly") {
        return data.recurrenceWeekdays && data.recurrenceWeekdays.length > 0;
      }
      return true;
    },
    {
      message: "Selecione pelo menos um dia da semana",
      path: ["recurrenceWeekdays"],
    }
  )
  .refine(
    (data) => {
      if (data.recurrenceType === "weekly_count") {
        return (
          data.recurrenceWeeklyCount !== undefined &&
          data.recurrenceWeeklyCount !== null
        );
      }
      return true;
    },
    {
      message: "Informe um valor entre 1 e 7",
      path: ["recurrenceWeeklyCount"],
    }
  );

export type UpsertHabitFormData = z.infer<typeof upsertHabitSchema>;
