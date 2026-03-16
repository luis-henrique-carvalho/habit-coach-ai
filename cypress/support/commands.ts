declare namespace Cypress {
  interface Chainable {
    login(): Chainable<void>;
  }
}

Cypress.Commands.add('login', () => {
  cy.request('POST', '/api/test/seed').then((response) => {
    const { sessionToken } = response.body;
    cy.setCookie('better-auth.session_token', sessionToken);
  });
});
