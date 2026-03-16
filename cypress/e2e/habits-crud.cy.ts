describe('Habits CRUD', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/habits');
  });

  it('should create, edit, toggle and archive a habit', () => {
    const habitName = 'Test Habit ' + Date.now();
    const updatedName = habitName + ' Updated';

    // 1. Create
    cy.contains('Adicionar Hábito').click();
    cy.get('h2').should('contain', 'Novo Hábito');
    
    cy.get('input#name').type(habitName);
    cy.get('textarea#description').type('Test Description');
    cy.get('button[type="submit"]').click();

    // Verify creation
    cy.contains(habitName).should('be.visible');
    cy.contains('Hábito criado com sucesso').should('be.visible');

    // 2. Edit
    // Hover to show the menu or just find it (it's in the DOM)
    cy.contains(habitName).parents('div[role="region"]').within(() => {
        // Since there might be multiple habits, we find the one we just created
        cy.contains(habitName).parents('.group').within(() => {
            cy.get('button.opacity-0').click({ force: true }); // Click the MoreVertical button
        });
    });
    
    cy.contains('Editar').click();
    cy.get('h2').should('contain', 'Editar Hábito');
    cy.get('input#name').clear().type(updatedName);
    cy.get('button[type="submit"]').click();

    // Verify edit
    cy.contains(updatedName).should('be.visible');
    cy.contains('Hábito atualizado com sucesso').should('be.visible');

    // 3. Toggle Completion
    cy.contains(updatedName).parents('.group').within(() => {
        cy.get('button[aria-label="Marcar hábito como concluído"]').click();
        cy.get('button[aria-label="Desmarcar hábito"]').should('exist');
        // Check if it's line-through
        cy.contains(updatedName).should('have.class', 'line-through');
    });

    // 4. Archive (Delete visually)
    cy.contains(updatedName).parents('.group').within(() => {
        cy.get('button.opacity-0').click({ force: true });
    });
    cy.contains('Arquivar').click();
    cy.get('h2').should('contain', 'Arquivar hábito');
    cy.get('button').contains('Arquivar').click();

    // Verify archive
    cy.contains(updatedName).should('not.exist');
    cy.contains('Hábito arquivado com sucesso').should('be.visible');
    cy.contains('Nenhum hábito cadastrado').should('be.visible');
  });
});
