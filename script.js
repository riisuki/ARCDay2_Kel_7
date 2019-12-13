// -- variables:
var display = document.getElementById('display'),
	inputs = document.getElementsByClassName('inputs'),
	operators = document.getElementsByClassName('operators'),
	equal = document.getElementById('equal'),
	clear = document.getElementById('clear'),
	backspace = document.getElementById('backspace'),
	currentInputValue,
	currentOperator,
	displayValue,
	result,
	backspaceValue,
	i,
	io;
var operate = false;
var dot = true;
just = false;

// -- functions:
/* Creating function in HTML for backspace operation */ 
// sini
function backspace(calc) {                                              
		size = calc.display.value.length; 
		calc.display.value = calc.display.value.substring(0, size-1);
    }
          
/* Creating function to calculate factorial of element */ 
function calculate(calc) { 
     /* Check if function include ! character then 
	calculate factorial of number */ 
	if(calc.display.value.includes("!")) {             
		size = calc.display.value.length; 
		n = Number(calc.display.value.substring(0, size-1)); 
		f = 1;       
		for(i = 2; i <= n; i++){
			f = f*i;
		}
		calc.display.value = f; 
	} 
	/* If function include % character then calculate 
	the % of number */ 
	else if(calc.display.value.includes("%")) {               
		size = calc.display.value.length; 
		n = Number(calc.display.value.substring(0, size-1)); 
		calc.display.value = n/100; 
		} else {    
		/* Otherwise evalute and execute output */ 
		calc.display.value = eval(calc.display.value); 
		}
}
// sini end


// -- functions:
// for data(numberic values) input
function dataInput() {
	currentInputValue = this.value;
	display.value += currentInputValue;
	operate = true;
	just = false;
}

// for operator(+-*/) input
function operatorInput() {
	if (operate == true && just == false){
		currentOperator = this.value;
		display.value += currentOperator;
	}
	operate = false;
	dot = true;
	just = false;
}

// for displaying the calculated result
function displayResult() {
	if (display.value === "") {
		display.value = "";
	} else {
		result = eval(display.value);
		display.value = result;
	}
	dot = true;
	calculate();
}


// for deleting(backspace) single value
function deleteSingle() {
	backspaceValue = display.value;
	display.value = backspaceValue.substr(0, backspaceValue.length - 1);
	if(operate==false){
		operate=true;
	}
	if(just == true){
		dot = true;
		just = false;
	}
}

// for clearing input field
function clearAll() {
	display.value = "";
	operator = false;
	dot = true;
	just = false;
}

// for blocking alphabets into input field and helping calculation through keyboard keys
function keyboardInput(key) {
	if ((key.which < 0 || key.which > 57) && (key.which !== 13 && key.which !== 99 && key.which !== 61)) {
		return false;
	} else {
		key.preventDefault();
		if ((key.which >= 48) && (key.which<=57)){
			operate = true
		}
		if (key.which === 48) {
			display.value += "0";
		} else if (key.which === 49) {
			display.value += "1";
		} else if (key.which === 50) {
			display.value += "2";
		} else if (key.which === 51) {
			display.value += "3";
		} else if (key.which === 52) {
			display.value += "4";
		} else if (key.which === 53) {
			display.value += "5";
		} else if (key.which === 54) {
			display.value += "6";
		} else if (key.which === 55) {
			display.value += "7";
		} else if (key.which === 56) {
			display.value += "8";
		} else if (key.which === 57) {
			display.value += "9";
		} else if (key.which === 46) {
			if (dot==true){
				display.value += ".";
				operate = false;
				dot = false;
				just = true;
			}
		} else if (key.which === 40) {
			display.value += "(";
		} else if (key.which === 41) {
			display.value += ")";
		} else if (key.which === 42) {
			if (operate==true){
				display.value += "*";
				operate = false;
				dot = true;
			}
		} else if (key.which === 47) {
			if (operate==true){
				display.value += "/";
				operate = false;
				dot = true;
			}
		} else if (key.which === 43) {
			if (operate==true){
				display.value += "+";
				operate = false;
				dot =true;
			}
		} else if (key.which === 45) {
			if (operate==true){
				display.value += "-";
				operate = false;
				dot = true;
			}
		} else if ((key.which === 13) || (key.which === 61)) {
			displayResult();
			dot = true;
		} else if (key.which === 99) {
			clearAll();
		} else {
			display.value = display.value;
		}
		return true;
	}
}

// for deleting value using backspace
function backspaceKeyEvent (event) {
	if (event.which === 8) {
		if(just = true){
			dot = true;
		}
		deleteSingle();
	}
}

// -- code execution:
window.onload = function () {
	// -- function calling and stuff:
	// for blocking alphabets into input field and helping calculation through keyboard keys
	document.onkeypress = keyboardInput;
		// for deleting value using backspace
	document.onkeydown = backspaceKeyEvent;

	// for data(numberic values) input
	for (i = 0; i < inputs.length; i++) {
		inputs[i].onclick = dataInput;
	}

	// for operator(+-*/) input
	for (io = 0; io < operators.length; io++) {
		operators[io].onclick = operatorInput;
	}

	// for displaying the calculated result
	equal.onclick = displayResult;

	// for deleting(backspace) single value
	backspace.onclick = deleteSingle;

	// for clearing input field
	clear.onclick = clearAll;
};