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
    if (needsOperator) // no operator yet: set first arg
    {
        a = `${a}${e.target.textContent}`;
        displayText = `${a}`;
        display.textContent = displayText;
        needsFirstArg = false;
    }
    else // set second arg
    {
        b = `${b}${e.target.textContent}`;
        displayText = `${displayText} ${b}`
        display.textContent = displayText;
        needsSecondArg = false;
    }
}

function displayOperator(e)
{
    if (needsFirstArg) // need first arg: don't allow operator
        return; 
    else if (!needsOperator && needsSecondArg) // don't need operator, but need second arg: don't allow multiple operators
        return;
    else // don't need operator, first arg, or second arg: display previous calculation
        compute(e);
    operator = e.target.textContent;
    displayText = `${displayText} ${operator}`
    display.textContent = displayText;
    needsOperator = false;
}

function clearDisplay() // wipe data
{
   displayText = "";
   display.textContent = displayText;
   a = "";
   b = "";
   operator = "";
   output = "";
   needsFirstArg = true;
   needsSecondArg = true;
   needsOperator = true;
}

function truncateDecimals(myFloat)
{   if (myFloat.includes(".")) // truncate unnecessary decimals
    {
        let splitText = myFloat.split(".") 
        let sigFig = -1;
        let decimals = splitText[1];
        for (let i=0; i<decimals.length; i++)
        {
            if (decimals[i] != "0")
                sigFig = i;
        }
        if (sigFig != -1) // found a sig fig, truncate accordingly
            return `${splitText[0]}.${decimals.substring(0,sigFig+1)}`;
        else // didn't find a sig fig, eliminate decimals
            return `${splitText[0]}`;
    }
    else // no decimals
        return myFloat;
}

function prepNextCalc() // prepare for next calculation
{
    a = displayText; // set result as first arg
    b = ""; // reset second arg
    operator = ""; // reset operator
    needsSecondArg = true;
    needsOperator = true;
}

function compute(e)
{
    if (needsFirstArg || needsOperator|| needsSecondArg) // need all arguments
        return;
    let floatA = parseFloat(a); // a, b are strings
    let floatB = parseFloat(b);
    switch (operator) // which calculation?
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
                needsSecondArg = true;
                needsOperator = true;
                displayText = `${a}`;
                display.textContent = displayText;
                return;
            }
            output = operate(divide, floatA, floatB).toFixed(8); // round
            break;
        }
    }
    displayText = `${output}`;
    displayText = truncateDecimals(displayText); // remove unnecessary decimals
    display.textContent = displayText;
    prepNextCalc(); // prepare for next calculation
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
digits.forEach(digit => digit.addEventListener("click", displayDigit));
// digits.forEach(digit => digit.addEventListener("keydown", displayDigit));

const operators = Array.from(document.querySelectorAll(".operator"));
operators.forEach(operator => operator.addEventListener("click", displayOperator));
// operators.forEach(digit => operator.addEventListener("keydown", displayOperator));

const equals = document.querySelector("#equals");
equals.addEventListener("click", compute);

const clear = document.querySelector("#clear");
clear.addEventListener("click", clearDisplay);
//