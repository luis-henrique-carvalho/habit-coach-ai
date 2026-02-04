"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HabitExecution } from "@/lib/types/habit";
import { formatDate } from "@/lib/utils/streak-calculator";

interface HabitHeatmapProps {
  completions: HabitExecution[];
}

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function HabitHeatmap({ completions }: HabitHeatmapProps) {
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 89); // 90 days back
    return date;
  });

  const completedDates = new Set(completions.map((c) => c.completedDate));

  // Generate 90 days of cells
  const cells = [];
  const currentDate = new Date(startDate);

  for (let i = 0; i < 90; i++) {
    const dateStr = formatDate(currentDate);
    const isCompleted = completedDates.has(dateStr);
    cells.push({
      date: dateStr,
      dayOfWeek: currentDate.getDay(),
      isCompleted,
      dateObj: new Date(currentDate),
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Group into weeks
  type Cell = typeof cells[number];
  const weeks: Cell[][] = [];
  let currentWeek: Cell[] = [];

  for (const cell of cells) {
    if (cell.dayOfWeek === 0 && currentWeek.length > 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(cell);
  }
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  const handlePrevMonth = () => {
    const newDate = new Date(startDate);
    newDate.setDate(newDate.getDate() - 30);
    setStartDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(startDate);
    newDate.setDate(newDate.getDate() + 30);
    setStartDate(newDate);
  };

  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 89);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Activity</h3>
          <p className="text-sm text-gray-600 mt-1">
            {MONTH_LABELS[startDate.getMonth()]} {startDate.getDate()} -{" "}
            {MONTH_LABELS[endDate.getMonth()]} {endDate.getDate()}
          </p>
        </div>
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevMonth}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextMonth}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Heatmap grid */}
      <div className="overflow-x-auto">
        <div className="inline-block">
          {/* Weekday labels */}
          <div className="flex gap-1 mb-2">
            <div className="w-12" />
            {WEEKDAY_LABELS.map((label) => (
              <div
                key={label}
                className="w-8 h-8 flex items-center justify-center text-xs font-medium text-gray-600"
              >
                {label}
              </div>
            ))}
          </div>

          {/* Weeks */}
          <div className="space-y-1">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex gap-1">
                {/* Month label for first week of month */}
                {weekIndex === 0 || weeks[weekIndex - 1][0].dateObj.getDate() > 21 ? (
                  <div className="w-12 flex items-center text-xs font-medium text-gray-600">
                    {weekIndex === 0
                      ? MONTH_LABELS[week[0].dateObj.getMonth()].slice(0, 3)
                      : ""}
                  </div>
                ) : (
                  <div className="w-12" />
                )}

                {/* Days */}
                {week.map((cell) => (
                  <div
                    key={cell.date}
                    className={`w-8 h-8 rounded text-xs font-medium flex items-center justify-center transition-colors cursor-default ${
                      cell.isCompleted
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 text-gray-400"
                    }`}
                    title={`${cell.date}: ${cell.isCompleted ? "Completed" : "Not completed"}`}
                  >
                    {cell.dateObj.getDate()}
                  </div>
                ))}

                {/* Pad remaining days */}
                {week.length < 7 &&
                  [...Array(7 - week.length)].map((_, i) => (
                    <div
                      key={`pad-${i}`}
                      className="w-8 h-8 bg-gray-50 rounded"
                    />
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-200 flex items-center gap-4 text-xs text-gray-600">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded bg-gray-100" />
          <div className="w-3 h-3 rounded bg-green-200" />
          <div className="w-3 h-3 rounded bg-green-400" />
          <div className="w-3 h-3 rounded bg-green-500" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
