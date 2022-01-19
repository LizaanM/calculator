"use strict";

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function power(a, b) {
  return a ** b;
}

function squareRoot(num) {
  return num ** 0.5;
}

function percent(a, b) {
  return (a / b) * 100;
}

function operate(operator, num1, num2) {
  const operations = {
    "+": add,
    "-": subtract,
    "*": multiply,
    "/": divide,
    "**": power,
    "sqrt": squareRoot,
    "%": percent,
  };
  const operation = operations[operator];
  if (operator === "sqrt") return operation(num1);
  return operation(num1, num2);
}

function showOutput(event) {
  output.textContent += event.target.innerText;
}

function buildExpression(event) {
  const operator = event.target.innerText;
  expression.push(Number(output.textContent));
  expression.push(operator);
  clearOutput();
}

function evaluateExpression() {
  if (output.textContent) expression.push(Number(output.textContent));
  clearOutput();
  console.log(expression);
}

function backSpace() {
  const text = output.textContent;
  output.textContent = text.slice(0, -1);
}

function clearOutput() {
  output.textContent = "";
}

const expression = [];
const output = document.querySelector(".output");

const operandButtons = document.querySelectorAll(".operand-btn");
operandButtons.forEach((btn) => btn.addEventListener("click", showOutput));

const operatorButtons = document.querySelectorAll(".operator-btn");
operatorButtons.forEach((btn) =>
  btn.addEventListener("click", buildExpression)
);

const evaluateButtons = document.querySelectorAll(".evaluate-btn");
evaluateButtons.forEach((btn) =>
  btn.addEventListener("click", evaluateExpression)
);

const backButton = document.querySelector("#button-back");
backButton.addEventListener("click", backSpace);

const clearButtton = document.querySelector("#button-clear");
clearButtton.addEventListener("click", clearOutput);
