"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Pencil, Trash2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getHabitDetailsAction } from "../../actions/get-habit-details";
import { markHabitCompleteAction } from "../../actions/mark-habit-complete";
import { archiveHabitAction } from "../../actions/archive-habit";
import { EditHabitModal } from "../../components/edit-habit-modal";
import { StreakBadge } from "../../components/streak-badge";
import { HabitHeatmap } from "../../components/habit-heatmap";
import { CompletionRateCard } from "../../components/completion-rate-card";
import { HabitDetail } from "@/lib/types/habit";
import { formatDate } from "@/lib/utils/streak-calculator";

export default function HabitDetailPage() {
  const router = useRouter();
  const params = useParams();
  const habitId = params.id as string;

  const [habit, setHabit] = useState<HabitDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isMarkingComplete, setIsMarkingComplete] = useState(false);
  const [isArchiving, setIsArchiving] = useState(false);
  const [showArchiveConfirm, setShowArchiveConfirm] = useState(false);

  // Fetch habit details on mount
  const loadHabitDetails = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await getHabitDetailsAction({ habitId });

      if (result.data?.success) {
        setHabit(result.data.data);
      } else {
        setError(result.data?.error?.message || "Failed to load habit details");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred while loading habit details"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadHabitDetails();
  }, [habitId]);

  const handleMarkComplete = async () => {
    if (!habit) return;

    setIsMarkingComplete(true);
    try {
      const result = await markHabitCompleteAction({
        habitId: habit.id,
        completedDate: formatDate(new Date()),
      });

      if (result.data?.success) {
        // Refresh habit details to update streaks and completion status
        await loadHabitDetails();
      } else {
        setError(result.data?.error?.message || "Failed to mark habit complete");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred while marking habit complete"
      );
    } finally {
      setIsMarkingComplete(false);
    }
  };

  const handleArchive = async () => {
    if (!habit) return;

    setIsArchiving(true);
    try {
      const result = await archiveHabitAction({ habitId: habit.id });

      if (result.data?.success) {
        // Navigate back to habits list after archive
        router.push("/habits");
      } else {
        setError(result.data?.error?.message || "Failed to archive habit");
        setShowArchiveConfirm(false);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred while archiving habit"
      );
      setShowArchiveConfirm(false);
    } finally {
      setIsArchiving(false);
    }
  };

  if (isLoading) {
    return (
      <main className="container mx-auto p-4 max-w-4xl">
        <div className="animate-pulse space-y-8">
          <div className="h-10 bg-gray-200 rounded w-32" />
          <div className="h-64 bg-gray-200 rounded" />
          <div className="h-40 bg-gray-200 rounded" />
        </div>
      </main>
    );
  }

  if (error || !habit) {
    return (
      <main className="container mx-auto p-4 max-w-4xl">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/habits")}
          className="mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Habits
        </Button>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-700 font-medium mb-4">
            {error || "Habit not found"}
          </p>
          <Button onClick={() => router.push("/habits")}>Return to Habits</Button>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-4 max-w-4xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/habits")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {habit.name}
          </h1>
          {habit.description && (
            <p className="text-lg text-gray-600">{habit.description}</p>
          )}
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Quick actions */}
      <div className="flex flex-wrap gap-3 mb-8">
        {!habit.completedToday && (
          <Button
            onClick={handleMarkComplete}
            disabled={isMarkingComplete}
            className="bg-green-600 hover:bg-green-700"
          >
            <Check className="w-4 h-4 mr-2" />
            {isMarkingComplete ? "Marking..." : "Mark Complete Today"}
          </Button>
        )}
        {habit.completedToday && (
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
            <Check className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-700">Completed today</span>
          </div>
        )}

        <Button
          variant="outline"
          onClick={() => setIsEditModalOpen(true)}
        >
          <Pencil className="w-4 h-4 mr-2" />
          Edit
        </Button>

        <Button
          variant="outline"
          className="text-red-600 hover:bg-red-50"
          onClick={() => setShowArchiveConfirm(true)}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Archive
        </Button>
      </div>

      {/* Archive confirmation dialog */}
      {showArchiveConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Archive Habit?
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              This habit will be archived and removed from your daily checklist. Your historical data will be preserved.
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowArchiveConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700"
                onClick={handleArchive}
                disabled={isArchiving}
              >
                {isArchiving ? "Archiving..." : "Archive"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Streak section */}
      <div className="mb-8">
        <StreakBadge
          current={habit.currentStreak}
          record={habit.longestStreak}
        />
      </div>

      {/* Analytics section */}
      <div className="space-y-8">
        {/* Completion rates */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Completion Rates
          </h2>
          <CompletionRateCard
            rate30Days={habit.completionRate30Days}
            rate60Days={habit.completionRate60Days}
            rate90Days={habit.completionRate90Days}
          />
        </div>

        {/* Heatmap */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            90-Day Activity
          </h2>
          <HabitHeatmap completions={habit.last90DaysCompletions} />
        </div>
      </div>

      {/* Edit modal */}
      {habit && (
        <EditHabitModal
          habit={habit}
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          onSuccess={loadHabitDetails}
        />
      )}
    </main>
  );
}
