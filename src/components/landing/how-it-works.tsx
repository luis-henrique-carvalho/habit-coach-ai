"use client";

const steps = [
  {
    number: 1,
    title: "Register for Free",
    description: "Sign up with email. No credit card required."
  },
  {
    number: 2,
    title: "Choose Your Coach",
    description: "Select from Yoda, General, or Friend AI personalities."
  },
  {
    number: 3,
    title: "Create Habits & Goals",
    description: "Set up habits and goals to track your progress."
  },
  {
    number: 4,
    title: "Get Personalized Coaching",
    description: "Receive daily AI-powered feedback tailored to you."
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-background">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Get Started in 4 Steps</h2>
          <p className="text-lg text-muted-foreground">
            Simple, straightforward, and designed for success.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                {/* Connecting line */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 -right-4 w-8 h-0.5 bg-linear-to-r from-primary/50 to-primary/20"></div>
                )}

                {/* Step Card */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative z-10 mb-6">
                    <div className="size-24 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                      <div className="text-4xl font-bold text-primary">{step.number}</div>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
