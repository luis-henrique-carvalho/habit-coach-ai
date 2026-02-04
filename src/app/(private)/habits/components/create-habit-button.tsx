"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CreateHabitButtonProps {
  onClick: () => void;
  isDisabled?: boolean;
  disabledReason?: string;
}

export function CreateHabitButton({
  onClick,
  isDisabled = false,
  disabledReason,
}: CreateHabitButtonProps) {
  const button = (
    <Button
      onClick={onClick}
      disabled={isDisabled}
      className="gap-2"
      size="lg"
    >
      <Plus className="w-5 h-5" />
      Create Habit
    </Button>
  );

  if (isDisabled && disabledReason) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent>{disabledReason}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return button;
}
