"use client";

import { useState } from "react";
import { Check, Flame } from "lucide-react";
import { HabitWithStats } from "@/lib/types/habit";
import Link from "next/link";
import { markHabitCompleteAction } from "../actions/mark-habit-complete";

interface HabitCardProps {
  habit: HabitWithStats;
  onComplete?: () => void;
}

export function HabitCard({ habit, onComplete }: HabitCardProps) {
  const [isCompleted, setIsCompleted] = useState(habit.completedToday);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleComplete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Optimistic update
    const wasCompleted = isCompleted;
    setIsCompleted(!wasCompleted);
    setIsLoading(true);

    try {
      const result = await markHabitCompleteAction({
        habitId: habit.id,
      });

      if (!result.data?.success) {
        // Revert on error
        setIsCompleted(wasCompleted);
        console.error("Failed to mark habit complete:", result.data?.error);
      } else {
        onComplete?.();
      }
    } catch (error) {
      // Revert on error
      setIsCompleted(wasCompleted);
      console.error("Error marking habit complete:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Link href={`/habits/${habit.id}`}>
      <div className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
        {/* Checkbox */}
        <button
          onClick={handleToggleComplete}
          disabled={isLoading}
          className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
            isCompleted
              ? "bg-green-500 border-green-500"
              : "border-gray-300 hover:border-green-400"
          } ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        >
          {isCompleted && <Check className="w-4 h-4 text-white" />}
        </button>

        {/* Habit Info */}
        <div className="flex-1 min-w-0">
          <h3
            className={`font-medium truncate ${
              isCompleted ? "text-gray-500" : "text-gray-900"
            }`}
          >
            {habit.name}
          </h3>
          {habit.description && (
            <p className="text-sm text-gray-500 truncate">
              {habit.description}
            </p>
          )}
        </div>

        {/* Streak Badge */}
        {habit.currentStreak > 0 && (
          <div className="flex-shrink-0 flex items-center gap-1 px-3 py-1 bg-orange-50 rounded-full">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-semibold text-orange-600">
              {habit.currentStreak}
            </span>
          </div>
        )}

        {/* Reminder Time */}
        {habit.preferredTime && (
          <div className="flex-shrink-0 text-xs text-gray-500">
            {habit.preferredTime}
          </div>
        )}
      </div>
    </Link>
  );
}
