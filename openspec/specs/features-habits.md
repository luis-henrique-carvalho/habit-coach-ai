# Habits Feature Specification

## Overview
Complete specification for the Habits system - core feature of Habit Coach AI.

**Related:** `@/docs/PRD.md` seção 3.1 Sistema de Hábitos, `@/docs/MVP-SCOPE.md` seção 2.1 Sistema de Hábitos, `@/openspec/specs/database-schema.md` Habits Table

---

## Feature Scope

### What's Included (MVP)
- Create, edit, view, archive habits
- Track daily completions
- Streak calculation (current & longest)
- Weekly/monthly completion rates
- Visual calendar heatmap
- Frequency patterns (daily, specific days, X times/week)
- Preferred time reminders (Web Push)
- AI motivational messages on completion

### What's NOT Included (Future)
- Gamification (badges, points, leaderboards)
- Habit stacking / habit chains
- Social sharing / friend challenges
- Wearable integrations
- Advanced analytics / ML predictions
- Habit templates library
- Recurring notifications (only one-time reminder)

---

## User Stories & Requirements

### US01: Create Habit

**Story:**
> As Ana, I want to create a new habit with name, frequency, and optional reminder time, so I can start tracking it immediately.

**Acceptance Criteria:**
- ✅ User clicks "Create Habit" button on dashboard
- ✅ Modal/form appears with fields:
  - Habit name (required, 1-100 chars)
  - Description (optional, 0-500 chars)
  - Frequency selector (required):
    - Daily
    - Specific days (select days of week)
    - X times per week (select number 1-7)
  - Preferred time (optional, HH:MM format)
  - Enable reminder toggle (default: off)
- ✅ Form validates on submit with Zod schema
- ✅ Error messages appear inline for invalid fields
- ✅ On success, habit is created and appears immediately in habit list
- ✅ Toast notification: "Hábito '[name]' criado com sucesso!"
- ✅ If free user: check 3-habit limit, show upgrade message if reached
- ✅ If pro user: no limit

**Implementation Notes:**
- Location: `app/(private)/habits/` with following structure:
```
app/(private)/habits/
├── actions/
│   ├── create-habit.ts
│   ├── get-habits.ts
│   ├── update-habit.ts
│   └── index.ts
├── components/
│   ├── create-habit-modal.tsx
│   ├── habit-card.tsx
│   ├── habit-form.tsx
│   └── habit-heatmap.tsx
├── schemas/
│   └── habit-schema.ts
└── page.tsx
```
- Server Action: `actionCreateHabit`
- Zod Schema: `createHabitSchema`
- Database: Insert into `habits` table

**Error Cases:**
- Name empty: "Nome do hábito é obrigatório"
- Name too long: "Máximo 100 caracteres"
- Invalid frequency: "Frequência inválida"
- Free limit reached: "Plano Free permite 3 hábitos. [Upgrade →]"

---

### US02: Mark Habit as Complete

**Story:**
> As Carlos, I want to mark a habit as complete today with one click, so I can quickly track my progress.

**Acceptance Criteria:**
- ✅ User sees habit in today's checklist with unchecked checkbox
- ✅ User clicks checkbox to mark complete
- ✅ Checkbox animates (visual feedback)
- ✅ Status updates in DB immediately (optimistic UI)
- ✅ AI sends motivational message (by personality):
  - Yoda: "Forte você está hoje! Próximo passo..."
  - General: "SOLDADO, MAIS UM HÁBITO!"
  - Mentor: "Que lindo! Você deu um passo..."
- ✅ Toast notification with AI message appears
- ✅ Streak increases by 1 (if not already completed today)
- ✅ User can uncheck to remove completion

**Implementation Notes:**
- Location: `app/(private)/dashboard/` or `app/(private)/habits/` components
- File structure:
```
app/(private)/
├── dashboard/
│   ├── actions/
│   │   ├── get-dashboard.ts
│   │   └── mark-habit-complete.ts
│   ├── components/
│   │   ├── dashboard-content.tsx
│   │   ├── today-checklist.tsx
│   │   └── habit-quick-actions.tsx
│   └── page.tsx
├── habits/
│   ├── actions/
│   │   ├── mark-complete.ts
│   │   └── index.ts
│   └── components/
│       └── habit-completion-card.tsx
```
- Server Action: `actionMarkHabitComplete`
- Optimistic Update: Show checked immediately, confirm in background
- Zod: `markHabitCompleteSchema`
- Database: Insert into `habit_completions` table

**Streak Logic:**
```
Yesterday completed: Yes, Today completed: Yes → Streak +1
Yesterday completed: Yes, Today completed: No → Streak resets to 0
Yesterday completed: No, Today completed: Yes → Streak = 1
```

**Constraints:**
- Can mark complete for today or up to 7 days ago (for makeup)
- Cannot mark future dates as complete
- Cannot mark same date twice (unique constraint)

---

### US03: View Habit Details

**Story:**
> As Mariana, I want to see the history and stats of a habit, so I can understand my patterns.

**Acceptance Criteria:**
- ✅ User clicks on habit to see detail view
- ✅ Detail page shows:
  - Habit name & description
  - Current streak (with medal/emoji: 🔥)
  - Longest streak (all-time record)
  - Total completed (counter)
  - Calendar/heatmap showing last 90 days:
    - Complete: green/blue
    - Incomplete: gray
    - Today: highlighted border
  - Completion rate:
    - Last 7 days: %
    - Last 30 days: %
    - Last 90 days: %
  - Line chart: Completion trend (optional MVP)
- ✅ Option to edit habit settings
- ✅ Option to archive habit
- ✅ Quick action: Mark today complete from detail

**Implementation Notes:**
- Location: `app/(private)/habits/[id]/`
- File structure:
```
app/(private)/habits/
├── [id]/
│   ├── actions/
│   │   ├── get-habit-details.ts
│   │   └── calculate-streaks.ts
│   ├── components/
│   │   ├── habit-detail-card.tsx
│   │   ├── habit-heatmap.tsx
│   │   ├── habit-stats.tsx
│   │   └── habit-chart.tsx
│   └── page.tsx
├── components/
│   └── habit-navigation.tsx
```
- Query: Join habits + habitCompletions + calculate streaks
- Heatmap library: `recharts` or custom with Tailwind
- Performance: Cache streak/stats for 1 hour (optional)

**Calculations:**
```typescript
// Streak calculation
function calculateStreak(completions: Date[]): number {
  // Sort descending
  // Check each day backwards from today
  // If gap > 1 day: break
  // Return count
}

// Completion rate
function getCompletionRate(completions: Date[], days: number): number {
  return Math.round((completions.length / days) * 100)
}
```

---

### US04: Edit Habit

**Story:**
> As Ana, I want to edit a habit's settings, so I can adapt it to my changing schedule.

**Acceptance Criteria:**
- ✅ User clicks edit on habit detail
- ✅ Modal with same form as creation appears, pre-filled
- ✅ User can change: name, description, frequency, reminder time
- ✅ Form validates and saves on submit
- ✅ Completion history is preserved
- ✅ Streaks recalculate based on new frequency (if needed)
- ✅ Toast: "Hábito atualizado com sucesso!"

**Constraints:**
- Cannot edit completion history
- Changing frequency retroactively may affect past streaks (handle carefully)

---

### US05: Archive Habit

**Story:**
> As Carlos, I want to archive a habit without deleting it, so I can pause it temporarily.

**Acceptance Criteria:**
- ✅ User clicks "Archive" on habit detail
- ✅ Confirmation dialog: "Deseja arquivar este hábito?"
- ✅ On confirm: habit status → 'archived'
- ✅ Archived habit disappears from active list
- ✅ Can view archived habits in separate section
- ✅ Can unarchive to reactivate

**Implementation Notes:**
- Server Action: `actionArchiveHabit`
- Soft delete pattern: `status = 'archived'` (not delete)
- View: Filter by `status != 'archived'` by default

---

### US06: View Today's Checklist

**Story:**
> As Carlos, I want to see all today's habits in a clear checklist format, so I can quickly complete them all.

**Acceptance Criteria:**
- ✅ Dashboard main view shows "Today" section
- ✅ List of today's habits:
  - ☐ Habit name (uncompleted)
  - ☑ Habit name (completed)
- ✅ Sort by:
  - Reminder time (if set)
  - Alphabetical
  - Streak (highest first)
- ✅ Count badge: "5 of 8 completed" at top
- ✅ Completion % bar visualization
- ✅ Quick actions: Mark complete, view detail

**Filtering:**
Based on user's current timezone and habit frequency:
```
If habit.frequency == 'daily': Always show
If habit.frequency == 'specific_days': 
  - Show only if today in specificDays
If habit.frequency == 'per_week':
  - Show if not already completed X times this week
```

---

### US07: Habit Notifications (Web Push)

**Story:**
> As Ana, I want to receive a notification at my preferred time to remind me of a habit, so I don't forget.

**Acceptance Criteria:**
- ✅ User enables reminder on habit creation/edit
- ✅ User sets preferred time (HH:MM)
- ✅ At scheduled time, Web Push notification appears
- ✅ Notification text: "[Habit Name] - Hora de [Habit Name]!" with IA personality
- ✅ Click notification → opens app to mark complete
- ✅ User can disable notification per habit
- ✅ User can test notification (send now)

**Implementation Notes:**
- Service Worker: `public/sw.js`
- Scheduling: Server-side job (node-cron or similar)
- Timezone: User's timezone preference
- Frequency: One notification per day at preferred time

**Example Notification:**
```json
{
  "title": "Mestre Yoda - Meditação",
  "body": "Forte você está hoje. Meditar, hora é.",
  "badge": "/badge.png",
  "tag": "habit-meditation",
  "data": {
    "habitId": "habit_123",
    "actionUrl": "/dashboard?habitId=habit_123&mark=true"
  }
}
```

---

### US08: Free Plan Limit (3 Habits)

**Story:**
> As a free user, I want to understand the 3-habit limit, so I know when to upgrade.

**Acceptance Criteria:**
- ✅ Display active habit count: "3 of 3 hábitos"
- ✅ When limit reached, disable "Create Habit" button
- ✅ Show message: "Plano Free permite 3 hábitos. [Upgrade para Pro →]"
- ✅ Upgrade button links to `/pricing` or payment flow
- ✅ Pro users see unlimited indicator

---

## UI Components

### Habit Card
```tsx
// app/(private)/habits/components/habit-card.tsx
<Card>
  <CardContent>
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-semibold">{habit.name}</h3>
        <p className="text-sm text-gray-500">{habit.frequency}</p>
      </div>
      <Badge>🔥 {habit.currentStreak}</Badge>
    </div>
    
    <Progress value={completionRate} className="mt-4" />
    
    <div className="flex gap-2 mt-4">
      <Checkbox 
        checked={completedToday}
        onChange={toggleComplete}
      />
      <Button variant="ghost" size="sm">
        Ver Detalhes
      </Button>
    </div>
  </CardContent>
</Card>
```

### Habit Heatmap
```tsx
// app/(private)/habits/components/habit-heatmap.tsx
// Show 90-day calendar with completion status
// Green for complete, gray for incomplete
// Tooltip on hover: "5 of 7 days this week"
```

### Create Habit Modal
```tsx
// app/(private)/habits/components/create-habit-modal.tsx
// Form with:
// - name input
// - description textarea
// - frequency radio group
// - time picker
// - reminder toggle
// - create/cancel buttons
```

---

## Server Actions

### `actionCreateHabit`
```typescript
// app/(private)/habits/actions/create-habit.ts
export const actionCreateHabit = createAction()
  .schema(createHabitSchema)
  .action(async ({ parsedInput }) => {
    const session = await getSession()
    
    // Check free plan limit
    if (!isProUser(session.user)) {
      const count = await getActiveHabitCount(session.user.id)
      if (count >= 3) throw new Error('Free plan limit reached')
    }
    
    const habit = await db.insert(habits).values({
      userId: session.user.id,
      name: parsedInput.name,
      frequency: parsedInput.frequency,
      // ...
    }).returning()
    
    // Log event
    await logEvent('habit_created', { habitId: habit.id })
    
    return habit
  })
```

### `actionMarkHabitComplete`
```typescript
// app/(private)/habits/actions/mark-complete.ts
export const actionMarkHabitComplete = createAction()
  .schema(markHabitCompleteSchema)
  .action(async ({ parsedInput }) => {
    const session = await getSession()
    
    // Verify ownership
    const habit = await getHabit(parsedInput.habitId)
    if (habit.userId !== session.user.id) throw new Error('Unauthorized')
    
    // Create/update completion
    await db.insert(habitCompletions).values({
      habitId: habit.id,
      completedDate: parsedInput.date || new Date(),
    }).onConflictDoNothing()
    
    // Update streak
    const streak = await calculateStreak(habit.id)
    await db.update(habits)
      .set({ currentStreak: streak })
      .where(eq(habits.id, habit.id))
    
    // Generate AI message
    const message = await actionGenerateMessage({
      triggerType: 'habit_complete',
      context: { habitName: habit.name, streak },
    })
    
    return { success: true, aiMessage: message }
  })
```

---

## Analytics & Metrics

### Habit Creation Metrics
- Habits created per user (avg)
- Most common frequencies
- Reminder enablement rate

### Completion Metrics
- Daily completion rate (%)
- Average streak length
- Habit drop-off rate (archived after X days)
- Free vs Pro completion rates

### Feature Usage
- % users with 3 habits (Free limit trigger)
- % users with reminders enabled
- % users viewing habit details

---

## Testing Strategy

### Unit Tests
- Streak calculation logic
- Frequency matching (is habit applicable today?)
- Completion rate calculations

### Integration Tests
- Create habit with all frequency types
- Mark complete and verify streak
- Check free plan limits
- Archive and unarchive

### E2E Tests (Playwright)
- Complete habit creation flow
- Mark habit complete and see motivational message
- View habit details and history

---

## Performance Considerations

### Queries
- Index on `habits.userId` and `habits.status`
- Index on `habitCompletions.habitId` and `completedDate`
- Cache streak/stats for 1 hour

### UI
- Optimistic updates for mark complete (no loading state)
- Lazy load heatmap component (virtual scroll if 90+ days)
- Paginate habit list if 100+ habits (future)

---

## Future Enhancements

1. **Habit Templates:** Pre-made habits (exercise, meditation, reading)
2. **Stacking:** Link habits (after brush teeth, meditate)
3. **Progress Predictions:** "At this rate, 90-day streak in X days"
4. **Smart Reminders:** Adjust time based on completion patterns
5. **Weekly Review:** Automated email/notification with summary
6. **Public Habits:** Share progress with friends
