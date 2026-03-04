import { calculateResult } from './calculator.js';
import posthog from 'posthog-js';

posthog.init('phc_dRPmHZkSGuZhx4qmXFzWdJOnNmzmqU6eXorTZhJYhd6', {
    api_host: 'https://us.i.posthog.com',
    person_profiles: 'identified_only', // Записуємо лише ідентифікованих або всіхʼ
    defaults: '2026-01-30'
});

// Твій попередній імпорт calculator.js та інший код залишається нижче...

let currentInput = '0';
let previousInput = null;
let currentOperator = null;
let shouldResetScreen = false;

const display = document.getElementById('display');
const keypad = document.getElementById('keypad');

keypad.addEventListener('click', (e) => {
    if (!e.target.matches('button')) return;

    const action = e.target.dataset.action;
    const val = e.target.dataset.val;

    if (action === 'number') {
        if (currentInput === '0' || shouldResetScreen) {
            currentInput = val;
            shouldResetScreen = false;
        } else {
            currentInput += val;
        }
    }

    if (action === 'operator') {
        // НОВЕ: Обробка мінуса як знака від'ємного числа (унарний мінус)
        if (val === '-' && (currentInput === '0' || shouldResetScreen)) {
            currentInput = '-';
            shouldResetScreen = false;
            display.innerText = currentInput;
            return; // Зупиняємо виконання, бо це частина числа, а не дія
        }

        // Виконуємо попередню операцію тільки якщо введено нове число
        if (currentOperator !== null && !shouldResetScreen && currentInput !== '-') {
            currentInput = calculateResult(previousInput, currentOperator, currentInput);
        }
        
        previousInput = currentInput;
        currentOperator = val;
        shouldResetScreen = true;
    }

    if (action === 'calculate') {
        if (currentOperator === null || shouldResetScreen) return;
        currentInput = calculateResult(previousInput, currentOperator, currentInput);
        currentOperator = null;
        shouldResetScreen = true;
    }

    if (action === 'clear') {
        currentInput = '0';
        previousInput = null;
        currentOperator = null;
    }

    display.innerText = currentInput;
});

// Додаємо статус оточення на екран (НАД калькулятором)
const statusDiv = document.createElement('div');
statusDiv.style.textAlign = 'center';
statusDiv.style.marginBottom = '15px'; // Змінили відступ на нижній
statusDiv.style.color = '#666';
statusDiv.style.fontSize = '12px';
statusDiv.style.position = 'absolute'; // Щоб він не ламав Flexbox-центрування body
statusDiv.style.top = '20px';          // Відступ від верхнього краю екрана
// Vite надає доступ до змінних через import.meta.env
statusDiv.innerText = `Режим: ${import.meta.env.VITE_APP_STATUS}`;
// Додаємо елемент на самий початок body
document.body.prepend(statusDiv);