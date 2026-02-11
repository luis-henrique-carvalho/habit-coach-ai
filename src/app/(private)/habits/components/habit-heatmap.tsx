"use client";

import { useMemo } from "react";
import {
  subDays,
  format,
  getDay,
  startOfWeek,
  addDays,
} from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HabitHeatmapProps {
  executions: { completedDate: string }[];
  recurrenceType: string;
  recurrenceWeekdays?: number[] | null;
  createdAt: Date;
}

type CellStatus = "completed" | "missed" | "not-expected" | "future";

export function HabitHeatmap({
  executions,
  recurrenceType,
  recurrenceWeekdays,
  createdAt,
}: HabitHeatmapProps) {
  const { cells, weekdayLabels } = useMemo(() => {
    const today = new Date();
    const completedSet = new Set(executions.map((e) => e.completedDate));

    // Start from 90 days ago, aligned to the start of that week
    const ninetyDaysAgo = subDays(today, 89);
    const gridStart = startOfWeek(ninetyDaysAgo, { weekStartsOn: 1 });

    const cells: {
      date: Date;
      dateStr: string;
      status: CellStatus;
      dayOfWeek: number;
    }[] = [];

    let current = gridStart;
    while (current <= today) {
      const dateStr = format(current, "yyyy-MM-dd");
      const dayOfWeek = getDay(current); // 0=Sunday
      const isBeforeCreation = current < new Date(format(createdAt, "yyyy-MM-dd"));
      const isBeforeWindow = current < ninetyDaysAgo;

      let status: CellStatus;
      if (isBeforeCreation || isBeforeWindow) {
        status = "not-expected";
      } else if (completedSet.has(dateStr)) {
        status = "completed";
      } else if (isExpectedDay(dayOfWeek, recurrenceType, recurrenceWeekdays)) {
        status = "missed";
      } else {
        status = "not-expected";
      }

      cells.push({ date: current, dateStr, status, dayOfWeek });
      current = addDays(current, 1);
    }

    const weekdayLabels = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

    return { cells, weekdayLabels };
  }, [executions, recurrenceType, recurrenceWeekdays, createdAt]);

  // Organize cells into columns (weeks)
  const weeks: typeof cells[] = [];
  let currentWeek: typeof cells = [];
  for (const cell of cells) {
    // Monday = start of week
    const mappedDay = cell.dayOfWeek === 0 ? 6 : cell.dayOfWeek - 1; // Convert to Mon=0
    if (mappedDay === 0 && currentWeek.length > 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(cell);
  }
  if (currentWeek.length > 0) weeks.push(currentWeek);

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-muted-foreground">
        Últimos 90 dias
      </h3>
      <div className="flex gap-1 overflow-x-auto pb-2">
        {/* Weekday labels */}
        <div className="flex shrink-0 flex-col gap-1 pr-1">
          {weekdayLabels.map((label, i) => (
            <div
              key={label}
              className="flex h-3 w-6 items-center text-[10px] text-muted-foreground"
            >
              {i % 2 === 0 ? label : ""}
            </div>
          ))}
        </div>
        {/* Weeks grid */}
        <TooltipProvider delayDuration={100}>
          <div className="flex gap-1">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-1">
                {Array.from({ length: 7 }).map((_, di) => {
                  const cell = week.find((c) => {
                    const mapped = c.dayOfWeek === 0 ? 6 : c.dayOfWeek - 1;
                    return mapped === di;
                  });
                  if (!cell) {
                    return <div key={di} className="h-3 w-3" />;
                  }
                  return (
                    <Tooltip key={di}>
                      <TooltipTrigger asChild>
                        <div
                          className={`h-3 w-3 rounded-sm ${cellColor(cell.status)}`}
                        />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="text-xs">
                        {format(cell.date, "dd/MM/yyyy")} —{" "}
                        {statusLabel(cell.status)}
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
            ))}
          </div>
        </TooltipProvider>
      </div>
      {/* Legend */}
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="inline-block h-3 w-3 rounded-sm bg-emerald-500" />
          Concluído
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-3 w-3 rounded-sm bg-red-200" />
          Pendente
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-3 w-3 rounded-sm bg-muted" />
          Não esperado
        </span>
      </div>
    </div>
  );
}

function isExpectedDay(
  dayOfWeek: number,
  recurrenceType: string,
  recurrenceWeekdays?: number[] | null
): boolean {
  if (recurrenceType === "daily") return true;
  if (recurrenceType === "weekly") {
    return recurrenceWeekdays?.includes(dayOfWeek) ?? false;
  }
  // weekly_count: any day could count
  return true;
}

function cellColor(status: CellStatus): string {
  switch (status) {
    case "completed":
      return "bg-emerald-500";
    case "missed":
      return "bg-red-200";
    case "not-expected":
      return "bg-muted";
    case "future":
      return "bg-muted/50";
  }
}

function statusLabel(status: CellStatus): string {
  switch (status) {
    case "completed":
      return "Concluído";
    case "missed":
      return "Pendente";
    case "not-expected":
      return "Não esperado";
    case "future":
      return "Futuro";
  }
}
