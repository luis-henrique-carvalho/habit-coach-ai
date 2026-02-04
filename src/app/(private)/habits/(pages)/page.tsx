"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Edit2, Archive, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { HabitDetail } from "@/lib/types/habit";
import { Skeleton } from "@/components/ui/skeleton";
import { archiveHabitAction } from "../actions/archive-habit";
import { restoreHabitAction } from "../actions/restore-habit";
import { getHabitDetailsAction } from "../actions/get-habit-details";
import { StreakBadge } from "../components/streak-badge";
import { CompletionRateCard } from "../components/completion-rate-card";
import { HabitHeatmap } from "../components/habit-heatmap";
import { EditHabitModal } from "../components/edit-habit-modal";

export default function HabitDetailPage() {
  const params = useParams();
  const router = useRouter();
  const habitId = params.id as string;

  const [habit, setHabit] = useState<HabitDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [isArchiving, setIsArchiving] = useState(false);

  const loadHabit = async () => {
    setIsLoading(true);
    try {
      const result = await getHabitDetailsAction({ habitId });

      if (result.data?.success) {
        setHabit(result.data.data);
      } else {
        console.error("Failed to load habit:", result.data?.error);
      }
    } catch (error) {
      console.error("Error loading habit:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadHabit();
  }, [habitId]);

  const handleArchive = async () => {
    if (!habit) return;

    setIsArchiving(true);
    try {
      const result = await archiveHabitAction({ habitId: habit.id });

      if (result.data?.success) {
        router.push("/habits");
      } else {
        console.error("Failed to archive:", result.data?.error);
      }
    } catch (error) {
      console.error("Error archiving:", error);
    } finally {
      setIsArchiving(false);
    }
  };

  const handleRestore = async () => {
    if (!habit) return;

    setIsArchiving(true);
    try {
      const result = await restoreHabitAction({ habitId: habit.id });

      if (result.data?.success) {
        setHabit({ ...habit, isActive: true });
      } else {
        console.error("Failed to restore:", result.data?.error);
      }
    } catch (error) {
      console.error("Error restoring:", error);
    } finally {
      setIsArchiving(false);
    }
  };

  return (
    <main className="container mx-auto p-4 max-w-3xl">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to habits
      </button>

      {isLoading ? (
        <div className="space-y-6">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      ) : !habit ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Habit not found</p>
          <Button onClick={() => router.push("/habits")}>Back to habits</Button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {habit.name}
              </h1>
              {habit.description && (
                <p className="text-gray-600">{habit.description}</p>
              )}
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditModalOpen(true)}
                disabled={habit.isActive === false}
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Edit
              </Button>
              {habit.isActive ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleArchive}
                  disabled={isArchiving}
                >
                  <Archive className="w-4 h-4 mr-2" />
                  Archive
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRestore}
                  disabled={isArchiving}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Restore
                </Button>
              )}
            </div>
          </div>

          {/* Archived notice */}
          {habit.isActive === false && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
              This habit is archived. Restore it to resume tracking.
            </div>
          )}

          {/* Streak */}
          <StreakBadge current={habit.currentStreak} record={habit.longestStreak} />

          {/* Completion rates */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Completion Rate
            </h2>
            <CompletionRateCard
              rate30Days={habit.completionRate30Days}
              rate60Days={habit.completionRate60Days}
              rate90Days={habit.completionRate90Days}
            />
          </div>

          {/* Heatmap */}
          <HabitHeatmap completions={habit.last90DaysCompletions} />

          {/* Edit modal */}
          {habit.isActive !== false && (
            <EditHabitModal
              habit={habit}
              open={editModalOpen}
              onOpenChange={setEditModalOpen}
              onSuccess={loadHabit}
            />
          )}
        </div>
      )}
    </main>
  );
}
