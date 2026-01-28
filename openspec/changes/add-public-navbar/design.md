# Design Document: Public Navigation Bar

## Context
The application currently lacks a persistent navigation header on public routes. This document outlines the technical decisions for implementing a responsive navbar that aligns with the Habit Coach AI design system and brand guidelines.

**Related spec**: `specs/layout-navigation/spec.md`

## Goals
- **Primary**: Implement a sticky, responsive navbar for public routes (landing, home)
- **Brand alignment**: Follow Signal Orange theme, bold typography, and modern design aesthetic
- **Mobile-first**: Hamburger menu for mobile, full horizontal layout for desktop
- **User guidance**: Enable seamless navigation between landing sections and authentication

## Non-Goals
- Implement navbar for authenticated routes (future sidebar will handle this)
- Add complex search functionality or advanced menu nesting
- Create custom drawer component (use existing shadcn/ui Sheet)

## Decisions

### Decision 1: Component Architecture
**What**: Create `src/components/layout/navbar.tsx` as a client component (`"use client"`)

**Why**:
- Navigation interactivity (drawer open/close, link clicks) requires client-side state
- Framer Motion animations need client environment
- Simpler state management with `useState` for drawer

**Alternatives considered**:
- Server component with client islands (more complex, unnecessary overhead)
- Multiple separate components (violates DRY principle)

### Decision 2: Sticky vs. Relative Positioning
**What**: Use CSS `position: sticky` with `top: 0` for navbar

**Why**:
- Persists at viewport top as user scrolls, improving accessibility to nav links
- User feedback requested sticky behavior
- Better UX for mobile users discovering features below hero section
- Less aggressive than `position: fixed` (avoids z-index complexity)

**Alternatives considered**:
- Relative (static) positioning: Less discoverable, requires user to scroll back up
- Fixed positioning: Would require layout adjustment, less elegant

### Decision 3: Mobile Menu Implementation
**What**: Use shadcn/ui `Sheet` component for mobile drawer

**Why**:
- Already available in project dependencies (via shadcn/ui)
- Built-in accessibility features (focus management, escape key handling)
- Customizable animation and positioning
- Consistent with shadcn/ui ecosystem

**Alternatives considered**:
- Custom drawer component: Reinvents the wheel, accessibility burden
- Accordion/collapsible menu: Less intuitive for mobile users
- Always-expanded vertical menu: Poor mobile real estate usage

### Decision 4: Responsive Breakpoint
**What**: Switch to hamburger menu at `md` breakpoint (768px)

**Why**:
- Aligns with Tailwind standard breakpoints
- iPad/tablet users (768px+) get desktop experience, better UX
- Mobile phones (< 768px) get optimized hamburger menu
- Consistent with responsive design practices

**Alternatives considered**:
- `lg` breakpoint (1024px): Wastes space on tablets
- `sm` breakpoint (640px): Some tablets fall into mobile menu, confusing UX

### Decision 5: Color & Styling Approach
**What**: Use only CSS variables from `globals.css` (OKLCH theme)

**Why**:
- Enforces design system compliance (design guidelines requirement)
- Ensures consistency with brand (Signal Orange primary)
- Simplifies dark/light mode switching via CSS variables
- Prevents hardcoded color violations

**Styling pattern**:
```tsx
// ✅ CORRECT
<div className="bg-primary text-primary-foreground">

// ❌ WRONG
<div className="bg-orange-500 text-white">
```

### Decision 6: Navigation Link Strategy
**What**: Use anchor-based navigation (`#features`, `#pricing`, etc.) with smooth scroll

**Why**:
- Landing page sections use stable IDs
- No Next.js routing overhead for same-page navigation
- Browser's native scroll-to-anchor behavior is reliable
- Future sections can easily add matching IDs

**Example HTML**:
```html
<a href="#features">Features</a>
<!-- Section below -->
<section id="features">...</section>
```

### Decision 7: Authentication Button Routing
**What**: Use Next.js `Link` component to route to `/auth/signin` and `/auth/signup`

**Why**:
- Existing auth pages at these routes
- Next.js Link provides client-side navigation (faster than reload)
- Matches current app navigation patterns

**Fallback**: Check actual auth routes during implementation; adjust paths if needed.

## Risks & Trade-offs

### Risk 1: Sticky Navbar Overlap
**Description**: Sticky navbar might cover content (h-16 height required)

**Mitigation**:
- Adjust page content margin-top or padding-top to accommodate navbar height
- Use CSS variable for navbar height to keep consistent

### Risk 2: Mobile Drawer Performance
**Description**: Heavy animations or large drawer content might impact performance

**Mitigation**:
- Use Framer Motion optimizations (will-change CSS)
- Keep drawer content lightweight
- Lazy-load non-critical drawer components if needed

### Risk 3: Anchor Link Scrolling on Mobile
**Description**: Anchor scrolling might be affected by sticky navbar; content could be hidden behind navbar

**Mitigation**:
- Use CSS scroll-margin-top to offset scroll position by navbar height
- Example: `scroll-margin-top: calc(var(--navbar-height) + 1rem)`
- Alternative: JavaScript smooth scroll with offset calculation

### Risk 4: Theme Variable Compliance
**Description**: Developer might accidentally use hardcoded colors

**Mitigation**:
- Follow design guidelines strictly during implementation
- Code review checklist includes color variable validation
- Consider linting rule (ESLint) to prevent arbitrary Tailwind colors (future enhancement)

## Migration Plan

### Phase 1: Component Creation (Non-breaking)
- Create navbar component
- Test in isolation
- Does not affect existing pages

### Phase 2: Layout Integration
- Add navbar to public layout or root layout
- Adjust margin/padding on public pages
- Test on live pages

### Phase 3: Validation
- Cross-browser testing
- Mobile device testing
- Performance profiling

### Rollback Strategy
- If issues arise, remove navbar import from layout
- Component can be hidden with `display: none` class temporarily
- No database or data model changes, so safe to revert

## Open Questions

1. **Navbar height**: Should it be fixed (e.g., h-16 = 64px) or dynamic based on content?
   - **Answer**: Fixed height (simpler, more predictable)

2. **Logo/branding**: Should navbar include a clickable logo linking to home, or just text "Habit Coach AI"?
   - **Answer**: Include logo (clickable to home) for better UX

3. **Drawer position**: Should drawer slide from left or right on mobile?
   - **Answer**: Slide from right (standard convention)

4. **Section IDs**: Do all landing sections already have ID attributes for anchor navigation?
   - **Action**: Check during implementation (Hero, Problem, Features, etc.)
   - **Fallback**: Add missing IDs to section components

5. **Active link indicator**: Should current section link highlight as user scrolls past sections?
   - **Answer**: Not in initial version (can add in future iteration)

## Technical Specifications

### Dependencies
- `next`: Already installed
- `react`: Already installed
- `framer-motion`: Already installed (for animations)
- `lucide-react`: Already installed (for hamburger icon)
- `@radix-ui` (for Sheet): Check if available, install if needed
- `tailwind-merge` or `clsx`: Already installed (for classname merging)

### File Structure
```
src/
├── components/
│   └── layout/
│       ├── navbar.tsx (NEW - Main navbar component)
│       └── footer.tsx (existing)
└── app/
    ├── layout.tsx (possibly modified)
    └── (public)/
        └── layout.tsx (check if exists, possibly modified)
```

### Estimated Component Size
- `navbar.tsx`: ~200-250 lines (includes navbar + drawer content)

## Testing Strategy

### Manual Testing
- [ ] Desktop responsive test (Inspect > toggle device toolbar)
- [ ] Mobile physical device test if possible
- [ ] Anchor link navigation (click each link, verify section scrolls into view)
- [ ] Drawer interactions (open, click links, close)

### Edge Cases
- [ ] Very long navigation link text (ensure no wrapping)
- [ ] Mobile with keyboard open (ensure navbar accessible)
- [ ] Dark mode (if applicable)
- [ ] Reduced motion preference (respect prefers-reduced-motion)

### Accessibility Checklist
- [ ] Keyboard navigation (Tab through all links)
- [ ] Screen reader (test with NVDA or VoiceOver)
- [ ] Focus indicators visible on all interactive elements
- [ ] Sufficient color contrast (WCAG AA)
- [ ] Hamburger icon has proper aria-label

## Success Metrics
- Navbar renders on all public pages without console errors
- All navigation links function correctly (anchor navigation works)
- Mobile hamburger menu opens/closes smoothly
- Navbar appears sticky when scrolling
- Design guidelines compliance (theme colors, typography)
- Accessibility pass (keyboard navigation, screen reader)
