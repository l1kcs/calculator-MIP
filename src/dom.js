import { calculateResult } from './calculator.js';

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