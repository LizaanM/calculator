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
