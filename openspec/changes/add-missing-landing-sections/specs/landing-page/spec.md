# Specification: Landing Page Sections

**Capability:** Landing Page Components  
**Change:** add-missing-landing-sections  
**Status:** Proposal  
**Last Updated:** 2026-01-23

## ADDED Requirements

### Requirement: Problem Section Component

**Description:** The application SHALL display a Problem section component that communicates user pain points through an empathetic, visually organized grid of cards.

**Details:**
- Section heading (H2): "The Problem" or "What's Holding You Back?" (48-64px on desktop)
- Subheading: 1-2 sentence description establishing shared frustration
- Content grid: 3-4 pain point cards in responsive layout
  - Mobile (< 640px): 1 column
  - Tablet (640-1024px): 2 columns
  - Desktop (> 1024px): 3-4 columns
- Each card structure: Icon + Title + Description (1-2 sentences)
- Card styling: Subtle shadow, hover effects (border color change, slight elevation)
- Suggested pain points:
  - Lack of consistency and motivation
  - No personalized feedback or coaching
  - Overwhelming goal-setting process
  - Lack of accountability
- Background color: background (white/off-white, #fafafa or #ffffff)
- Padding: 96px vertical (py-24), 16px horizontal on mobile
- Icons: Use Lucide React for consistency

#### Scenario: User Recognizes Their Struggle

When a new visitor scrolls from Hero to Problem section:
- Problem headline immediately resonates with their current challenge
- 3-4 pain point cards clearly layout the user's pain points
- On mobile (375px width), cards stack vertically and remain readable
- On tablet (768px), cards display in 2-column grid with balanced spacing
- On desktop (1440px), cards display in 3-column grid
- Icon + text combination is visually cohesive and professional
- User feels acknowledged, understood, and validated
- User is motivated to continue scrolling to see the solution

---

### Requirement: Solution Section Component

**Description:** The application SHALL display a Solution section component that positions Habit Coach AI as the answer to identified problems through two-column layout with product benefits.

**Details:**
- Section heading: "The Solution" or "Meet Habit Coach AI" (H2, 48-64px)
- Description text: 2-3 sentences explaining how product solves identified problems
- Layout: Two-column on desktop (image left, content right), stacked on mobile (image above text)
- Image/Visual: App dashboard screenshot or product mockup (minimum 800x600px, retina-ready)
- Content includes: Benefits list (3-4 items with icons or checkmarks)
- Benefit examples:
  - AI coaching with customizable personality
  - Personalized motivation and feedback
  - Automatic goal decomposition via MCP
  - Real-time accountability and tracking
- Visual call-outs: Optional highlight boxes, arrows, or annotations on screenshot
- Background: white/off-white or subtle light background
- Image optimization: Lazy-loaded for performance
- Mobile image: Ensure legibility at smaller sizes

#### Scenario: User Understands How Product Solves Their Problem

After feeling understood by the Problem section, user scrolls to Solution:
- Solution headline clearly explains how Habit Coach AI addresses their pain points
- Product screenshot immediately shows the actual dashboard interface
- Benefits list highlights unique value propositions (AI personality, auto-decomposition)
- User can see concrete proof the product works as described
- On mobile (375px), screenshot scales proportionally and text remains readable
- On tablet (768px), two-column layout begins, image and text are balanced
- On desktop (1440px), image left/content right layout maximizes visual hierarchy
- User builds confidence in the product's ability to help
- User feels ready to learn how to get started

---

### Requirement: How It Works Section Component

**Description:** The application SHALL display a How It Works section that guides users through a simple 4-step onboarding process with numbered progression and visual flow.

**Details:**
- Section heading: "Get Started in 4 Steps" or "Simple to Begin" (H2, 48-64px)
- Four-step progression, each with:
  - Large numbered circle: 1, 2, 3, 4 (visual indicator of progress)
  - Step title (bold, 18-24px)
  - Step description: Single clear sentence
  - Optional: Icon or mini visual per step
- Steps in sequence:
  1. **Register for Free** - Sign up with email, no credit card required
  2. **Choose Your Coach** - Select from AI personalities (Yoda, General, Friend)
  3. **Create Habits & Goals** - Set up habits and goals to track
  4. **Get Personalized Coaching** - Receive daily AI-powered feedback
- Layout progression:
  - Desktop (> 1024px): Horizontal grid (4 columns) with optional connecting line
  - Tablet (640-1024px): 2 columns, wrapping to 2 rows
  - Mobile (< 640px): Vertical stack or timeline layout
- Visual progression: Large numbered circles (40-60px diameter), clear step order
- Connection visual: Optional line or element connecting steps (visual flow)
- Background: background (white/off-white)
- Animations: Optional subtle entrance animation on scroll using Framer Motion
- Typography: Numbers bold and large, titles clear, descriptions smaller

#### Scenario: New User Sees Clear Onboarding Path

After understanding the solution, user scrolls to How It Works:
- Four steps are displayed clearly and in logical sequence
- Each step feels small and achievable, reducing intimidation
- User understands the exact process: Register → Choose → Create → Coach
- On mobile (375px), steps stack vertically with clear visual numbers
- On tablet (768px), steps display in 2x2 grid with balanced spacing
- On desktop (1440px), steps display in single horizontal row with connecting line
- User feels confidence that the process is simple and quick
- Visual progression (large numbers, connecting line) guides attention top-to-bottom
- User is actively encouraged to sign up

---

### Requirement: Social Proof Section Component

**Description:** The application SHALL display a Social Proof section with 3+ testimonial cards that build trust through authentic user quotes, avatars, and 5-star ratings.

**Details:**
- Section heading: "Loved by Our Users" or "What Users Say" (H2, 48-64px)
- Minimum 3 testimonial cards (can display more)
- Each testimonial card contains:
  - Quote text: 1-2 sentences (styled in italics or with quote mark visual)
  - Author name: First and last name (bold, 14-16px)
  - Author role/context: Optional job title or descriptor
  - Avatar: Circular 48x48px minimum (photo or placeholder)
  - 5-star rating: Visual star display (all 5 filled)
- Layout:
  - Desktop (> 1024px): 3-column grid
  - Tablet (640-1024px): 2-column grid
  - Mobile (< 640px): Carousel/swipeable (using Framer Motion) or 1-column stacked
- Card styling: Subtle shadow (0 2px 8px rgba(0,0,0,0.08)), border, hover elevation
- Optional statistics row: Additional metrics like "X users", "Y habits completed", "Z% consistency rate"
- Background: secondary/30 or subtle background color
- Testimonial content themes:
  - Results achieved (habit consistency, streaks maintained)
  - Personality effectiveness (motivation, style fit)
  - User experience quality (app ease-of-use)
  - Emotional impact (confidence, accountability)
- MVP note: Use internal team testimonials, beta testers, or realistic synthesized testimonials
- Cards responsive: Avatar/text scale appropriately on mobile

#### Scenario: Potential Customer Gains Confidence

After seeing how to get started, user scrolls to Social Proof:
- Testimonial cards immediately showcase other users' success stories
- 5-star ratings visible on each card signal high satisfaction
- On mobile (375px), user can swipe/scroll through testimonials naturally
- On tablet (768px), 2-column grid of testimonials displays
- On desktop (1440px), 3-column grid provides visual variety
- User sees proof that real people have succeeded with Habit Coach AI
- Avatar + name combination adds authenticity (faces build trust)
- User becomes significantly more confident in converting to free account
- Social proof removes objection: "Do other people actually use this?"

---

### Requirement: FAQ Section Component

**Description:** The application SHALL display an FAQ section with 6-8 expandable questions in an accordion interface that addresses common user objections and concerns.

**Details:**
- Section heading: "Frequently Asked Questions" (H2, 48-64px)
- Accordion component with Framer Motion expand/collapse
- 6-8 questions covering essential topics:
  1. How does the free plan work? (limits, features)
  2. Can I cancel my Pro subscription anytime?
  3. Is my data secure and private?
  4. How does the AI coaching work? (plain language explanation)
  5. Can I change my AI personality after sign-up?
  6. Does Habit Coach AI work offline?
  7. Is there a mobile app? (roadmap transparency)
  8. What payment methods are supported?
- Each FAQ item structure:
  - Question header (clickable, bold, 16-18px)
  - Initially hidden answer (collapsed)
  - Expand/collapse animation: Smooth ease, 300ms duration
  - Icon indicator: Chevron or + / - that rotates on expand
- Expand behavior: One item expanded by default (optional) to show interaction is possible
- Layout:
  - Desktop (> 1024px): 2-column grid with FAQ items flowing
  - Tablet (640-1024px): 1 column, full width
  - Mobile (< 640px): 1 column, touch-friendly (44px+ tap target)
- Background: background (white/off-white)
- Answer length: Concise but informative (2-4 sentences per answer)
- Icon indicator: Clear visual that question is expandable (interactive affordance)

#### Scenario: Hesitant User Resolves Final Objections

After viewing social proof, user scrolls to FAQ:
- Questions directly address common hesitations before sign-up
- User clicks a question (e.g., "Is my data secure?") and answer expands smoothly
- Answer is visible for 300ms smooth animation, feels responsive
- User finds answer to their specific concern clearly stated
- Answer content is reassuring without being verbose
- User clicks another question, previous one collapses
- On mobile (375px), all FAQ items are easily tappable (44x44px+ touch targets)
- On tablet (768px), FAQ flows naturally in single column
- On desktop (1440px), 2-column layout saves space while maintaining readability
- Friction removed, user feels safer proceeding to sign-up
- Objection addressed, user is ready to convert

---

### Requirement: Final CTA Section Component

**Description:** The application SHALL display a Final CTA section with a strong, visually distinct headline and large call-to-action button to convert engaged visitors before footer.

**Details:**
- Section heading: Benefit-focused headline (e.g., "Ready to Build Unstoppable Habits?") (H2, 48-64px)
- Subheading: 1-2 sentences (14-18px) reinforcing free tier + no credit card required
- Primary CTA button:
  - Text: "Start Coaching Now" or similar action verb
  - Icon: ArrowRight (lucide-react) on right side
  - Size: 48px+ height on mobile for tappability
  - Color: Primary color with hover scale effect (110% on hover)
  - Padding: Generous horizontal padding (24-32px)
- Background styling: Visually distinct from rest of page
  - Option A: Gradient (e.g., blue to purple, or primary fade)
  - Option B: Solid primary color with opacity
  - Option C: Secondary color with high contrast button
- Layout: Centered design with ample whitespace
- Vertical padding: 96px (py-24)
- Optional visual: Small icon or motivational illustration above button
- Mobile responsive: Full-width button with padding, or centered with max-width
- Desktop: Centered button with breathing room (max-width constraint)
- Accessibility: Clear focus state on button, high contrast text

#### Scenario: Engaged User Converts at Last CTA

After scrolling through entire value proposition:
- Final CTA section has visually distinct background (stands out from rest)
- User reads compelling headline reiterating the benefit
- Subheadline removes final objection: "Free to start, no credit card"
- Large, primary-colored button is impossible to miss
- Button text and ArrowRight icon signal progress/action
- On mobile (375px), button spans most of width with padding, tap target is 48x48px+
- On tablet (768px), button is centered with generous whitespace
- On desktop (1440px), button is centered with strong visual presence
- User clicks button, confirming intent to sign up
- CTA leads to registration flow
- Conversion complete

---

### Requirement: Footer Component

**Description:** The application SHALL display a Footer component with multi-column navigation, support links, and legal compliance information that adapts to mobile and desktop layouts.

**Details:**
- Layout: Multi-column on desktop, stacked on mobile
- Column structure (Desktop - 4 columns):
  - **Column 1 - Brand**: Habit Coach AI logo + tagline + optional social icons (Twitter, LinkedIn, GitHub)
  - **Column 2 - Product**: Header "Product" + Links: Features, Pricing, Roadmap, Blog
  - **Column 3 - Support**: Header "Support" + Links: FAQ, Help Center, Contact, Status Page
  - **Column 4 - Legal**: Header "Legal" + Links: Terms of Service, Privacy Policy, GDPR Info, Cookie Policy
- Mobile layout (< 640px): Stacked single column with grouped sections
- Footer bottom content:
  - Copyright: "© 2026 Habit Coach AI. All rights reserved."
  - Optional: "Built with care" or similar tagline
- Styling:
  - Background: Dark neutral (#1a1a1a, #27272a) OR light (#f5f5f5) - consistent with design
  - Text color: text-muted-foreground (lighter than body)
  - Link styling: text-sm (12-14px), hover:underline (underline appears on hover)
  - Spacing: 64px padding top/bottom (py-16), 16px gap between columns
  - No excessive styling, professional and minimal aesthetic
- Links functionality:
  - All links are internally functional (no broken links)
  - External social links open in new tab (_blank)
  - Keyboard navigation: Tab order logical, all links keyboard-accessible
- Icons: Optional social icons (Twitter, LinkedIn, GitHub) with hover effects

#### Scenario: User Explores Footer After Decision

After final CTA, user scrolls to footer:
- Footer provides clear navigation to other sections without re-scrolling
- Support links (FAQ, Help, Contact) build trust and offer recourse
- Legal links demonstrate compliance commitment (Terms, Privacy, GDPR)
- Social icons (if present) allow following product updates
- On mobile (375px), all sections stack vertically in single column
- On tablet (768px), footer reorganizes to fit available width
- On desktop (1440px), 4-column layout maximizes information density
- Footer is readable with clear visual hierarchy
- All links are tappable on mobile (touch-friendly spacing)
- User easily finds Terms of Service, Privacy Policy, or Contact info
- User completes page exploration with confidence in brand legitimacy

---

## MODIFIED Requirements

### Requirement: Home Page Layout Integration

**Description:** The home page (`src/app/page.tsx`) MUST import and render all 11 landing page sections in optimal conversion funnel order (Hero → Problem → Features → Solution → HowItWorks → PersonalityShowcase → SocialProof → Pricing → FAQ → FinalCTA → Footer).

**Reference:** `src/app/page.tsx`

**Details:**
- Import all section components in import block at top of file
- Render components within `<main>` tag in this sequence:
  1. Hero (existing)
  2. Problem (new)
  3. Features (existing)
  4. Solution (new)
  5. HowItWorks (new)
  6. PersonalityShowcase (existing)
  7. SocialProof (new)
  8. Pricing (existing)
  9. FAQ (new)
  10. FinalCTA (new)
  11. Footer (new)
- Outer container maintains classes: `min-h-screen bg-background font-sans text-foreground selection:bg-primary/20`
- Each section imported with default export (e.g., `import { Hero } from "..."`)
- No modifications to existing component props or functionality
- Section order is critical for conversion funnel logic (problem → solution → action)
- No TypeScript errors or unused imports

#### Scenario: Visitor Experiences Complete Conversion Funnel

When a new visitor lands on home page:
- Hero section immediately captures attention with strong value prop
- Problem section establishes emotional connection and validates their pain
- Features section showcases capabilities they didn't know existed
- Solution section demonstrates how product directly solves their problems
- How It Works section reduces friction by showing simple process
- PersonalityShowcase differentiates product from competitors
- Social Proof builds confidence through testimonial credibility
- Pricing section presents transparent options (Free and Pro)
- FAQ addresses remaining objections and hesitations
- Final CTA section provides strong motivation to sign up now
- Footer provides trust signals and navigation options
- Entire flow methodically guides visitor from awareness → consideration → decision → action
- User either converts to Free or Pro account, or bookmarks for later

---

## Implementation Notes

### Technology Stack
- **Framework:** React 19, Next.js 16 (App Router)
- **Styling:** Tailwind CSS with shadcn/ui components
- **Icons:** Lucide React
- **Animations:** Framer Motion (for carousel, accordion, optional entrance animations)
- **Patterns:** Follow existing components in `src/components/landing/`

### Accessibility
- All interactive elements keyboard-accessible
- Color contrast WCAG AA or higher
- Semantic HTML (h2, h3, buttons, links)
- ARIA labels where needed
- Focus visible on buttons/links

### Performance
- Images lazy-loaded below fold
- No render-blocking resources
- Optimize image sizes (WebP when possible)
- Component-level code splitting (automatic with Next.js)

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## Related Capabilities
- **Hero Section** (existing) - Sets tone and value prop
- **Features Section** (existing) - Details capabilities
- **Personality Showcase** (existing) - Showcases unique differentiator
- **Pricing Section** (existing) - Conversion point
- **Navigation/Header** (future) - Global site navigation

---

## Testing Criteria

### Functional
- [ ] All 7 components render without errors
- [ ] No TypeScript errors
- [ ] ESLint passes
- [ ] Links in footer work
- [ ] Accordion opens/closes
- [ ] Carousel works on mobile

### Responsive
- [ ] Mobile (320-640px): Single column, stacked cards, readable
- [ ] Tablet (641-1024px): 2-column layouts, balanced spacing
- [ ] Desktop (1025px+): Full grid layouts, proper alignment

### Visual
- [ ] Color scheme consistent with design guidelines
- [ ] Spacing follows 8px grid system
- [ ] Typography hierarchy clear (h2, p, etc.)
- [ ] Hover effects visible and subtle
- [ ] Animations smooth (60fps)

### UX
- [ ] Conversion funnel is logical
- [ ] Each section has clear purpose
- [ ] Call-to-actions are visible
- [ ] Mobile experience is friction-free

---

## References
- [LANDING-PAGE-SPEC.md](../../docs/LANDING-PAGE-SPEC.md) - Detailed visual guidelines
- [DESIGN-GUIDELINES.md](../../docs/DESIGN-GUIDELINES.md) - Component and style conventions
- [project.md](../project.md) - Tech stack and conventions
- Existing components: `src/components/landing/{hero,feature,personality-showcase,pricing}.tsx`
