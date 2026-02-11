"use client";

import { useState, useEffect } from "react";
import { useAction } from "next-safe-action/hooks";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { upsertHabitAction } from "../actions/upsert-habit";
import {
  upsertHabitSchema,
  type UpsertHabitFormData,
} from "../schemas/upsert-habit-schema";
import type { Habit } from "../types";

const WEEKDAYS = [
  { value: 0, label: "Dom" },
  { value: 1, label: "Seg" },
  { value: 2, label: "Ter" },
  { value: 3, label: "Qua" },
  { value: 4, label: "Qui" },
  { value: 5, label: "Sex" },
  { value: 6, label: "Sáb" },
];

interface UpsertHabitFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  habit?: Habit | null;
}

export function UpsertHabitForm({
  isOpen,
  onOpenChange,
  habit: editHabit,
}: UpsertHabitFormProps) {
  const [formError, setFormError] = useState("");
  const isEdit = !!editHabit?.id;

  const form = useForm<UpsertHabitFormData>({
    resolver: zodResolver(upsertHabitSchema),
    defaultValues: {
      name: "",
      description: "",
      recurrenceType: "daily",
      recurrenceWeekdays: [],
      recurrenceWeeklyCount: undefined,
      preferredTime: "",
    },
    mode: "onBlur",
  });

  const recurrenceType = form.watch("recurrenceType");

  const action = useAction(upsertHabitAction, {
    onSuccess: ({ data }) => {
      if (!data?.success) {
        setFormError(data?.error?.message || "Erro ao salvar");
        return;
      }
      toast.success(isEdit ? "Hábito atualizado com sucesso" : "Hábito criado com sucesso");
      form.reset();
      onOpenChange(false);
    },
    onError: () => {
      setFormError("Erro ao processar a requisição");
    },
  });

  useEffect(() => {
    if (isOpen) {
      setFormError("");
      if (editHabit) {
        form.reset({
          id: editHabit.id,
          name: editHabit.name,
          description: editHabit.description || "",
          recurrenceType: editHabit.recurrenceType,
          recurrenceWeekdays: editHabit.recurrenceWeekdays || [],
          recurrenceWeeklyCount: editHabit.recurrenceWeeklyCount || undefined,
          preferredTime: editHabit.preferredTime || "",
        });
      } else {
        form.reset({
          name: "",
          description: "",
          recurrenceType: "daily",
          recurrenceWeekdays: [],
          recurrenceWeeklyCount: undefined,
          preferredTime: "",
        });
      }
    }
  }, [isOpen, editHabit, form]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Editar Hábito" : "Novo Hábito"}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit((data) => action.execute(data))}
          className="space-y-4"
        >
          {formError && (
            <Alert variant="destructive">
              <AlertDescription>{formError}</AlertDescription>
            </Alert>
          )}

          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="name">Nome</FieldLabel>
                <Input
                  {...field}
                  id="name"
                  placeholder="Ex: Meditar"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.error && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="description">
                  Descrição (opcional)
                </FieldLabel>
                <Textarea
                  {...field}
                  id="description"
                  placeholder="Descreva seu hábito..."
                  rows={3}
                />
                {fieldState.error && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="recurrenceType"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Frequência</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Diário</SelectItem>
                    <SelectItem value="weekly">Dias específicos</SelectItem>
                    <SelectItem value="weekly_count">
                      X vezes por semana
                    </SelectItem>
                  </SelectContent>
                </Select>
                {fieldState.error && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {recurrenceType === "weekly" && (
            <Controller
              name="recurrenceWeekdays"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Dias da semana</FieldLabel>
                  <div className="flex flex-wrap gap-2">
                    {WEEKDAYS.map((day) => {
                      const selected = field.value?.includes(day.value);
                      return (
                        <button
                          key={day.value}
                          type="button"
                          className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
                            selected
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-background text-foreground hover:bg-accent"
                          }`}
                          onClick={() => {
                            const current = field.value || [];
                            const next = selected
                              ? current.filter((d) => d !== day.value)
                              : [...current, day.value];
                            field.onChange(next);
                          }}
                        >
                          {day.label}
                        </button>
                      );
                    })}
                  </div>
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          )}

          {recurrenceType === "weekly_count" && (
            <Controller
              name="recurrenceWeeklyCount"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="recurrenceWeeklyCount">
                    Vezes por semana
                  </FieldLabel>
                  <Input
                    id="recurrenceWeeklyCount"
                    type="number"
                    min={1}
                    max={7}
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(val ? parseInt(val, 10) : undefined);
                    }}
                    placeholder="Ex: 3"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          )}

          <Controller
            name="preferredTime"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="preferredTime">
                  Hora preferida (opcional)
                </FieldLabel>
                <Input
                  {...field}
                  id="preferredTime"
                  type="time"
                />
                {fieldState.error && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={action.status === "executing"}>
              {action.status === "executing"
                ? "Salvando..."
                : isEdit
                  ? "Atualizar"
                  : "Criar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
