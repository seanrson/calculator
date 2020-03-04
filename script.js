function add(a,b) {return a+b;}

function subtract(a,b) {return a-b;}

function multiply(a,b) {return a*b;}

function divide(a,b) {return a/b;}

function exponent(a,b) {return a**b;}

function operate(operator,a,b) // perform chosen operation
{
    return operator(a,b);
}

function displayDigit(e) // print and save digit for calculation
{
    if (calcJustRan) // result of previous calculation is first arg, need operator before digit
        return;
    if (needsOperator) // no operator yet: set first arg
    {
        if (a.includes(".") && e.target.textContent == ".") // only allow one decimal point
            return;
        a = `${a}${e.target.textContent}`;
        displayText = `${a}`;
        display.textContent = displayText;
        needsFirstArg = false;
    }
    else // set second arg
    {
        if (b.includes(".") && e.target.textContent == ".") // only allow one decimal point
            return;
        b = `${b}${e.target.textContent}`;
        displayText = `${a} ${operator} ${b}`
        display.textContent = displayText;
        needsSecondArg = false;
    }
}

function displayOperator(e) // print and save operator for calculation
{
    if (needsFirstArg) // need first arg: don't allow operator
        return; 
    else if (!needsOperator && needsSecondArg) // don't need operator, need second arg: don't allow multiple operators
        return;
    else // don't need operator, first arg, or second arg: run previous calculation
        compute(e);
    operator = e.target.textContent;
    displayText = `${a} ${operator}`
    display.textContent = displayText;
    needsOperator = false;
    calcJustRan = false;
}

function backspace() // perform backspace on an input
{
    let aLen = a.length;
    let bLen = b.length;
    let displayLen = displayText.length;
    let lastChar = displayText[displayLen-1];
    if (needsFirstArg || calcJustRan) // can't modify: either no first arg, or output displayed
    {
        return;
    }
    else if (!needsFirstArg && needsOperator) // no operator yet: modify first arg
    {
        if (a != "")
        {
            console.log("modifying a");
            a = a.substr(0,aLen-1);
            console.log(a);
            if (displayLen == 1)
                displayText = "";
            else if (lastChar == " ")
                displayText = displayText.substr(0,displayLen-2);
            else
                displayText = displayText.substr(0,displayLen-1);
            display.textContent = displayText;
            if (a == "") // check if arg totally deleted
                needsFirstArg = true;
        }
    }
    else if (needsSecondArg) // no second arg yet: modify operator
    {
        console.log("modifying op");
        operator = "";
        if (lastChar == " ")
            displayText = displayText.substr(0,displayLen-2);
        else
            displayText = displayText.substr(0,displayLen-1);
        display.textContent = displayText;
        needsOperator = true;
    }
    else // modify second arg
    {
        if (b != "")
        {
            console.log("modifying b");
            b = b.substr(0,bLen-1);
            console.log(b);
            if (displayLen == 1)
                displayText = "";
            else if (lastChar == " ")
                displayText = displayText.substr(0,displayLen-2);
            else
                displayText = displayText.substr(0,displayLen-1);
            display.textContent = displayText;
            if (b == "") // check if arg totally deleted
                needsSecondArg = true;
        }
    }
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
   calcJustRan = false;
}

function roundToSigFig(myFloat) // round to significant figures
{   if (myFloat.includes(".")) // has decimals
    {
        let splitText = myFloat.split(".") 
        let sigFig = -1;
        let decimals = splitText[1];
        for (let i=0; i<decimals.length; i++)
        {
            if (decimals[i] != "0")
                sigFig = i;
        }
        if (sigFig != -1) // found a sig fig, round
            return `${splitText[0]}.${decimals.substring(0,sigFig+1)}`;
        else // didn't find a sig fig, round
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
    calcJustRan = true;
}

function compute(e) // print result, prepare for next calculation
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
            output = operate(divide, floatA, floatB);
            break;
        }
        case "^": output = operate(exponent, floatA, floatB); break;
    }
    output = output.toFixed(8); // round to 8 decimals
    displayText = `${output}`;
    displayText = roundToSigFig(displayText); // round to significant figures
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
var calcJustRan = false;
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

const back = document.querySelector("#back");
back.addEventListener("click", backspace)
//