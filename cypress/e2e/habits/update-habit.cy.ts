describe('Habits - Edição de Hábitos', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/habits');
    cy.contains('Hábitos').should('be.visible');
  });

  it('deve editar o nome de um hábito', () => {
    // Create a habit first
    cy.createHabit('Meditar');

    // Open the context menu for the habit
    cy.openHabitMenu('Meditar');

    // Click "Editar" in the dropdown menu
    cy.get('[role="menuitem"]').contains('Editar').click();

    // The edit dialog should appear with "Editar Hábito" title
    cy.get('[role="dialog"]').should('be.visible');
    cy.get('[role="dialog"]').contains('Editar Hábito').should('be.visible');

    // The name field should be pre-filled with the current name
    cy.get('[role="dialog"]').find('#name').should('have.value', 'Meditar');

    // Clear the name and type a new one
    // Use select-all then type to ensure full replacement and avoid character loss in headless mode
    cy.get('[role="dialog"]').find('#name').focus().type('{selectall}{backspace}Meditar 15min', { delay: 50 });

    // Click "Atualizar"
    cy.get('[role="dialog"]').contains('button', 'Atualizar').click();

    // Wait for success toast
    cy.contains('Hábito atualizado com sucesso').should('be.visible');

    // Verify the updated name appears in the listing
    cy.contains('Meditar 15min').should('be.visible');
  });

  it('deve editar o tipo de recorrência', () => {
    // Create a daily habit
    cy.createHabit('Estudar');

    // Open the context menu
    cy.openHabitMenu('Estudar');

    // Click "Editar"
    cy.get('[role="menuitem"]').contains('Editar').click();

    // Wait for the edit dialog
    cy.get('[role="dialog"]').should('be.visible');

    // Change recurrence type to "X vezes por semana"
    cy.get('[role="dialog"]').find('button[role="combobox"]').click();
    cy.get('[role="option"]').contains('X vezes por semana').click();

    // Fill weekly count with a small delay for stability
    cy.get('[role="dialog"]').find('#recurrenceWeeklyCount').clear().type('3', { delay: 50 });

    // Click "Atualizar"
    cy.get('[role="dialog"]').contains('button', 'Atualizar').click();

    // Wait for success toast
    cy.contains('Hábito atualizado com sucesso').should('be.visible');

    // Verify the habit still exists with updated recurrence label
    cy.contains('Estudar').should('be.visible');
    cy.contains('3x por semana').should('be.visible');
  });
});
