import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  // Навчаємо Playwright запускати локальний сервер
  webServer: {
    command: 'npx serve src -p 3000',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
  },
  use: {
    baseURL: 'http://localhost:3000',
    headless: true, // Запуск без візуального вікна (зміни на false, щоб бачити браузер)
  },
});