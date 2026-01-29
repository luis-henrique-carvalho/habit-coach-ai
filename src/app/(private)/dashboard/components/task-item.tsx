import { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TaskItemProps {
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
  title: string;
  status: {
    label: string;
    color: string;
    dotColor: string;
  };
  duration: string;
  className?: string;
}

const TaskItem = ({
  icon: Icon,
  iconColor,
  iconBgColor,
  title,
  status,
  duration,
  className,
}: TaskItemProps) => {
  return (
    <div className={cn("flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors", className)}>
      <div className={cn("p-2 rounded-md", iconBgColor)}>
        <Icon className={cn("size-4", iconColor)} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">
          {title}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <Badge
            variant="outline"
            className={cn(
              "inline-flex items-center gap-1 text-xs border-none px-2",
              status.color
            )}
          >
            <div className={cn("size-1.5 rounded-full", status.dotColor)} />
            {status.label}
          </Badge>
          <span className="text-xs text-muted-foreground">&bull; {duration}</span>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;