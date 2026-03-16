declare namespace Cypress {
  interface Chainable {
    login(): Chainable<void>;
  }
}

Cypress.Commands.add('login', () => {
  // 1. Clean the database for the test user
  cy.request('POST', '/api/test/seed').then(() => {
    // 2. Sign up the user via Better Auth to get proper signed cookies
    cy.request({
      method: 'POST',
      url: '/api/auth/sign-up/email',
      body: {
        email: 'cypress@example.com',
        password: 'password123',
        name: 'Cypress Tester',
      }
    });
  });
});
