import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 overflow-auto bg-background">
        <SidebarTrigger />
        <div className="animate-fade-in">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
