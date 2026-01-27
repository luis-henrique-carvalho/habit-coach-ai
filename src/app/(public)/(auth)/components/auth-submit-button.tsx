"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface AuthSubmitButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
}

export function AuthSubmitButton({
  isLoading,
  children,
  className,
}: AuthSubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={className}
      aria-busy={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Carregando...
        </>
      ) : (
        children
      )}
    </Button>
  );
}
