const equationDisplay = document.querySelector(".display .equation");
const answerDisplay = document.querySelector(".display .answer");
const numberButtons = document.querySelectorAll(".number.button");
const operatorButtons = document.querySelectorAll(".operator.button");
const evaluateButton = document.querySelector(".evaluate.button");
const clearButton = document.querySelector(".clear.button");
const deleteButton = document.querySelector(".delete.button");

const operations = {
    "+": (operand1, operand2) => +operand1 + +operand2,
    "-": (operand1, operand2) => +operand1 - +operand2,
    "*": (operand1, operand2) => +operand1 * +operand2,
    "/": (operand1, operand2) => +operand1 / +operand2,
}

function calculate(operand1, operand2, operator) {
    if (isNaN(operand1)) {
        operand1 = evaluate(operand1);
        if (operand1 === null) return "Syntax error";
    }
    if (isNaN(operand2)) {
        operand2 = evaluate(operand2);
        if (operand2 === null) return "Syntax error";
    }
    return operations[operator](operand1, operand2);
}

function separate(equation, operator) {
    const operatorIndex = equation.lastIndexOf(operator);
    const operand1 = equation.slice(0, operatorIndex);
    const operand2 = equation.slice(operatorIndex + 1);
    return [operand1, operand2];
}

function evaluate(equation) {
    const operators = ["+", "-", "*", "/"];
    for (let operator of operators) {
        if (equation.includes(operator)) {
            return calculate(...separate(equation, operator), operator);
        }
    }
    return null;
}

function buttonClick(event) {
    if (equationDisplay.textContent === "0") {
        equationDisplay.textContent = "";
    }
    equationDisplay.textContent += event.target.textContent;
}

function operate() {
    const answer = evaluate(equationDisplay.textContent);
    if (answer === Infinity) {
        answerDisplay.textContent = "Uh oh";
    } else {
        answerDisplay.textContent = "=" + answer;
    }
}

function clearDisplay() {
    equationDisplay.textContent = "0";
    answerDisplay.textContent = "=";
}

function backSpace() {
    equationDisplay.textContent = equationDisplay.textContent.slice(0, -1);
    if (equationDisplay.textContent === "") equationDisplay.textContent = "0";
}

numberButtons.forEach((btn) => btn.addEventListener("click", buttonClick));
operatorButtons.forEach((btn) => btn.addEventListener("click", buttonClick));
clearButton.addEventListener("click", clearDisplay);
evaluateButton.addEventListener("click", operate);
deleteButton.addEventListener("click", backSpace);