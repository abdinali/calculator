const calcDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

const sendNumberValue = (number) => {
    if (awaitingNextValue) {
        calcDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
        // Concat numbers
        displayValue = calcDisplay.textContent;
        if (displayValue === '0') {
            calcDisplay.textContent = number;
        } else {
            calcDisplay.textContent = displayValue + number;
        }
    }
}

const addDecimal = () => {
    // If operator is selected, don't add a decimal
    if (awaitingNextValue) return;
    // Add a decimal only if it doesn't already appear in display 
    if (!calcDisplay.textContent.includes('.')) {
        calcDisplay.textContent = `${calcDisplay.textContent}.`;
    }
}
// Calculate first and current value, based on the operator
const calculate = {
    '/': (firstNum, secondNum) => firstNum / secondNum,
    '*': (firstNum, secondNum) => firstNum * secondNum,
    '+': (firstNum, secondNum) => firstNum + secondNum,
    '-': (firstNum, secondNum) => firstNum - secondNum,
    '=': (firstNum, secondNum) => secondNum,

}

const useOperator = (operator) => {
    const currentValue = Number(calcDisplay.textContent);

    // Prevent multiple operators
    if (operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    }
    if (!firstValue) {
        firstValue = calcDisplay.textContent;
    } else {
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calcDisplay.textContent = calculation;
        firstValue = calculation; // reuseability
    }
    operatorValue = operator;
    awaitingNextValue = true;
}

// Event Listeners for all the buttons
inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length == 0) { 
        // numbers
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    } else if (inputBtn.classList.contains('operator')) {
        // operators (+, -, *, /)
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    } else if (inputBtn.classList.contains('decimal')) {
        // decimal (.)
        inputBtn.addEventListener('click', addDecimal);
    }
})

// Reset the display (and all values)
const resetDisplay = () => {
    calcDisplay.textContent = '0';

    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
}

clearBtn.addEventListener('click', resetDisplay);