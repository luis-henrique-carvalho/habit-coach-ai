describe('Habits - Toggle de Conclusão', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/habits');
    cy.contains('Hábitos').should('be.visible');
  });

  it('deve marcar hábito como concluído', () => {
    // Create a habit first
    cy.createHabit('Meditar');

    // The habit card should show the toggle button
    // Find the toggle button in the checklist section ("Hoje")
    // The checklist toggle has aria-label "Marcar como concluído"
    cy.get('button[aria-label="Marcar como concluído"]')
      .first()
      .click();

    // After clicking, the button should change to completed state
    // The aria-label changes to "Desmarcar"
    cy.get('button[aria-label="Desmarcar"]').should('exist');

    // The habit name text should have strikethrough styling
    cy.contains('Meditar')
      .filter('span')
      .should('have.class', 'line-through');
  });

  it('deve desmarcar hábito concluído', () => {
    // Create a habit first
    cy.createHabit('Meditar');

    // Mark as completed
    cy.get('button[aria-label="Marcar como concluído"]')
      .first()
      .click();

    // Verify it's completed
    cy.get('button[aria-label="Desmarcar"]').should('exist');

    // Now unmark it
    cy.get('button[aria-label="Desmarcar"]')
      .first()
      .click();

    // The button should revert to uncompleted state
    cy.get('button[aria-label="Marcar como concluído"]').should('exist');

    // The habit name should no longer have strikethrough
    cy.contains('Meditar')
      .filter('span')
      .should('not.have.class', 'line-through');
  });
});
