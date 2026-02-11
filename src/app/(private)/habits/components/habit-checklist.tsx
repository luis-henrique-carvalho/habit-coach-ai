"use client";

import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toggleHabitCompletionAction } from "../actions/toggle-habit-completion";
import type { HabitWithStatus } from "../types";
import { format } from "date-fns";

interface HabitChecklistProps {
  habits: HabitWithStatus[];
  weeklyCompletions?: Map<string, number>;
}

export function HabitChecklist({ habits, weeklyCompletions }: HabitChecklistProps) {
  const dueToday = habits.filter((h) => h.isDueToday);

  if (dueToday.length === 0) return null;

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-foreground">Hoje</h2>
      <div className="space-y-2">
        {dueToday.map((habit) => (
          <ChecklistItem
            key={habit.id}
            habit={habit}
            weeklyCount={weeklyCompletions?.get(habit.id)}
          />
        ))}
      </div>
    </div>
  );
}

function ChecklistItem({
  habit,
  weeklyCount,
}: {
  habit: HabitWithStatus;
  weeklyCount?: number;
}) {
  const [optimisticCompleted, setOptimisticCompleted] = useState(
    habit.completedToday
  );

  const toggleAction = useAction(toggleHabitCompletionAction, {
    onSuccess: ({ data }) => {
      if (!data?.success) {
        setOptimisticCompleted(!optimisticCompleted);
        toast.error(data?.error?.message || "Erro ao atualizar");
      }
    },
    onError: () => {
      setOptimisticCompleted(!optimisticCompleted);
      toast.error("Erro ao atualizar");
    },
  });

  const handleToggle = () => {
    setOptimisticCompleted(!optimisticCompleted);
    toggleAction.execute({
      habitId: habit.id,
      date: format(new Date(), "yyyy-MM-dd"),
    });
  };

  const weeklyTargetMet =
    habit.recurrenceType === "weekly_count" &&
    habit.recurrenceWeeklyCount &&
    weeklyCount !== undefined &&
    weeklyCount >= habit.recurrenceWeeklyCount;

  return (
    <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-card px-4 py-3">
      <button
        type="button"
        onClick={handleToggle}
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
          optimisticCompleted
            ? "border-emerald-500 bg-emerald-500 text-white"
            : "border-border hover:border-primary"
        }`}
        aria-label={
          optimisticCompleted ? "Desmarcar" : "Marcar como concluído"
        }
      >
        {optimisticCompleted && <Check className="h-3.5 w-3.5" />}
      </button>
      <span
        className={`flex-1 text-sm ${
          optimisticCompleted
            ? "text-muted-foreground line-through"
            : "text-foreground"
        }`}
      >
        {habit.name}
      </span>
      {weeklyTargetMet && (
        <Badge variant="outline" className="text-xs text-emerald-600 border-emerald-200 bg-emerald-50">
          meta semanal atingida
        </Badge>
      )}
    </div>
  );
}
