import type { CreateHabitOptions } from './types';

declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>;
      createHabit(name: string, options?: CreateHabitOptions): Chainable<void>;
      openHabitMenu(habitName: string): Chainable<void>;
    }
  }
}
