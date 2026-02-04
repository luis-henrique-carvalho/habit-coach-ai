"use client";

import { useFormContext, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CreateHabitInput } from "@/lib/types/habit";

const WEEKDAY_LABELS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function FrequencySelector() {
  const { control, watch } = useFormContext<CreateHabitInput>();

  const recurrenceType = watch("recurrenceType");

  return (
    <div className="space-y-4">
      {/* Frequency Type Select */}
      <div className="space-y-2">
        <Label htmlFor="recurrenceType">Frequency</Label>
        <Controller
          name="recurrenceType"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="recurrenceType">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Specific Days</SelectItem>
                <SelectItem value="weekly_count">
                  X Times Per Week
                </SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* Dynamic frequency inputs */}
      {recurrenceType === "weekly" && (
        <div className="space-y-3">
          <Label>Select Days</Label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {WEEKDAY_LABELS.map((day, index) => (
              <DayCheckbox key={index} day={day} dayIndex={index} />
            ))}
          </div>
        </div>
      )}

      {recurrenceType === "weekly_count" && (
        <div className="space-y-2">
          <Label htmlFor="recurrenceWeeklyCount">Times Per Week</Label>
          <Controller
            name="recurrenceWeeklyCount"
            control={control}
            render={({ field }) => (
              <Input
                id="recurrenceWeeklyCount"
                type="number"
                min={1}
                max={7}
                {...field}
                value={field.value || ""}
                onChange={(e) =>
                  field.onChange(e.target.value ? parseInt(e.target.value) : null)
                }
              />
            )}
          />
          <p className="text-xs text-gray-500">
            You can complete on any days you choose
          </p>
        </div>
      )}
    </div>
  );
}

function DayCheckbox({
  day,
  dayIndex,
}: {
  day: string;
  dayIndex: number;
}) {
  const { control } = useFormContext<CreateHabitInput>();

  return (
    <Controller
      name="recurrenceWeekdays"
      control={control}
      render={({ field }) => (
        <label className="flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-gray-50">
          <input
            type="checkbox"
            checked={field.value?.includes(dayIndex) ?? false}
            onChange={(e) => {
              const current = field.value || [];
              if (e.target.checked) {
                field.onChange([...current, dayIndex].sort());
              } else {
                field.onChange(current.filter((d) => d !== dayIndex));
              }
            }}
            className="w-4 h-4 rounded border-gray-300"
          />
          <span className="text-sm font-medium">{day.slice(0, 3)}</span>
        </label>
      )}
    />
  );
}
