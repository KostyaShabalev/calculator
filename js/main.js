

class Calculator {
	constructor() {
		this.buttonList = null;
		this.display = '';
		this.evaluator = {
			currValue: 0,
			lastExpressionType: '',
			lastOperator: '',
			result: 0
		};
		this.memory = 0;
		this.flags = {
			flagReset: false,
			firstEval: false
		};
		this.buttonFunctions = {
			digits: null,
			functions: null,
			memory: null,
			operators: null
		}
	}

	digActions(evt) {
		addToDisplay(evt);
	}

	funActions(evt) {
		executeFunction(evt);
	}

	memActions(evt) {
		memoryActions(evt);
	}

	operActions(evt) {
		addToDisplay(evt);
	}

}

const OPERATOR_ACTIONS = {
	'+': (firstComp, secondComp) => { return +firstComp + +secondComp },
	'-': (firstComp, secondComp) => { return +firstComp - +secondComp },
	'/': (firstComp, secondComp) => { return +firstComp / +secondComp },
	'*': (firstComp, secondComp) => { return +firstComp * +secondComp }
};

const FUNCTION_ACTIONS = {
	'00-0': (evt) => { tenTimesDecreasing(evt); },
	'+/-': (evt) => { changeSign(evt); },
	'AC': (evt) => { clearAll(); },
	'C': (evt) => { superficialClear(); },
	'00': (evt) => { hundredRising(evt); },
	'sqrt': (evt) => { squareRoot(evt); },
	'x^y': (evt) => { exponentiation(evt); },
	'%': (evt) => { percentage(evt); }
};

const MEMORY_ACTIONS = {
	'MC': () => { calculator.memory = null; },
	'MR': () => { readMemory(); },
	'M+': (evt) => { addToMemoryValue(evt, 1); },
	'M-': (evt) => { addToMemoryValue(evt, -1); },
};

var calculator = new Calculator();

calcInit();


// FUNCTIONS

function calcInit() {
	//
	displayUpdate();

	setButtonActions();
}

function memoryActions(evt) {
	//

	for (key in MEMORY_ACTIONS) {
		if (evt.target.innerHTML === key) {
			MEMORY_ACTIONS[key](evt);
		}
	}
}

function readMemory() {
	//

	let isAfterDigit = calculator.evaluator.lastExpressionType === 'digit';

	console.log(calculator.memory);

	if (isAfterDigit) {
		if (calculator.flags.firstEval) {
			calculator.display = calculator.currValue = calculator.memory;
			calculator.flags.firstEval = false;
		} else {
			calculator.display = calculator.currValue = calculator.memory;
		}
		
	} else {
		calculator.display = calculator.display + calculator.memory;
		calculator.evaluator.currValue = parseInt(calculator.display);
	}

	console.log(calculator.memory);

	displayUpdate();
}

function addToMemoryValue(evt, coeff) {
	//

	let isAfterDigit = calculator.evaluator.lastExpressionType === 'digit';

	if (isAfterDigit) {
		if (calculator.flags.firstEval) {
			calculator.display = calculator.evaluator.currValue = evalSimpleExpression(evt);
			calculator.flags.firstEval = false;
			calculator.flags.flagReset = true;
			calculator.memory = calculator.memory + calculator.evaluator.currValue * coeff;
			calculator.display = calculator.evaluator.currValue = calculator.memory;
		} else {
			if (+calculator.display < 0) {
				calculator.memory = calculator.memory + +calculator.display * (-coeff);
				
			} else {
				calculator.memory = calculator.memory + +calculator.display * coeff;
			}
			calculator.display = calculator.evaluator.currValue = calculator.memory;
			calculator.flags.flagReset = true;
		}
	}
	

	displayUpdate();

}

function setButtonActions() {
	calculator.buttonList = getElement('.button');
	addButtonFunc(calculator.buttonList, calculator.buttonFunctions);
}

function clearAll() {
	//

	newCalc = new Calculator();

	for (key in calculator) {
		calculator[key] = newCalc[key];
	}

	displayUpdate();
}

function superficialClear() {
	//

	calculator.display = '';
	calculator.evaluator.currValue = 0;
	calculator.evaluator.lastExpressionType = '';
	calculator.evaluator.lastOperator = '';
	calculator.evaluator.result = 0;
	calculator.flags.flagReset = false;
	calculator.flags.firstEval = false;

	displayUpdate();
}

function tenTimesDecreasing(evt) {
	//

	if (calculator.flags.firstEval) {
		calculator.display = calculator.evaluator.currValue = (evalSimpleExpression(evt) / 10);
		calculator.flags.firstEval = false;
	} else {
		calculator.display = calculator.evaluator.currValue = calculator.evaluator.currValue / 10;
	}

	
	displayUpdate();
}

function changeSign(evt) {
	//

	if (calculator.flags.firstEval) {
		calculator.display = calculator.evaluator.currValue = -evalSimpleExpression(evt);
		calculator.flags.firstEval = false;
	} else {
		calculator.display = calculator.evaluator.currValue = -calculator.evaluator.currValue;
	}

	displayUpdate();
}

function hundredRising(evt) {
	//

	if (calculator.flags.firstEval) {
		calculator.display = calculator.evaluator.currValue = (evalSimpleExpression(evt) * 100);
		calculator.flags.firstEval = false;
	} else {
		if (calculator.evaluator.currValue < 0) { calculator.evaluator.currValue = -calculator.evaluator.currValue; }
		calculator.display = calculator.evaluator.currValue = calculator.evaluator.currValue * 100;
	}

	displayUpdate();
}

function squareRoot(evt) {
	//

	if (calculator.flags.firstEval) {
		calculator.display = calculator.evaluator.currValue = (Math.sqrt(calculator.evaluator.currValue));
		calculator.flags.firstEval = false;
	} else {
		calculator.display = calculator.evaluator.currValue = Math.sqrt(calculator.evaluator.currValue);
	}

	displayUpdate();
}

function exponentiation(evt) {
	//

	let isAfterOperator = calculator.evaluator.lastExpressionType === 'operator';
	let isAfterDigit = calculator.evaluator.lastExpressionType === 'digit';

	if (isAfterDigit) {
		calculator.display = calculator.display + '^';
	} else {
		calculator.display = calculator.display.substring(0, calculator.display.length - 1) + '^';
	}

	displayUpdate();



// let answer = null;

// 	let components = [];

// 	for (key in OPERATOR_ACTIONS) {
// 		components = calculator.display.split(key);
// 		if (components.length > 1) {
// 			answer = OPERATOR_ACTIONS[key](components[0], components[1]);
// 		}
// 	}

// 	return answer;




}



function addButtonFunc(buttonList, buttonFunctions) {
	//
	[].forEach.call(buttonList, (currButton) => {
		currButton.addEventListener('click', (evt) => {
			addFunction(evt, buttonFunctions);
		});
	});
}

function addFunction(evt, buttonFunctions) {
	//
	for (key in buttonFunctions) {
		if (evt.target.classList.contains(key)) {
			switch (key) {
				case 'digits':
					calculator.digActions(evt);
					break;
				case 'functions':
					calculator.funActions(evt);
					break;
				case 'memory':
					calculator.memActions(evt);
					break;
				case 'operators':
					calculator.operActions(evt);
					break;
			}
		}
	}
}


function addToDisplay(evt) {
	//
	addSymbol(evt);

	displayUpdate();
}

function addSymbol(evt) {
	//

	let isDigit = evt.target.classList.contains('digits');

	if (isDigit) {
		addDigit(evt);
		calculator.evaluator.lastExpressionType = 'digit';
	} else {
		addOperator(evt);
		calculator.evaluator.lastExpressionType = 'operator';
	}

}

function addDigit(evt) {
	//

	if (calculator.flags.flagReset) {
		calculator.display = '';
		calculator.flags.flagReset = false;
	}

	if (calculator.evaluator.lastExpressionType === 'operator') {
		calculator.flags.firstEval = true;
	}

	calculator.display = calculator.display + evt.target.innerHTML;
	calculator.evaluator.currValue = parseInt(calculator.display);
}

function addOperator(evt) {
	//

	let isAfterOperator = calculator.evaluator.lastExpressionType === 'operator';
	let isAfterDigit = calculator.evaluator.lastExpressionType === 'digit';

	if (isAfterOperator) {
		if (evt.target.innerHTML !== '=') {
			if (calculator.evaluator.lastOperator === '=') {
				calculator.display = calculator.display + evt.target.innerHTML;
			} else {
				calculator.display = calculator.display.substring(0, calculator.display.length - 1) + evt.target.innerHTML;
			}
		}
		calculator.evaluator.currValue = parseInt(calculator.display);
	}

	if (isAfterDigit) {
		if (calculator.flags.firstEval) {
			calculator.display = calculator.evaluator.currValue = evalSimpleExpression(evt).toString();
			calculator.flags.firstEval = false;
			if (evt.target.innerHTML !== '=') {
				calculator.display = calculator.display + evt.target.innerHTML;
			}
		} else {
			if (evt.target.innerHTML === '=') {

			} else {
				calculator.display = calculator.display + evt.target.innerHTML;
			}
		}
	}

	calculator.evaluator.lastOperator = evt.target.innerHTML;
	calculator.evaluator.currValue = parseInt(calculator.display);
}

function evalSimpleExpression(evt) {
	//

	let answer = null;

	let components = [];

	for (key in OPERATOR_ACTIONS) {
		components = calculator.display.split(key);
		if (components.length > 1) {
			answer = OPERATOR_ACTIONS[key](components[0], components[1]);
		}
	}

	return answer;

}

function executeFunction(evt) {
	//

	for (key in FUNCTION_ACTIONS) {
		if (evt.target.innerHTML === key) {
			FUNCTION_ACTIONS[key](evt);
		}
	}
}

function displayUpdate() {
	//
	if (getElement('#display')) {
		getElement('#display').value = calculator.display;
	}
}

function getElement(query, parentNode) {
	if (parentNode) {
		return parentNode.querySelector(query);
	} else {
		if (document.body.querySelectorAll(query).length > 1) {
			return document.body.querySelectorAll(query);
		} else return document.body.querySelector(query);
	}
}