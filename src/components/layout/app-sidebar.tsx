"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Zap,
  TrendingUp,
  Settings,
  LogOut,
  User,
  Sparkles,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const mainMenuItems = [
  {
    label: "Dashboard",
    icon: Home,
    href: "/dashboard",
    description: "Visão geral dos seus hábitos",
  },
  {
    label: "Hábitos",
    icon: Zap,
    href: "/habits",
    description: "Gerencie seus hábitos diários",
  },
  {
    label: "Progresso",
    icon: TrendingUp,
    href: "/progress",
    description: "Acompanhe seu crescimento",
  },
];

const secondaryMenuItems = [
  {
    label: "Configurações",
    icon: Settings,
    href: "/settings",
    description: "Personalize sua experiência",
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="bg-sidebar border-r border-sidebar-border">
      {/* Header com Logo */}
      <SidebarHeader className="border-b border-sidebar-border/50 pb-3">
        <Link
          href="/dashboard"
          className="group flex items-center gap-3 px-2 py-3 rounded-lg transition-all duration-200 hover:bg-sidebar-accent/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sidebar-ring"
        >
          <div className="size-8 rounded-lg bg-primary shadow-md group-hover:shadow-lg group-hover:bg-primary transition-all duration-200 flex items-center justify-center">
            <Sparkles className="size-4 text-primary-foreground" />
          </div>
          <div className="flex flex-col gap-0.5 group-data-[collapsible=icon]:hidden">
            <span className="font-semibold text-sm text-sidebar-foreground leading-tight">
              Habit Coach
            </span>
            <span className="text-xs text-sidebar-foreground/60">AI</span>
          </div>
        </Link>
      </SidebarHeader>

      {/* Content Principal */}
      <SidebarContent className="flex flex-col gap-6 px-0">
        {/* Menu Principal */}
        <div className="px-2">
          <div className="mb-2 px-2 text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider">
            Menu
          </div>
          <SidebarMenu className="gap-1">
            {mainMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={{
                      children: (
                        <div className="flex flex-col gap-1">
                          <span className="font-medium">{item.label}</span>
                          <span className="text-xs opacity-80">
                            {item.description}
                          </span>
                        </div>
                      ),
                    }}
                    className={`relative group px-3 py-2.5 transition-all duration-200 ${
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                    }`}
                  >
                    <Link href={item.href} className="flex items-center gap-3 w-full">
                      <Icon
                        className={`size-4 transition-transform duration-200 ${
                          isActive ? "scale-110" : "group-hover:scale-105"
                        }`}
                      />
                      <span className="text-sm font-medium">{item.label}</span>
                      {isActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </div>

        {/* Separador Visual */}
        <SidebarSeparator className="mx-2 bg-sidebar-border/50" />

        {/* Menu Secundário */}
        <div className="px-2">
          <div className="mb-2 px-2 text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider">
            Outros
          </div>
          <SidebarMenu className="gap-1">
            {secondaryMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={{
                      children: (
                        <div className="flex flex-col gap-1">
                          <span className="font-medium">{item.label}</span>
                          <span className="text-xs opacity-80">
                            {item.description}
                          </span>
                        </div>
                      ),
                    }}
                    className={`relative group px-3 py-2.5 transition-all duration-200 ${
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                    }`}
                  >
                    <Link href={item.href} className="flex items-center gap-3 w-full">
                      <Icon
                        className={`size-4 transition-transform duration-200 ${
                          isActive ? "scale-110" : "group-hover:scale-105"
                        }`}
                      />
                      <span className="text-sm font-medium">{item.label}</span>
                      {isActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </div>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-sidebar-border/50 gap-3">
        {/* Perfil Link */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip={{
                children: "Acesse seu perfil e configurações pessoais",
              }}
              className="group px-3 py-2.5 text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-200"
            >
              <Link href="/profile" className="flex items-center gap-3">
                <div className="size-8 rounded-full bg-linear-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                  <User className="size-4 text-primary-foreground" />
                </div>
                <span className="text-sm font-medium">Perfil</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Logout Button */}
        <form action="/api/auth/logout" method="POST" className="w-full">
          <Button
            type="submit"
            variant="ghost"
            className="w-full justify-start px-3 py-2.5 text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200 rounded-lg"
          >
            <LogOut className="size-4" />
            <span className="text-sm font-medium">Sair</span>
          </Button>
        </form>
      </SidebarFooter>
    </Sidebar>
  );
}
