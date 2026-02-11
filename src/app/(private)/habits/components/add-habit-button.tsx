"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UpsertHabitForm } from "./upsert-habit-form";

export function AddHabitButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Adicionar Hábito
      </Button>
      <UpsertHabitForm isOpen={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
