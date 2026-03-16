describe('Habits - Listagem e Busca de Hábitos', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/habits');
    cy.contains('Hábitos').should('be.visible');
  });

  it('deve exibir estado vazio quando não há hábitos', () => {
    // With a clean database (from cy.login()), no habits should exist
    cy.contains('Nenhum hábito cadastrado').should('be.visible');
    cy.contains('Crie seu primeiro hábito para começar a acompanhar seu progresso').should('be.visible');

    // The empty state should also show an "Adicionar Hábito" button
    cy.contains('button', 'Adicionar Hábito').should('be.visible');
  });

  it('deve exibir hábitos criados na listagem', () => {
    // Create 2 habits
    cy.createHabit('Meditar', { description: '10 minutos de meditação' });
    cy.createHabit('Correr', {
      recurrenceType: 'weekly',
      weekdays: ['Seg', 'Qua', 'Sex'],
    });

    // Verify both habits appear in the listing
    cy.contains('Meditar').should('be.visible');
    cy.contains('Correr').should('be.visible');

    // Verify recurrence labels are displayed
    cy.contains('Diário').should('be.visible');
    // Weekly habits show their weekday labels
    cy.contains('Seg').should('be.visible');
  });

  it('deve filtrar hábitos pela busca', () => {
    // Create 2 habits
    cy.createHabit('Meditar');
    cy.createHabit('Correr');

    // Both habits should be visible initially
    cy.contains('Meditar').should('be.visible');
    cy.contains('Correr').should('be.visible');

    // Type search term in the search input
    cy.get('input[name="query"]').type('Med{enter}');

    // Wait for the page to reload with filtered results
    cy.contains('Meditar').should('be.visible');
    cy.contains('Correr').should('not.exist');
  });
});
