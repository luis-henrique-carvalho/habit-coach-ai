# Proposal: Add Habit Management

## Overview

This proposal introduces the complete **Habit Management** module to Habit Coach AI, enabling users to create, track, and maintain habits with intelligent recurrence patterns, execution tracking, and streak (combo) calculations.

The module is a core feature of the MVP and serves as the foundation for the app's value proposition: helping users build and maintain habits consistently with AI-powered motivation and tracking.

## Problem Statement

Currently, the application has authentication in place but lacks the core habit tracking functionality. Users need:

1. **Comprehensive CRUD operations** for habits
2. **Flexible recurrence patterns** (daily, weekly, monthly, annual)
3. **Execution tracking** that validates against active recurrence dates
4. **Streak (combo) counting** that accurately reflects consecutive completion on active days only
5. **A scalable data model** that handles edge cases like non-active days, missed executions, and streak resets

## Proposed Solution

Implement a complete habit management system with:

### 1. Data Model
- **Habit** entity with metadata (name, description, user relationship)
- **Recurrence configuration** supporting 4 types:
  - Daily: interval in days (e.g., every 1 day, every 2 days)
  - Weekly: specific days of week (e.g., Friday, Saturday, Sunday)
  - Monthly: interval in months (e.g., every 1 month, every 2 months)
  - Annual: interval in years (e.g., every 1 year, every 2 years)
- **Execution records** with timestamps for completed dates
- **Streak tracking** with current and record counters

### 2. Business Logic
- Validate executions occur only on active recurrence dates
- Calculate current streak considering only consecutive active days
- Track longest streak achieved (record)
- Handle edge cases:
  - Missed executions reset current streak but preserve record
  - Executions on non-active days are rejected
  - Retroactive completions (up to 7 days back) are supported

### 3. API Layer
- Server Actions for all CRUD operations
- Type-safe mutations with `next-safe-action` + Zod validation
- Optimistic UI updates for instant feedback

### 4. User Interface
- Habit list view with status indicators
- Habit creation/edit form with recurrence configuration
- Habit detail view with calendar heatmap and statistics
- Quick completion actions

## Scope

### In Scope
- Complete CRUD operations (Create, Read, Update, Delete)
- All 4 recurrence types with their specific rules
- Execution tracking with date validation
- Streak calculation (current and record)
- Database schema and migrations
- Server Actions with validation
- Basic UI components for habit management
- Free tier limit: maximum 3 active habits per user

### Out of Scope (Future Enhancements)
- AI motivational messages (separate change)
- Notifications and reminders (separate change)
- Advanced analytics and insights (separate change)
- Habit sharing or social features
- Habit templates or recommendations
- Integration with external tracking apps

## Success Criteria

1. **Functional Completeness**
   - All CRUD operations work correctly
   - All recurrence types function as specified
   - Streak calculations are 100% accurate
   - Edge cases are handled properly

2. **Performance**
   - Habit list loads in < 2 seconds
   - Marking habit as complete responds in < 300ms
   - No N+1 query issues

3. **User Experience**
   - Creating a habit takes < 30 seconds
   - Recurrence configuration is intuitive
   - Streak visualization is clear and motivating

4. **Data Integrity**
   - No orphaned records
   - Cascading deletes work correctly
   - Concurrent execution updates are handled safely

## Dependencies

- Existing authentication system (Better Auth)
- Database (PostgreSQL + Drizzle ORM)
- UI components from shadcn/ui
- Server Actions infrastructure

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Complex recurrence logic may have bugs | High | Comprehensive unit tests with edge cases; clear documentation |
| Streak calculation errors could demotivate users | High | Extensive testing; audit logs for debugging |
| Performance issues with large execution histories | Medium | Indexed queries; pagination; data retention policies |
| User confusion with recurrence configuration | Medium | Intuitive UI with previews; helpful examples |

## Timeline Estimate

- Database schema: 1 day
- Core business logic: 2-3 days
- Server Actions: 1-2 days
- UI components: 2-3 days
- Testing and refinement: 2 days

**Total: 8-11 days**

## Related Specifications

- `habit-management` (new capability being introduced)

## Notes

- This is a foundational feature for the MVP
- Future enhancements will build on this module (AI integration, notifications, analytics)
- Design should accommodate future extensibility without major refactoring
- Follow existing patterns from authentication implementation
