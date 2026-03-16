import {
  subDays,
  format,
  getDay,
  startOfWeek,
  addDays,
} from "date-fns";

export type CellStatus = "completed" | "missed" | "not-expected" | "future";

export interface HeatmapCell {
  date: Date;
  dateStr: string;
  status: CellStatus;
  dayOfWeek: number;
}

export function isExpectedDay(
  dayOfWeek: number,
  recurrenceType: string,
  recurrenceWeekdays?: number[] | null
): boolean {
  if (recurrenceType === "daily") return true;
  if (recurrenceType === "weekly") {
    return recurrenceWeekdays?.includes(dayOfWeek) ?? false;
  }
  // weekly_count: any day could count towards the goal, so we consider it expected if not completed?
  // Actually, for weekly_count, it's hard to say if a SPECIFIC day was missed until the week ends.
  // But for the heatmap, we can just treat it as expected.
  return true;
}

export function generateHeatmapCells(
  executions: { completedDate: string }[],
  recurrenceType: string,
  recurrenceWeekdays: number[] | null | undefined,
  createdAt: Date,
  today: Date = new Date()
): HeatmapCell[] {
  const completedSet = new Set(executions.map((e) => e.completedDate));

  // Start from 90 days ago, aligned to the start of that week
  const ninetyDaysAgo = subDays(today, 89);
  const gridStart = startOfWeek(ninetyDaysAgo, { weekStartsOn: 1 });

  const cells: HeatmapCell[] = [];

  let current = gridStart;
  const createdAtStr = format(createdAt, "yyyy-MM-dd");

  while (current <= today) {
    const dateStr = format(current, "yyyy-MM-dd");
    const dayOfWeek = getDay(current); // 0=Sunday
    const isBeforeCreation = dateStr < createdAtStr;
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

  return cells;
}
