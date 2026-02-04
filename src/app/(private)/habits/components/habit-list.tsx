"use client";

import { HabitWithStats } from "@/lib/types/habit";
import { HabitCard } from "./habit-card";
import { Skeleton } from "@/components/ui/skeleton";

interface HabitListProps {
  habits: HabitWithStats[];
  isLoading?: boolean;
  onRefresh?: () => void;
  completedCount?: number;
}

export function HabitList({
  habits,
  isLoading = false,
  onRefresh,
  completedCount = 0,
}: HabitListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-16 rounded-lg" />
        ))}
      </div>
    );
  }

  if (habits.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600 mb-2">
          🎉 Rest day! No habits scheduled for today.
        </p>
        <p className="text-sm text-gray-500">
          Come back tomorrow to continue your streaks.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Progress indicator */}
      <div className="text-sm text-gray-600">
        {completedCount} of {habits.length} habits completed
      </div>

      {/* Habit cards */}
      <div className="space-y-3">
        {habits.map((habit) => (
          <HabitCard key={habit.id} habit={habit} onComplete={onRefresh} />
        ))}
      </div>
    </div>
  );
}
