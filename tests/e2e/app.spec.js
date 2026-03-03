import { test, expect } from '@playwright/test';

test.describe('E2E Тестування Калькулятора', () => {
    test.beforeEach(async ({ page }) => {
        // Тепер Playwright заходить на локальний сервер, а не відкриває файл напряму
        await page.goto('/');
    });

    test('успішне додавання двох чисел через UI', async ({ page }) => {
        // Емулюємо дії користувача: "натиснути 7" -> "+" -> "3" -> "="
        await page.click('button[data-val="7"]');
        await page.click('button[data-val="+"]');
        await page.click('button[data-val="3"]');
        await page.click('[data-testid="equal"]');

        // Перевіряємо коректність відображення результату на екрані
        const displayValue = await page.locator('[data-testid="display"]').innerText();
        expect(displayValue).toBe('10');
    });

    test('очищення екрану після натискання С', async ({ page }) => {
        // Емулюємо дії користувача: вводимо "99", потім натискаємо кнопку очищення "С"
        await page.click('button[data-val="9"]');
        await page.click('button[data-val="9"]');
        await page.click('button[data-action="clear"]');

        // Перевіряємо, чи екран скинувся до початкового стану "0"
        const displayValue = await page.locator('[data-testid="display"]').innerText();
        expect(displayValue).toBe('0');
    });
});