"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button, } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CreateHabitForm } from "./create-habit-form";

export function CreateHabitButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <Plus className="size-4" />
          Create Habit
        </Button>
      </DialogTrigger>

      <CreateHabitForm
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      />

    </Dialog>
  )
}
