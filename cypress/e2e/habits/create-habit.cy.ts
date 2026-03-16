describe('Habits - Criação de Hábitos', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/habits');
    // Wait for the page to fully load
    cy.contains('Hábitos').should('be.visible');
  });

  it('deve criar um hábito diário com sucesso', () => {
    // Click "Adicionar Hábito" to open the dialog
    cy.contains('button', 'Adicionar Hábito').click();

    // The dialog should appear with "Novo Hábito" title
    cy.get('[role="dialog"]').should('be.visible');
    cy.get('[role="dialog"]').contains('Novo Hábito').should('be.visible');

    // Fill in the name
    cy.get('[role="dialog"]').find('#name').type('Meditar');

    // Fill in the description
    cy.get('[role="dialog"]').find('#description').type('10 minutos de meditação');

    // Default recurrence is "Diário", no need to change

    // Submit the form
    cy.get('[role="dialog"]').contains('button', 'Criar').click();

    // Wait for success toast
    cy.contains('Hábito criado com sucesso').should('be.visible');

    // Verify the habit appears in the listing
    cy.contains('Meditar').should('be.visible');
    cy.contains('Diário').should('be.visible');
  });

  it('deve criar um hábito com dias específicos', () => {
    cy.contains('button', 'Adicionar Hábito').click();
    cy.get('[role="dialog"]').should('be.visible');

    // Fill name
    cy.get('[role="dialog"]').find('#name').type('Correr');

    // Change recurrence to "Dias específicos"
    cy.get('[role="dialog"]').find('button[role="combobox"]').click();
    cy.get('[role="option"]').contains('Dias específicos').click();

    // Select weekdays: Seg, Qua, Sex
    cy.get('[role="dialog"]').contains('button', /^Seg$/).click();
    cy.get('[role="dialog"]').contains('button', /^Qua$/).click();
    cy.get('[role="dialog"]').contains('button', /^Sex$/).click();

    // Submit
    cy.get('[role="dialog"]').contains('button', 'Criar').click();

    // Wait for success toast
    cy.contains('Hábito criado com sucesso').should('be.visible');

    // Verify the habit appears in the listing
    cy.contains('Correr').should('be.visible');
  });

  it('deve criar um hábito com X vezes por semana', () => {
    cy.contains('button', 'Adicionar Hábito').click();
    cy.get('[role="dialog"]').should('be.visible');

    // Fill name
    cy.get('[role="dialog"]').find('#name').type('Ler');

    // Change recurrence to "X vezes por semana"
    cy.get('[role="dialog"]').find('button[role="combobox"]').click();
    cy.get('[role="option"]').contains('X vezes por semana').click();

    // Fill weekly count
    cy.get('[role="dialog"]').find('#recurrenceWeeklyCount').type('4');

    // Submit
    cy.get('[role="dialog"]').contains('button', 'Criar').click();

    // Wait for success toast
    cy.contains('Hábito criado com sucesso').should('be.visible');

    // Verify the habit appears in the listing
    cy.contains('Ler').should('be.visible');
  });

  it('deve exibir erro de validação quando nome está vazio', () => {
    cy.contains('button', 'Adicionar Hábito').click();
    cy.get('[role="dialog"]').should('be.visible');

    // Try to submit without filling the name
    cy.get('[role="dialog"]').contains('button', 'Criar').click();

    // Dialog should remain open
    cy.get('[role="dialog"]').should('be.visible');

    // Should display validation error for the name field
    cy.get('[role="dialog"]').find('#name').focus().blur();
    cy.get('[role="dialog"]').contains('Nome é obrigatório').should('be.visible');
  });

  // TODO: Implementar teste de limite de hábitos
  // it('deve impedir criação ao atingir limite de 3 hábitos no plano Free', () => {
  //   // Create 3 habits using the custom command
  //   cy.createHabit('Hábito 1');
  //   cy.createHabit('Hábito 2');
  //   cy.createHabit('Hábito 3');

  //   // Try to create a 4th habit
  //   cy.contains('button', 'Adicionar Hábito').click();
  //   cy.get('[role="dialog"]').should('be.visible');

  //   cy.get('[role="dialog"]').find('#name').type('Hábito 4');

  //   cy.get('[role="dialog"]').contains('button', 'Criar').click();

  //   // Should display the tier limit error
  //   cy.contains('limite').should('be.visible');
  // });
});
