import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background py-12 border-t border-border">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
              <Sparkles size={18} />
            </div>
            Habit Coach AI
          </div>
          
          <div className="flex gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
            <a href="#" className="hover:text-primary">Contact Support</a>
          </div>
          
          <div className="text-sm text-muted-foreground">
            © 2026 Habit Coach AI. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}