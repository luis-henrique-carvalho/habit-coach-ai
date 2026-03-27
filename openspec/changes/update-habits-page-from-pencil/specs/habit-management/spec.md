## ADDED Requirements

### Requirement: User can filter habits by activation status
The system SHALL allow users to filter the list of habits by their activation status. The available filters SHALL be "Todos" (All), "Ativos" (Active), and "Arquivados" (Archived).

#### Scenario: Filtering by Active
- **WHEN** the user selects the "Ativos" filter
- **THEN** the system displays only habits that are currently active (`isActive = true`)

#### Scenario: Filtering by Archived
- **WHEN** the user selects the "Arquivados" filter
- **THEN** the system displays only habits that are currently archived (`isActive = false`)

#### Scenario: Filtering by All
- **WHEN** the user selects the "Todos" filter
- **THEN** the system displays all habits regardless of their activation status
