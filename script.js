function add (a,b) {
	return a+b;
}

function subtract (a, b) {
	return a-b;
}

function multiply (a,b) {
    return a*b;
}

function divide (a,b) {
    return a/b;
}

function operate (fx,a,b) {
    return `${fx}(a,b)`;
}

function displayDigit(e)
{
    if (firstValEmpty)
    {
        a = parseInt(e.target.textContent);
        console.log(a);
        displayText = `${displayText} ${a}`
        display.textContent = displayText;
    }
    else
    {
        b = parseInt(e.target.textContent);
        console.log(b);
        displayText = `${displayText} ${b}`
        display.textContent = displayText;
    }
}

function displayOperator(e)
{
    if (firstValEmpty) // prevent operator from being entered before first value
        return;
    operator = e.target.textContent;
    displayText = `${displayText} ${operator}`
    display.textContent = displayText;
    operatorEmpty = false;
}

function clearDisplay()
{
   displayText = "";
   display.textContent = displayText;
   firstValEmpty = true;
   secondValEmpty = true;
   operatorEmpty = true;
}

function compute(e)
{
    if (firstValEmpty || operatorEmpty|| secondValEmpty) // can only compute once all values added
        return;
    let fx = e.target.id;
    output = operate(fx, a, b);
    clearDisplay();
    displayText = `${output}`;
}

const display = document.querySelector(".display");
let displayText = "";
var a, b = "";
var fx, output;
var firstValEmpty = true;
var secondValEmpty = true;
var operatorEmpty = true;
const digits = Array.from(document.querySelectorAll(".digit"));
digits.forEach(digit => digit.addEventListener("click", displayDigit))
const operators = Array.from(document.querySelectorAll(".operator"));
operators.forEach(operator => operator.addEventListener("click", displayOperator))
const equals = document.querySelector("#equals");
equals.addEventListener("click", compute);
const clear = document.querySelector("#clear");
clear.addEventListener("click", clearDisplay);