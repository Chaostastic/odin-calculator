const equationDisplay = document.querySelector(".display .equation");
const answerDisplay = document.querySelector(".display .answer");
const numberButtons = document.querySelectorAll(".number.button");
const operatorButtons = document.querySelectorAll(".operator.button");
const evaluateButton = document.querySelector(".evaluate.button");

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
    };
    if (isNaN(operand2)) {
        operand2 = evaluate(operand2);
        if (operand2 === null) return "Syntax error";
    };
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
    for (let i of operators) {
        if (equation.includes(i)) {
            return calculate(...separate(equation, i), i);
        };
    };
    return null;
}

function click(event) {
    if (equationDisplay.textContent === "0") {
        equationDisplay.textContent = "";
    };
    equationDisplay.textContent += event.target.textContent;
}

function operate() {
    answerDisplay.textContent = evaluate(equationDisplay.textContent);
}

numberButtons.forEach((btn) => btn.addEventListener("click", click));
operatorButtons.forEach((btn) => btn.addEventListener("click", click));
evaluateButton.addEventListener("click", operate);