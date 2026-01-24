import { Zap, Target, BarChart3, Bell, BrainCircuit, Split } from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "AI-Powered Insights",
    description: "Our AI analyzes your patterns to predict when you'll slip up and helps you prevent it before it happens."
  },
  {
    icon: Split,
    title: "Smart Goal Breaking",
    description: "Overwhelmed by big goals? Our MCP AI automatically breaks them down into tiny, manageable daily tasks."
  },
  {
    icon: BarChart3,
    title: "Predictive Analytics",
    description: "Don't just see where you've been. See where you're going with success probability forecasts."
  },
  {
    icon: Target,
    title: "Custom Habit Stacks",
    description: "Build powerful routines by chaining habits together. The AI suggests optimal times for each stack."
  },
  {
    icon: Bell,
    title: "Contextual Nudges",
    description: "Get reminders that actually matter, based on your location, time, and current energy levels."
  },
  {
    icon: Zap,
    title: "Gamified Streaks",
    description: "Earn XP and level up your character. Unlock new skins for your AI coach as you progress."
  }
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">More Than Just Checkboxes</h2>
          <p className="text-lg text-muted-foreground">
            A complete system designed to rewire your brain for success, powered by advanced behavioral science and AI.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <feature.icon className="size-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}