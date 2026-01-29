import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

interface PageHeaderProps {
  children: React.ReactNode;
  className?: string;
  withBorder?: boolean;
}

interface PageHeaderContentProps {
  children: React.ReactNode;
  className?: string;
}

interface PageTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface PageDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

interface PageActionsProps {
  children: React.ReactNode;
  className?: string;
}

interface PageContentProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <main
      className={cn("min-h-screen w-full", className)}
      role="main"
    >
      {children}
    </main>
  );
}

export function PageHeader({
  children,
  className,
  withBorder = true,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "px-6 py-6 sm:px-8 lg:px-10",
        withBorder && "border-b border-border/40",
        className
      )}
      role="banner"
    >
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        {children}
      </div>
    </header>
  );
}

export function PageHeaderContent({
  children,
  className,
}: PageHeaderContentProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {children}
    </div>
  );
}

export function PageTitle({ children, className }: PageTitleProps) {
  return (
    <h1
      className={cn(
        "text-3xl font-semibold tracking-tight text-foreground sm:text-4xl",
        className
      )}
    >
      {children}
    </h1>
  );
}

export function PageDescription({ children, className }: PageDescriptionProps) {
  return (
    <p className={cn("max-w-2xl text-sm text-muted-foreground/80", className)}>
      {children}
    </p>
  );
}

export function PageActions({ children, className }: PageActionsProps) {
  return (
    <nav
      className={cn("flex shrink-0 items-center gap-2", className)}
      aria-label="Acoes da pagina"
      role="navigation"
    >
      {children}
    </nav>
  );
}

export function PageContent({ children, className }: PageContentProps) {
  return (
    <section
      className={cn(
        "space-y-6 px-6 py-8 sm:px-8 lg:px-10",
        className
      )}
      role="region"
      aria-label="Conteudo principal"
    >
      {children}
    </section>
  );
}
