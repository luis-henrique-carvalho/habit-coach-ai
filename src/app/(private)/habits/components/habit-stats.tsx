import { Flame, Trophy, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { HabitStats as HabitStatsType } from "../types";

interface HabitStatsProps {
  stats: HabitStatsType;
}

export function HabitStats({ stats }: HabitStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      <StatCard
        icon={Flame}
        label="Sequência atual"
        value={`${stats.currentStreak} dias`}
        iconClass="text-orange-500"
      />
      <StatCard
        icon={Trophy}
        label="Maior sequência"
        value={`${stats.longestStreak} dias`}
        iconClass="text-yellow-500"
      />
      <StatCard
        icon={TrendingUp}
        label="30 dias"
        value={`${stats.completionRates.days30}%`}
        iconClass="text-blue-500"
      />
      <StatCard
        icon={TrendingUp}
        label="60 dias"
        value={`${stats.completionRates.days60}%`}
        iconClass="text-indigo-500"
      />
      <StatCard
        icon={TrendingUp}
        label="90 dias"
        value={`${stats.completionRates.days90}%`}
        iconClass="text-purple-500"
      />
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  iconClass,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  iconClass?: string;
}) {
  return (
    <Card className="p-4">
      <CardContent className="flex flex-col items-center gap-2 p-0 text-center">
        <Icon className={`h-5 w-5 ${iconClass}`} />
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-lg font-semibold text-foreground">{value}</span>
      </CardContent>
    </Card>
  );
}
