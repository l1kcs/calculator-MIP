export function calculateResult(a, operator, b) {
    const numA = parseFloat(a);
    const numB = parseFloat(b);

    if (isNaN(numA) || isNaN(numB)) return 'Помилка';

    switch (operator) {
        case '+': return (numA + numB).toString();
        case '-': return (numA - numB).toString();
        case '*': return (numA * numB).toString();
        case '/':
            if (numB === 0) return 'Помилка'; 
            return (numA / numB).toString();
        default:
            return 'Помилка';
    }
}