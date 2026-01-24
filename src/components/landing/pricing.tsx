import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-secondary/30">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Invest in Your Future Self</h2>
          <p className="text-lg text-muted-foreground">
            Start for free, upgrade for superpower accountability.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="p-8 rounded-3xl bg-card border border-border shadow-sm flex flex-col">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">Starter</h3>
              <div className="text-4xl font-bold mb-2">$0</div>
              <p className="text-muted-foreground">Perfect for building your first solid habits.</p>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3">
                <div className="bg-green-100 text-green-600 rounded-full p-1"><Check size={14} /></div>
                <span>3 Active Habits</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-green-100 text-green-600 rounded-full p-1"><Check size={14} /></div>
                <span>1 Active Goal</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-green-100 text-green-600 rounded-full p-1"><Check size={14} /></div>
                <span>1 AI Personality (Random)</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-green-100 text-green-600 rounded-full p-1"><Check size={14} /></div>
                <span>Basic Dashboard</span>
              </li>
            </ul>

            <Button variant="outline" size="lg" className="w-full rounded-full h-12">
              Start for Free
            </Button>
          </div>

          {/* Pro Plan */}
          <div className="p-8 rounded-3xl bg-primary text-primary-foreground shadow-2xl shadow-primary/20 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
              MOST POPULAR
            </div>
            
            <div className="mb-8 relative z-10">
              <h3 className="text-2xl font-bold mb-2">Pro Coach</h3>
              <div className="text-4xl font-bold mb-2">R$ 29,90<span className="text-lg font-normal opacity-80">/mo</span></div>
              <p className="opacity-90">For serious achievers who need results.</p>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1 relative z-10">
              <li className="flex items-center gap-3">
                <div className="bg-white/20 text-white rounded-full p-1"><Check size={14} /></div>
                <span>Unlimited Habits & Goals</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-white/20 text-white rounded-full p-1"><Check size={14} /></div>
                <span>Access to ALL AI Personalities</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-white/20 text-white rounded-full p-1"><Check size={14} /></div>
                <span>Smart Goal Breakdown (MCP)</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-white/20 text-white rounded-full p-1"><Check size={14} /></div>
                <span>Predictive Analytics</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-white/20 text-white rounded-full p-1"><Check size={14} /></div>
                <span>Priority Support</span>
              </li>
            </ul>

            <Button variant="secondary" size="lg" className="w-full rounded-full h-12 font-bold text-primary hover:bg-white relative z-10">
              Get Pro Access
            </Button>
            
            {/* Decoration */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}