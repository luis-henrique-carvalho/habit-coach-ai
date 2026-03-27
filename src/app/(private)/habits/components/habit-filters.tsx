"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { HabitStatusFilter } from "../types";

interface HabitFiltersProps {
  currentQuery?: string;
  currentStatus?: HabitStatusFilter;
}

export function HabitFilters({ currentQuery, currentStatus = "all" }: HabitFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (status: HabitStatusFilter) => {
    const params = new URLSearchParams(searchParams.toString());
    if (status === "all") {
      params.delete("status");
    } else {
      params.set("status", status);
    }
    params.set("page", "1"); // Reset to first page on filter change
    
    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("query") as string;
    
    const params = new URLSearchParams(searchParams.toString());
    if (query) {
      params.set("query", query);
    } else {
      params.delete("query");
    }
    params.set("page", "1");
    
    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  const tabs: { label: string; value: HabitStatusFilter }[] = [
    { label: "Todos", value: "all" },
    { label: "Ativos", value: "active" },
    { label: "Arquivados", value: "archived" },
  ];

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full">
      {/* Search Input */}
      <form onSubmit={handleSearch} className="relative w-full sm:max-w-[320px]">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          name="query"
          defaultValue={currentQuery}
          placeholder="Buscar hábito..."
          className="h-11 pl-12 pr-4 bg-card border-border rounded-lg"
        />
      </form>

      {/* Status Tabs */}
      <div className="flex p-1 bg-muted rounded-lg gap-2 shrink-0">
        {tabs.map((tab) => {
          const isActive = currentStatus === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => handleStatusChange(tab.value)}
              disabled={isPending}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-md transition-all",
                isActive
                  ? "bg-card text-foreground shadow-sm border border-border"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
