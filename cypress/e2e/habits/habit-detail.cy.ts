describe('Habits - Página de Detalhe', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/habits');
    cy.contains('Hábitos').should('be.visible');
  });

  it('deve navegar para a página de detalhe do hábito', () => {
    // Create a habit first
    cy.createHabit('Meditar', { description: '10 minutos' });

    // Click on the habit name link to navigate to detail
    cy.contains('a', 'Meditar').click();

    // URL should contain /habits/ followed by an id
    cy.url().should('match', /\/habits\/[a-f0-9-]+/);

    // The detail page should display the habit name as title
    cy.contains('Meditar').should('be.visible');

    // The detail page should show the recurrence label
    cy.contains('Diário').should('be.visible');
  });

  it('deve voltar para a listagem de hábitos', () => {
    // Create a habit first
    cy.createHabit('Meditar');

    // Navigate to the detail page
    cy.contains('a', 'Meditar').click();

    // Wait for the detail page to load
    cy.url().should('match', /\/habits\/[a-f0-9-]+/);
    cy.contains('Meditar').should('be.visible');

    // Click the back button — use first() since there may be multiple links to /habits
    cy.get('a[href="/habits"]').first().click();

    // Should navigate back to the habits listing
    cy.url().should('match', /\/habits\/?$/);
    cy.contains('Hábitos').should('be.visible');
  });
});
