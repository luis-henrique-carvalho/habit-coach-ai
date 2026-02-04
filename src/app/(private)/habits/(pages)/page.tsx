"use client";

import { useEffect, useState } from "react";
import { getDailyChecklistAction } from "../actions/get-daily-checklist";
import { HabitList } from "../components/habit-list";
import { CreateHabitButton } from "../components/create-habit-button";
import { CreateHabitModal } from "../components/create-habit-modal";
import { HabitWithStats } from "@/lib/types/habit";
import { formatDate } from "@/lib/utils/streak-calculator";

export default function HabitPage() {
  const [habits, setHabits] = useState<HabitWithStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);

  const loadChecklist = async () => {
    setIsLoading(true);
    
    try {
      const result = await getDailyChecklistAction({});

      if (result.data?.success) {
        setHabits(result.data.data.habits);
        setCompletedCount(result.data.data.completedCount);
      } else {
        console.error("Failed to load checklist:", result.data?.error);
      }
    } catch (error) {
      console.error("Error loading checklist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadChecklist();
  }, []);

  const today = formatDate(new Date());

  return (
    <main className="container mx-auto p-4 max-w-2xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Today&apos;s Habits</h1>
        <p className="text-gray-600">{today}</p>
      </div>

      {/* Create button */}
      <div className="mb-6">
        <CreateHabitButton
          onClick={() => setCreateModalOpen(true)}
          isDisabled={false}
        />
      </div>

      {/* Habit list */}
      <HabitList
        habits={habits}
        isLoading={isLoading}
        onRefresh={loadChecklist}
        completedCount={completedCount}
      />

      {/* Create modal */}
      <CreateHabitModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onSuccess={loadChecklist}
      />
    </main>
  );
}
