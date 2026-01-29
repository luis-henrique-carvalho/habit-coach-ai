import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { de } from "zod/v4/locales";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard = ({
  icon: Icon,
  label,
  value,
  trend,
  className,
}: StatCardProps) => {
  return (
    <Card className={cn("p-6 bg-card border-border/50 hover:border-border transition-colors", className)}>
      <div className="flex items-start justify-between mb-4">
        <div className="p-2.5 rounded-lg bg-primary/10">
          <Icon className="size-5 text-primary" />
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">
          {label}
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-semibold text-foreground">
            {value}
          </span>
          {trend && (
            <Badge
              variant="outline"
              className={cn(
                "text-xs border-none",
                trend.isPositive
                  ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20"
                  : "text-red-600 bg-red-50 dark:bg-red-950/20"
              )}
            >
              {trend.value}
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
}

export default StatCard;