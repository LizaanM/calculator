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

function calculate(operator, num1, num2) {
  //do one of the above operations depending on operator
  const operations = {
    "ₓ²": power,
    "×": multiply,
    "÷": divide,
    "+": add,
    "-": subtract,
    "√": squareRoot,
    "%": percent,
  };
  const operation = operations[operator];
  if (operator === "√") return operation(num1);
  return operation(num1, num2);
}

function clearOutput() {
  output.textContent = "";
}

function buildExpression(event) {
  //build expression to evaluate from user input
  if (output.textContent) {
    const operator = event.target.textContent;
    expression.push(Number(output.textContent));
    expression.push(operator);
    clearOutput();
  }
}

function showOutput(event) {
  if (output.textContent.length < 20) {
    output.textContent += event.target.textContent;
  }
}

function validateAnswer(answer, input) {
  if (isNaN(answer)) answer = `Invalid input...${input.join(" ").slice(-5)}`;
  return answer === Infinity ? "Can't divide by zero..." : answer;
}

function outputValid() {
  return output.textContent && output.textContent !== "-";
}

function doOperationsInOrder(expression) {
  //calculate expression in correct mathematical order
  const order = ["ₓ²", "÷", "×", "-", "+"];
  const input = [...expression];

  for (let operator of order) {
    while (expression.includes(operator)) {
      const index = expression.findIndex((item) => item === operator);
      const [num1, op, num2] = expression.splice(index - 1, 3);
      const result = calculate(op, num1, num2);
      expression.splice(index - 1, 0, result);
    }
  }
  const answer = expression.pop();
  return validateAnswer(answer, input);
}

function evaluateExpression() {
  //pass input to doOperationsInorder() and display answer
  if (outputValid()) expression.push(Number(output.textContent));
  const answer = doOperationsInOrder(expression);
  output.textContent = answer;
}

function backSpace() {
  //delete last character
  const text = output.textContent;
  output.textContent = text.slice(0, -1);
}

function clearExpression() {
  expression.splice(0);
}

function getSqrt(event) {
  buildExpression(event);
  const [num, operator] = expression;
  output.textContent = calculate(operator, num);
  clearExpression();
}

function getPercentage() {
  if (outputValid()) expression.push(Number(output.textContent));
  const [num1, operator, num2] = expression;
  let answer = null;

  switch (operator) {
    case "÷":
      answer = calculate("%", num1, num2);
      break;
    case "+":
      answer = num1 + (num1 / 100) * num2;
      break;
    case "-":
      answer = num1 - (num1 / 100) * num2;
      break;
    case "×":
      answer = (num1 * num2) / 100;
  }

  output.textContent = validateAnswer(answer);
  clearExpression();
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

const plusMinusButton = document.querySelector("#button-plus-minus");
plusMinusButton.addEventListener("click", () => {
  if (!output.textContent.startsWith("-")) {
    output.textContent = "-" + output.textContent;
  }
});

const sqrtButton = document.querySelector("#button-sqrt");
sqrtButton.addEventListener("click", getSqrt);

const percentButton = document.querySelector("#button-percent");
percentButton.addEventListener("click", getPercentage);
