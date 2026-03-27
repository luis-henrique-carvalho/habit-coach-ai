describe("Fluxo de Autenticação UI", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    // Limpar o banco de dados antes de cada teste
    // cy.task('db:seed'); // Use this if your seed task works correctly
  });

  it("deve fazer login com sucesso e redirecionar para o dashboard", () => {
    // Primeiro, criar o usuário via API para garantir que ele existe
    cy.request({
      method: "POST",
      url: "/api/auth/sign-up/email",
      body: {
        email: "ui-tester@example.com",
        password: "password123",
        name: "UI Tester",
      },
      failOnStatusCode: false,
    });

    cy.visit("/login");

    cy.get('input[name="email"]').type("ui-tester@example.com");
    cy.get('input[name="password"]').type("password123");

    cy.get('button[type="submit"]').click();

    // Deve redirecionar para /dashboard via Better Auth callbackURL
    // O Next.js + Better Auth pode demorar um pouco, então o Cypress espera automaticamente
    cy.url().should("include", "/dashboard");
    cy.contains(
      "Monitore o progresso da sua equipe aqui. Você está quase alcançando uma meta!",
    ).should("be.visible");
  });

  it("deve exibir erro com credenciais inválidas e não redirecionar", () => {
    cy.visit("/login");

    cy.get('input[name="email"]').type("ui-tester@example.com");
    cy.get('input[name="password"]').type("senha-errada");

    cy.get('button[type="submit"]').click();

    // Deve exibir mensagem de erro
    cy.get('[role="alert"]').should("be.visible");

    // Não deve redirecionar
    cy.url().should("include", "/login");
  });
});
