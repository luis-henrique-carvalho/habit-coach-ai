# Design: Landing Page Sections Architecture

## Component Structure

All components follow the established pattern from existing landing sections:

```
src/components/landing/
├── problem.tsx          # Pain points grid
├── solution.tsx         # Solution positioning with screenshot
├── how-it-works.tsx     # 4-step timeline
├── social-proof.tsx     # Testimonials carousel
├── faq.tsx             # Accordion component
├── final-cta.tsx       # Large conversion button
└── footer.tsx          # Navigation and links
```

## Design Patterns

### Consistent with Existing Code
- Use Framer Motion for animations where needed
- Tailwind CSS for styling
- shadcn/ui components (Button, Card)
- Lucide React icons
- Responsive design with mobile-first approach
- Section wrappers with `py-24`, alternating backgrounds

### Component Composition
Each section follows this structure:
```tsx
export function SectionName() {
  return (
    <section id="section-id" className="py-24 bg-[background]">
      <div className="container px-4 mx-auto">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Heading</h2>
          <p className="text-lg text-muted-foreground">Subheading</p>
        </div>
        
        {/* Content grid/cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Items */}
        </div>
      </div>
    </section>
  )
}
```

## Section-Specific Design Decisions

### Problem Section
- Grid of 3-4 cards with icons
- Each card: icon + title + description
- Subtle shadow and hover effect (matches Features pattern)
- Background: background (white/off-white)

### Solution Section
- Two-column layout: image left, content right
- On mobile: stacked image above text
- Content includes benefits list
- Reuses existing pattern from PersonalityShowcase

### How It Works
- Timeline with numbered circles
- 4 steps: Register → Choose Personality → Create Habits → Get Coaching
- Desktop: horizontal grid, Mobile: vertical stack
- Connection line visual between steps

### Social Proof
- Grid of 3-4 testimonial cards
- Each card: quote + author + avatar + rating (5 stars)
- On mobile: carousel using Framer Motion (like Personalidades)
- Background: secondary/30 (subtle background)

### FAQ
- Accordion component using Framer Motion
- Initially collapsed (trigger: click)
- Smooth expand/collapse animation
- 6-8 questions covering common objections

### Final CTA
- Centered layout with large headline
- Strong background (gradient or solid color)
- Large button with ArrowRight icon
- Reuses Hero CTA pattern but more aggressive

### Footer
- 4-column grid on desktop, stacked on mobile
- Sections: Logo, Product Links, Support Links, Legal
- Social icons (optional)
- Copyright info
- Background: darker shade

## Styling Decisions

### Colors
- Problem & Solution: background (white/off-white)
- How It Works: background
- Social Proof: secondary/30 (subtle background)
- FAQ: background
- Final CTA: gradient or primary color
- Footer: secondary/50 or darker

### Typography
- Section headings: `text-3xl md:text-5xl font-bold`
- Subheadings: `text-lg text-muted-foreground`
- Body: `text-base text-foreground`
- Consistent with existing sections

### Spacing
- Section padding: `py-24` (96px)
- Content container: `container px-4 mx-auto`
- Grid gaps: `gap-8`
- Card padding: `p-8`
- Top margin for headings: `mb-16`

## Responsiveness

All sections follow mobile-first approach:
- **Mobile** (< 640px): Single column, stacked cards
- **Tablet** (640-1024px): 2 columns where applicable
- **Desktop** (> 1024px): Full 3-4 column grids

## Animation Strategy

- Problem & Solution: Subtle on scroll (optional, can use Framer Motion InView)
- How It Works: Staggered appearance on numbers
- Social Proof: Carousel swipe on mobile, grid on desktop
- FAQ: Accordion expand/collapse
- Final CTA: Hover scale effect on button

## Integration Points

### `src/app/page.tsx`
Update import list and component order:
```tsx
import { Hero } from "@/components/landing/hero";
import { Problem } from "@/components/landing/problem";        // NEW
import { Features } from "@/components/landing/feature";
import { Solution } from "@/components/landing/solution";     // NEW
import { HowItWorks } from "@/components/landing/how-it-works"; // NEW
import { PersonalityShowcase } from "@/components/landing/personality-showcase";
import { SocialProof } from "@/components/landing/social-proof"; // NEW
import { Pricing } from "@/components/landing/pricing";
import { FAQ } from "@/components/landing/faq";              // NEW
import { FinalCTA } from "@/components/landing/final-cta";    // NEW
import { Footer } from "@/components/landing/footer";         // NEW

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <main>
        <Hero />
        <Problem />           {/* NEW */}
        <Features />
        <Solution />          {/* NEW */}
        <HowItWorks />        {/* NEW */}
        <PersonalityShowcase />
        <SocialProof />       {/* NEW */}
        <Pricing />
        <FAQ />              {/* NEW */}
        <FinalCTA />         {/* NEW */}
        <Footer />           {/* NEW */}
      </main>
    </div>
  );
}
```

## No Breaking Changes
- Existing components remain unchanged
- Uses only established patterns and libraries
- Compatible with current design system
- No modifications to other parts of codebase
