const calcDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

const sendNumberValue = (number) => {
    // Concat numbers
    displayValue = calcDisplay.textContent;
    if (displayValue === '0') {
        calcDisplay.textContent = number;
    } else {
        calcDisplay.textContent = displayValue + number;
    }
}

// Event Listeners for all the buttons
inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length == 0) { 
        // numbers
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    } else if (inputBtn.classList.contains('operator')) {
        // operators (+, -, *, /)
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    } else if (inputBtn.classList.contains('decimal')) {
        // decimal (.)
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    }
})