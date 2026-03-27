"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UpsertHabitForm } from "./upsert-habit-form";

export function AddHabitButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="h-12 px-6 bg-primary text-primary-foreground font-extrabold tracking-tight rounded-none border-2 border-foreground hover:bg-primary/90 transition-colors"
      >
        <Plus className="mr-2 h-5 w-5" />
        NOVO HÁBITO
      </Button>
      <UpsertHabitForm isOpen={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
