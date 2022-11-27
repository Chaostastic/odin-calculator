const display = document.querySelector(".display");
const numberButtons = document.querySelectorAll(".number.button");
const operatorButtons = document.querySelectorAll(".operator.button");
const evaluateButton = document.querySelector(".evaluate.button");

function click(event) {
    display.textContent += event.target.textContent
}

numberButtons.forEach((btn) => btn.addEventListener("click", click))
operatorButtons.forEach((btn) => btn.addEventListener("click", click))