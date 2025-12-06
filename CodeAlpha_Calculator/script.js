// Select the calculator screen element
const calculatorScreen = document.querySelector('.calculator-screen');


// Initialize variables to store calculation state
let calculation = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};


// Function to update the display
function updateDisplay() {
    calculatorScreen.value = calculation.displayValue;
}


// Handle number button clicks
function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculation;


    if (waitingForSecondOperand === true) {
        calculation.displayValue = digit;
        calculation.waitingForSecondOperand = false;
    } else {
        // Overwrite '0' if it's the only thing on the screen, otherwise append the digit
        calculation.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
    updateDisplay();
}


// Handle decimal point input
function inputDecimal(dot) {
    // Prevent adding multiple decimals
    if (!calculation.displayValue.includes(dot)) {
        calculation.displayValue += dot;
    }
    updateDisplay();
}


// Handle operator button clicks (+, -, *, /)
function handleOperator(nextOperator) {
    const inputValue = parseFloat(calculation.displayValue);


    if (calculation.operator && calculation.waitingForSecondOperand) {
        calculation.operator = nextOperator;
        return;
    }


    if (calculation.firstOperand === null) {
        calculation.firstOperand = inputValue;
    } else if (calculation.operator) {
        const result = operate(calculation.firstOperand, inputValue, calculation.operator);
        calculation.displayValue = `${parseFloat(result.toFixed(7))}`; // Limit precision
        calculation.firstOperand = result;
    }


    calculation.waitingForSecondOperand = true;
    calculation.operator = nextOperator;
    updateDisplay();
}


// Perform the calculation based on the operator
function operate(n1, n2, operator) {
    if (operator === '+') return n1 + n2;
    if (operator === '-') return n1 - n2;
    if (operator === '*') return n1 * n2;
    if (operator === '/') return n1 / n2;
    return n2;
}


// Clear the calculator state (C button acts as All Clear)
function clearCalculator() {
    calculation.firstOperand = null;
    calculation.operator = null;
    calculation.waitingForSecondOperand = false;
    calculation.displayValue = '0';
    updateDisplay();
}




// Event listener for all buttons
const keys = document.querySelector('.calculator-buttons');
keys.addEventListener('click', (event) => {
    const { target } = event;
    const { value } = target;


    // Check if the clicked element is a button, otherwise ignore
    if (!target.matches('button')) {
        return;
    }


    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
            break;
        case '.':
            inputDecimal(value);
            break;
        case 'C':
            clearCalculator();
            break;
        default:
            // Handle number input
            if (Number.isInteger(parseFloat(value))) {
                inputDigit(value);
            }
    }
});


// Initialize display on load
updateDisplay();



