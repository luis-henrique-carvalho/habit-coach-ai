# Implementation Tasks: Add Missing Landing Page Sections

## Prerequisites
- [ ] Read `design.md` for architecture decisions
- [ ] Read `specs/landing-page/spec.md` for detailed requirements
- [ ] Review `docs/LANDING-PAGE-SPEC.md` for visual/content guidance

## Component Implementation

### 1. Problem Section
- [ ] Create `src/components/landing/problem.tsx`
  - [ ] Define 3-4 pain point cards with icons
  - [ ] Use Lucide React icons (e.g., AlertCircle, TrendingDown, Clock)
  - [ ] Implement responsive grid: 1 col mobile, 2 col tablet, 3-4 col desktop
  - [ ] Add hover effects (subtle elevation and border change)
  - [ ] Ensure consistent spacing and padding with other sections
  - [ ] Validate: No TypeScript errors, renders without crashing

### 2. Solution Section
- [ ] Create `src/components/landing/solution.tsx`
  - [ ] Implement two-column layout (image left, content right)
  - [ ] Stack vertically on mobile (image above text)
  - [ ] Include benefits list (3-4 items with icons/checkmarks)
  - [ ] Position as counterpart to Problem section
  - [ ] Use existing pattern from PersonalityShowcase
  - [ ] Validate: Responsive layout works on all breakpoints

### 3. How It Works Section
- [ ] Create `src/components/landing/how-it-works.tsx`
  - [ ] Implement 4-step timeline with numbered circles
  - [ ] Define steps: Register → Choose Personality → Create Habits → Get Coaching
  - [ ] Add connection line between steps (visual flow)
  - [ ] Horizontal layout on desktop, vertical on mobile
  - [ ] Include brief description per step
  - [ ] Validate: Responsive, clear visual hierarchy

### 4. Social Proof Section
- [ ] Create `src/components/landing/social-proof.tsx`
  - [ ] Implement 3 testimonial cards
  - [ ] Each card: quote + author name + avatar + 5-star rating
  - [ ] Add carousel functionality for mobile (Framer Motion)
  - [ ] Grid layout on desktop (3 columns)
  - [ ] Include subtle animations
  - [ ] Validate: Testimonials display correctly, carousel works on mobile

### 5. FAQ Section
- [ ] Create `src/components/landing/faq.tsx`
  - [ ] Implement accordion component with Framer Motion
  - [ ] Include 6-8 frequently asked questions
  - [ ] Questions cover: plans, cancellation, security, personality change, etc.
  - [ ] Collapse/expand animation (300ms, smooth)
  - [ ] One question expanded by default (optional)
  - [ ] Two-column layout on desktop, single column on mobile
  - [ ] Validate: Accordion opens/closes smoothly, mobile layout works

### 6. Final CTA Section
- [ ] Create `src/components/landing/final-cta.tsx`
  - [ ] Implement centered layout with strong headline
  - [ ] Add subheadline reinforcing "free to start"
  - [ ] Large primary button with ArrowRight icon
  - [ ] Distinct background (gradient or solid color)
  - [ ] Call-to-action text: "Start Coaching Now" or similar
  - [ ] Hover effect on button (scale/shadow)
  - [ ] Validate: Button is visually prominent, responsive

### 7. Footer Section
- [ ] Create `src/components/landing/footer.tsx`
  - [ ] Four-column layout on desktop: Logo, Product, Support, Legal
  - [ ] Columns:
    - **Logo**: Logo + tagline + optional social icons
    - **Product**: Features, Pricing, Roadmap
    - **Support**: FAQ, Contact, Help
    - **Legal**: Terms, Privacy, GDPR
  - [ ] Mobile: Stacked layout, single column
  - [ ] Copyright info at bottom
  - [ ] Use neutral background color (secondary/50 or darker)
  - [ ] Links with hover underline effect
  - [ ] Validate: All links work, layout stacks properly on mobile

## Integration

### 8. Update Home Page
- [ ] Modify `src/app/page.tsx`
  - [ ] Import all 7 new components
  - [ ] Add components in correct order:
    1. Hero
    2. Problem
    3. Features
    4. Solution
    5. HowItWorks
    6. PersonalityShowcase
    7. SocialProof
    8. Pricing
    9. FAQ
    10. FinalCTA
    11. Footer
  - [ ] Ensure no duplicate imports
  - [ ] Validate: Page loads, all sections render, no console errors

## Testing & Validation

### 9. Responsive Design Testing
- [ ] Test all sections on mobile (< 640px)
  - [ ] Text is readable
  - [ ] Cards/grids stack correctly
  - [ ] Buttons are tappable (44px+ touch target)
  - [ ] Images/carousels render properly
- [ ] Test on tablet (640-1024px)
  - [ ] 2-column layouts work
  - [ ] Spacing is balanced
- [ ] Test on desktop (> 1024px)
  - [ ] Full grid layouts render
  - [ ] Content is well-organized

### 10. Browser & Device Testing
- [ ] Chrome/Edge latest
- [ ] Firefox latest
- [ ] Safari latest
- [ ] iOS Safari (iPhone 12+)
- [ ] Android Chrome

### 11. Code Quality
- [ ] All components have `"use client"` if using interactivity
- [ ] No TypeScript errors (`tsc --noEmit`)
- [ ] ESLint passes (`eslint .`)
- [ ] Consistent naming and formatting
- [ ] No unused imports or variables

### 12. Accessibility
- [ ] All interactive elements are keyboard accessible
- [ ] Color contrast meets WCAG AA standards
- [ ] Images have alt text (if applicable)
- [ ] Heading hierarchy is logical (h2, h3, etc.)
- [ ] Links have descriptive text

## Validation & Sign-off

- [ ] Run `openspec validate add-missing-landing-sections --strict --no-interactive`
- [ ] All sections render without errors
- [ ] Mobile/tablet/desktop layouts verified
- [ ] Compare against `docs/LANDING-PAGE-SPEC.md` requirements
- [ ] Code review checklist complete
