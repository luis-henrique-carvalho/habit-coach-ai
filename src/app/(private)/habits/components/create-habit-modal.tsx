"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createHabitSchema, CreateHabitInput } from "../schemas/habit-schema";
import { FrequencySelector } from "./frequency-selector";
import { createHabitAction } from "../actions/create-habit";
import { Textarea } from "@/components/ui/textarea";

interface CreateHabitModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function CreateHabitModal({
  open,
  onOpenChange,
  onSuccess,
}: CreateHabitModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<CreateHabitInput>({
    resolver: zodResolver(createHabitSchema),
    defaultValues: {
      name: "",
      description: "",
      recurrenceType: "daily",
      recurrenceInterval: 1,
      recurrenceWeekdays: undefined,
      recurrenceWeeklyCount: 1,
      preferredTime: undefined,
    },
  });

  const handleSubmit = async (data: CreateHabitInput) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const result = await createHabitAction(data);

      if (result.data?.success) {
        form.reset();
        onOpenChange(false);
        onSuccess?.();
      } else {
        setErrorMessage(
          result.data?.error?.message || "Failed to create habit"
        );
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "An error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Habit</DialogTitle>
          <DialogDescription>
            Build a new habit and start tracking your progress
          </DialogDescription>
        </DialogHeader>

        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Error message */}
            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                {errorMessage}
              </div>
            )}

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Habit Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Morning Exercise"
                {...form.register("name")}
              />
              {form.formState.errors.name && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="e.g., 30 minutes of cardio or strength training"
                rows={3}
                {...form.register("description")}
              />
              {form.formState.errors.description && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.description.message}
                </p>
              )}
            </div>

            {/* Frequency Selector */}
            <FrequencySelector />

            {/* Preferred Time */}
            <div className="space-y-2">
              <Label htmlFor="preferredTime">Preferred Time (Optional)</Label>
              <Input
                id="preferredTime"
                type="time"
                {...form.register("preferredTime")}
              />
              {form.formState.errors.preferredTime && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.preferredTime.message}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-2 justify-end pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Habit"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
