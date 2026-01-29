import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ActivityItemProps {
  userName: string;
  userInitials: string;
  avatarColor: string;
  action: string;
  timestamp: string;
  isOnline?: boolean;
  content?: ReactNode;
  className?: string;
}

const ActivityItem = ({
  userName,
  userInitials,
  avatarColor,
  action,
  timestamp,
  isOnline = false,
  content,
  className,
}: ActivityItemProps) => {
  return (
    <div className={cn("flex items-start gap-4", className)}>
      <div className="relative">
        <Avatar>
          <AvatarFallback className={cn("text-sm font-medium", avatarColor)}>
            {userInitials}
          </AvatarFallback>
        </Avatar>
        {isOnline && (
          <div className="absolute -bottom-0.5 -right-0.5 size-3 bg-emerald-500 rounded-full border-2 border-background" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-medium text-foreground">
              {userName}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {action}
            </p>
          </div>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {timestamp}
          </span>
        </div>
        {content && (
          <div className="mt-2">
            {content}
          </div>
        )}
      </div>
    </div>
  );
}

export default ActivityItem;