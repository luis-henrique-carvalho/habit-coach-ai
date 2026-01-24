# Proposal: Add Missing Landing Page Sections

## Change ID
`add-missing-landing-sections`

## Objective
Complete the landing page by adding the six missing sections defined in `docs/LANDING-PAGE-SPEC.md`. These sections are essential to create a conversion-optimized landing page that communicates the Habit Coach AI value proposition from problem awareness through final call-to-action.

## Current State
The landing page currently implements:
- ✅ Hero section
- ✅ Features section
- ✅ Personality showcase
- ✅ Pricing section

Missing components prevent the page from:
- Establishing emotional connection through problem awareness
- Demonstrating the solution directly
- Guiding users through onboarding steps
- Building trust via social proof
- Addressing common objections
- Providing final conversion nudge
- Supporting navigation and trust signals

## Scope
Add six new component sections to `src/components/landing/`:

1. **Problem Section** - Communicate pain points users experience
2. **Solution Section** - Position Habit Coach AI as the answer
3. **How It Works Section** - Guide users through 4-step onboarding flow
4. **Social Proof Section** - Display testimonials and trust signals
5. **FAQ Section** - Address common objections with accordion
6. **Final CTA Section** - Last conversion opportunity with strong headline
7. **Footer** - Navigation, links, and compliance information

### Not in Scope
- Modifying existing components (Hero, Features, Personalities, Pricing)
- Backend changes or data collection
- Authentication flow modifications
- Database schema changes

## Impact
- **User Experience:** Improved conversion funnel with complete messaging
- **Code:** 7 new component files (~600 LOC total)
- **Pages:** Modifies `src/app/page.tsx` to integrate new sections
- **Components:** No breaking changes to existing components

## Dependencies
- None (builds on existing component patterns)
- Uses existing shadcn/ui components
- Compatible with current styling system

## Implementation Order
1. Problem Section (establishes context)
2. Solution Section (proposes answer)
3. How It Works (reduces friction)
4. Social Proof (builds trust)
5. FAQ (addresses objections)
6. Final CTA (conversion push)
7. Footer (navigation/compliance)

Update `page.tsx` to include all sections in correct order.

## Definition of Done
- All 7 components created with responsive design
- Integrated into landing page in correct sequence
- Consistent with LANDING-PAGE-SPEC.md requirements
- Passes `openspec validate --strict`
- No TypeScript errors
- Responsive on mobile/tablet/desktop per spec

## Design Decisions
See `design.md` for architecture and styling approach.

## Specification Deltas
See `specs/landing-page/spec.md` for detailed requirements per section.
