describe('Habits - Arquivamento de Hábitos', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/habits');
    cy.contains('Hábitos').should('be.visible');
  });

  it('deve arquivar um hábito com confirmação', () => {
    // Create a habit first
    cy.createHabit('Meditar');

    // Open the context menu for the habit
    cy.openHabitMenu('Meditar');

    // Click "Arquivar" in the dropdown menu
    cy.get('[role="menuitem"]').contains('Arquivar').click();

    // The archive confirmation dialog should appear
    cy.get('[role="dialog"]').should('be.visible');
    cy.get('[role="dialog"]').contains('Arquivar hábito').should('be.visible');
    cy.get('[role="dialog"]').contains('Meditar').should('be.visible');

    // Click "Arquivar" to confirm
    cy.get('[role="dialog"]').contains('button', 'Arquivar').click();

    // Dialog should close
    cy.get('[role="dialog"][data-state="open"]').should('not.exist');

    // The habit should be removed from the listing
    cy.contains('Meditar').should('not.exist');

    // Should show empty state since no more habits
    cy.contains('Nenhum hábito cadastrado').should('be.visible');
  });

  it('deve cancelar o arquivamento', () => {
    // Create a habit first
    cy.createHabit('Meditar');

    // Open the context menu
    cy.openHabitMenu('Meditar');

    // Click "Arquivar" in the dropdown menu
    cy.get('[role="menuitem"]').contains('Arquivar').click();

    // The archive confirmation dialog should appear
    cy.get('[role="dialog"]').should('be.visible');
    cy.get('[role="dialog"]').contains('Arquivar hábito').should('be.visible');

    // Click "Cancelar" to abort
    cy.get('[role="dialog"]').contains('button', 'Cancelar').click();

    // Dialog should close
    cy.get('[role="dialog"][data-state="open"]').should('not.exist');

    // The habit should still be in the listing
    cy.contains('Meditar').should('be.visible');
  });
});
