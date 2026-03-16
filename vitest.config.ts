import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';
import { config } from 'dotenv';
import path from 'path';

export default defineConfig(() => {
  // Load local .env.test file if it exists
  config({ path: '.env.test' });
  
  return {
    test: {
      globals: true, // Permite usar describe/it sem importar
      root: './',
      include: ['**/*.e2e-spec.ts', '**/*.spec.ts', '**/*.test.ts'], // Pega testes unitários e de e2e
      environment: 'node',
      globalSetup: ['./test/globalSetup.ts'],
      setupFiles: ['./test/setup.ts'],
      fileParallelism: false,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    plugins: [
      // Esse plugin faz o Vitest compilar os arquivos com o SWC,
      // preservando os metadados dos decorators do NestJS.
      swc.vite({
        module: { type: 'es6' },
      }),
    ],
  };
});
