"use client";

import { useState } from "react";
import Link from "next/link";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { Flame, MoreVertical, Pencil, Archive, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { toggleHabitCompletionAction } from "../actions/toggle-habit-completion";
import { archiveHabitAction } from "../actions/archive-habit";
import { UpsertHabitForm } from "./upsert-habit-form";
import type { HabitWithStatus } from "../types";
import { format } from "date-fns";

const WEEKDAY_LABELS: Record<number, string> = {
  0: "Dom",
  1: "Seg",
  2: "Ter",
  3: "Qua",
  4: "Qui",
  5: "Sex",
  6: "Sáb",
};

function getRecurrenceLabel(habit: HabitWithStatus): string {
  if (habit.recurrenceType === "daily") return "Diário";
  if (habit.recurrenceType === "weekly" && habit.recurrenceWeekdays) {
    return habit.recurrenceWeekdays
      .sort((a, b) => a - b)
      .map((d) => WEEKDAY_LABELS[d])
      .join(", ");
  }
  if (habit.recurrenceType === "weekly_count" && habit.recurrenceWeeklyCount) {
    return `${habit.recurrenceWeeklyCount}x por semana`;
  }
  return "";
}

interface HabitCardProps {
  habit: HabitWithStatus;
}

export function HabitCard({ habit }: HabitCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [optimisticCompleted, setOptimisticCompleted] = useState(
    habit.completedToday
  );

  const toggleAction = useAction(toggleHabitCompletionAction, {
    onSuccess: ({ data }) => {
      if (!data?.success) {
        // Revert optimistic update
        setOptimisticCompleted(!optimisticCompleted);
        toast.error(data?.error?.message || "Erro ao atualizar");
      }
    },
    onError: () => {
      setOptimisticCompleted(!optimisticCompleted);
      toast.error("Erro ao atualizar");
    },
  });

  const archiveAction = useAction(archiveHabitAction, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        toast.success("Hábito arquivado com sucesso");
        setIsArchiveOpen(false);
      } else {
        toast.error(data?.error?.message || "Erro ao arquivar");
      }
    },
    onError: () => {
      toast.error("Erro ao arquivar");
    },
  });

  const handleToggle = () => {
    setOptimisticCompleted(!optimisticCompleted);
    toggleAction.execute({
      habitId: habit.id,
      date: format(new Date(), "yyyy-MM-dd"),
    });
  };

  return (
    <>
      <Card className="group relative transition-colors hover:border-border">
        <CardContent className="flex items-center gap-4 p-4">
          {/* Completion toggle */}
          <button
            type="button"
            onClick={handleToggle}
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
              optimisticCompleted
                ? "border-emerald-500 bg-emerald-500 text-white"
                : "border-border hover:border-primary"
            }`}
            aria-label={
              optimisticCompleted ? "Desmarcar hábito" : "Marcar hábito como concluído"
            }
          >
            {optimisticCompleted && <Check className="h-4 w-4" />}
          </button>

          {/* Habit info */}
          <Link
            href={`/habits/${habit.id}`}
            className="flex min-w-0 flex-1 flex-col gap-1"
          >
            <span
              className={`text-sm font-medium ${
                optimisticCompleted
                  ? "text-muted-foreground line-through"
                  : "text-foreground"
              }`}
            >
              {habit.name}
            </span>
            <span className="text-xs text-muted-foreground">
              {getRecurrenceLabel(habit)}
            </span>
          </Link>

          {/* Streak */}
          {habit.currentStreak > 0 && (
            <Badge
              variant="outline"
              className="shrink-0 gap-1 border-orange-200 bg-orange-50 text-orange-700"
            >
              <Flame className="h-3 w-3" />
              {habit.currentStreak}
            </Badge>
          )}

          {/* Actions menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0 opacity-0 group-hover:opacity-100"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
                <Pencil className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setIsArchiveOpen(true)}
                className="text-destructive"
              >
                <Archive className="mr-2 h-4 w-4" />
                Arquivar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>

      {/* Edit dialog */}
      <UpsertHabitForm
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        habit={habit}
      />

      {/* Archive confirmation */}
      <Dialog open={isArchiveOpen} onOpenChange={setIsArchiveOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Arquivar hábito</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja arquivar &ldquo;{habit.name}&rdquo;? O
              histórico será preservado.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsArchiveOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => archiveAction.execute({ id: habit.id })}
              disabled={archiveAction.status === "executing"}
            >
              {archiveAction.status === "executing"
                ? "Arquivando..."
                : "Arquivar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
