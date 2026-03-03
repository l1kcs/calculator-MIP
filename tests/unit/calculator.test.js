import { describe, it, expect } from 'vitest';
import { calculateResult } from '../../src/calculator.js';

describe('Калькулятор Бізнес-Логіка', () => {
    it('коректно додає два числа', () => {
        expect(calculateResult('5', '+', '3')).toBe('8');
    });

    it('коректно віднімає два числа', () => {
        expect(calculateResult('10', '-', '4')).toBe('6');
    });

    it('коректно множить два числа', () => {
        expect(calculateResult('7', '*', '6')).toBe('42');
    });

    it('коректно ділить два числа', () => {
        expect(calculateResult('20', '/', '5')).toBe('4');
    });

    it('повертає "Помилка" при діленні на нуль', () => {
        expect(calculateResult('10', '/', '0')).toBe('Помилка');
    });

    it('обробляє дробові числа', () => {
        expect(calculateResult('5.5', '+', '2.2')).toBe('7.7');
    });

    it('повертає "Помилка" для некоректних вхідних даних', () => {
        expect(calculateResult('abc', '+', '5')).toBe('Помилка');
    });
});