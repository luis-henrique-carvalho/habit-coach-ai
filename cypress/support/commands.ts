import type { CreateHabitOptions } from './types';

Cypress.Commands.add('login', () => {
  // 1. Clean the database for the test user
  cy.request('POST', '/api/test/seed').then(() => {
    // 2. Try to sign up the user via Better Auth
    cy.request({
      method: 'POST',
      url: '/api/auth/sign-up/email',
      body: {
        email: 'cypress@example.com',
        password: 'password123',
        name: 'Cypress Tester',
      },
      failOnStatusCode: false,
    }).then((signUpResponse) => {
      if (signUpResponse.status !== 200) {
        cy.request({
          method: 'POST',
          url: '/api/auth/sign-in/email',
          body: {
            email: 'cypress@example.com',
            password: 'password123',
          },
        });
      }
    });
  });
});

Cypress.Commands.add('createHabit', (name: string, options: CreateHabitOptions = {}) => {
  const {
    description,
    recurrenceType = 'daily',
    weekdays,
    weeklyCount,
  } = options;

  // Dismiss any existing toasts before opening the dialog
  // Toasts from previous creates can block the "Adicionar Hábito" button
  cy.get('body').then(($body) => {
    const toasts = $body.find('[data-sonner-toast]');
    if (toasts.length > 0) {
      // clica no botão de fechar do toast
      cy.wrap(toasts).find('button').click({ force: true, multiple: true });
    }
  });

  // Click the "Adicionar Hábito" button to open the dialog
  cy.contains('button', 'Adicionar Hábito').click({ force: true });

  // Wait for the dialog to appear
  cy.get('[role="dialog"]').should('be.visible');

  // Fill the name field with a delay for stability in headless mode
  cy.get('[role="dialog"]').find('#name').focus().type('{selectall}{backspace}' + name, { delay: 50 });

  // Fill description if provided
  if (description) {
    cy.get('[role="dialog"]').find('#description').focus().type('{selectall}{backspace}' + description, { delay: 50 });
  }

  // Handle recurrence type selection
  if (recurrenceType !== 'daily') {
    const recurrenceLabels: Record<string, string> = {
      weekly: 'Dias específicos',
      weekly_count: 'X vezes por semana',
    };

    cy.get('[role="dialog"]').find('button[role="combobox"]').click();
    cy.get('[role="option"]').contains(recurrenceLabels[recurrenceType]).click();
  }

  // Select weekdays if recurrence is "weekly"
  if (recurrenceType === 'weekly' && weekdays && weekdays.length > 0) {
    weekdays.forEach((day) => {
      cy.get('[role="dialog"]')
        .contains('button', new RegExp(`^${day}$`))
        .click();
    });
  }

  // Fill weekly count if recurrence is "weekly_count"
  if (recurrenceType === 'weekly_count' && weeklyCount) {
    cy.get('[role="dialog"]')
      .find('#recurrenceWeeklyCount')
      .clear()
      .type(weeklyCount.toString(), { delay: 50 });
  }

  // Submit the form
  cy.get('[role="dialog"]').contains('button', 'Criar').click();

  // Wait for the success toast to appear (confirms server-side creation)
  cy.contains('Hábito criado com sucesso').should('be.visible');

  // Verify the habit appears in the listing
  cy.contains(name).should('be.visible');
});

Cypress.Commands.add('openHabitMenu', (habitName: string) => {
  // Find the habit card containing the habit name
  // The HabitCard uses a "group" class on the Card for hover effects
  cy.contains(habitName)
    .closest('[class*="group"]')
    .find('button')
    .last()
    .click({ force: true });

  // Wait for the dropdown menu content to appear
  cy.get('[role="menuitem"]').should('be.visible');
});
