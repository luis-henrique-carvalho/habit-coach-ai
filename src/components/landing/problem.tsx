"use client";

import { AlertCircle, TrendingDown, Clock, Users } from "lucide-react";

const problems = [
  {
    icon: AlertCircle,
    title: "Lack of Consistency & Motivation",
    description: "You start with enthusiasm, but motivation fades. Without personalized support, maintaining habits becomes an uphill battle."
  },
  {
    icon: TrendingDown,
    title: "No Personalized Feedback",
    description: "Generic habit trackers don't understand you. You need coaching that adapts to your personality, not the other way around."
  },
  {
    icon: Clock,
    title: "Overwhelming Goal-Setting",
    description: "Big goals feel impossible to tackle. Breaking them down into actionable steps is exhausting and confusing."
  },
  {
    icon: Users,
    title: "Lack of Accountability",
    description: "Going it alone is hard. Without someone checking in on your progress, it's easy to lose focus and give up."
  }
];

export function Problem() {
  return (
    <section id="problem" className="py-24 bg-background">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">What&apos;s Holding You Back?</h2>
          <p className="text-lg text-muted-foreground">
            Building habits is hard. You&apos;re not alone in struggling with these challenges.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {problems.map((problem, i) => (
            <div
              key={i}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="size-12 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center mb-6 group-hover:bg-destructive group-hover:text-destructive-foreground transition-colors">
                <problem.icon className="size-6" />
              </div>
              <h3 className="text-lg font-bold mb-3">{problem.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
