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

function operate (operator,a,b) {
    return operator(a,b);
}

function displayDigit(e)
{
    if (needsFirstArg || needsOperator) // set first argument
    {
        a = `${a}${e.target.textContent}`;
        displayText = `${a}`;
        display.textContent = displayText;
        needsFirstArg = false;
    }
    else // set second argument
    {
        b = `${b}${e.target.textContent}`;
        displayText = `${displayText} ${b}`
        display.textContent = displayText;
        needsSecondArg = false;
    }
}

function displayOperator(e)
{
    if (needsFirstArg) // need first argument before operator
        return; 
    operator = e.target.textContent;
    displayText = `${displayText} ${operator}`
    display.textContent = displayText;
    needsOperator = false;
}

function clearDisplay()
{
   displayText = ""; // reset everything
   display.textContent = displayText;
   a = "";
   b = "";
   operator = "";
   output = "";
   needsFirstArg = true;
   needsSecondArg = true;
   needsOperator = true;
}

function compute(e)
{
    if (needsFirstArg || needsOperator|| needsSecondArg) // need all arguments
        return;
    let floatA = parseFloat(a); // a, b are strings
    let floatB = parseFloat(b);
    switch (operator) // set operation
    {
        case "+": output = operate(add, floatA, floatB); break;
        case "-": output = operate(subtract, floatA, floatB); break;
        case "x": output = operate(multiply, floatA, floatB); break;
        case "/": 
        {   
            if (floatB == 0) // prevent crash
            {
                alert("Division by zero not allowed!")
                b = "";
                displayText = `${a}`;
                display.textContent = displayText;
                return;
            }
            output = operate(divide, floatA, floatB).toFixed(8); // round
            break;
        }
    }
    displayText = `${output}`;
    display.textContent = displayText;
    a = displayText; // set result as first argument for next calculation
    b = ""; // reset second argument
    operator = ""; // reset operator
    needsSecondArg = true;
    needsOperator = true;
}

// initial values
let displayText = "";
var a = "";
var b = "";
var operator = "";
var output = "";
var needsFirstArg = true;
var needsSecondArg = true;
var needsOperator = true;
//

// references and event listeners
const display = document.querySelector(".display");

const digits = Array.from(document.querySelectorAll(".digit"));
digits.forEach(digit => digit.addEventListener("click", displayDigit))

const operators = Array.from(document.querySelectorAll(".operator"));
operators.forEach(operator => operator.addEventListener("click", displayOperator))

const equals = document.querySelector("#equals");
equals.addEventListener("click", compute);

const clear = document.querySelector("#clear");
clear.addEventListener("click", clearDisplay);
//