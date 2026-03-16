describe('Habits Dashboard', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/habits');
  });

  it('should render the habits dashboard', () => {
    cy.get('h1').should('contain', 'Hábitos');
    cy.get('button').should('contain', 'Adicionar Hábito');
  });

  it('should display an empty state if no habits exist', () => {
    cy.get('main').should('be.visible');
    cy.contains('Nenhum hábito cadastrado').should('be.visible');
    cy.contains('Crie seu primeiro hábito para começar a acompanhar seu progresso').should('be.visible');
  });
});
