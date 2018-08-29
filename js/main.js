

// main variables

let memory = 'bla-bla';

let input = getElement('#display');

let buttonList = document.getElementsByClassName('button');

let buttonTypes = setButtonTypes();

// let functionList = setfunction




init();

function init() {
	// 

	setButtonActions();
}


function getElement(query, parentNode) {
	if (parentNode) {
		return parentNode.querySelector(query);
	} else {
		return document.body.querySelector(query);
	}
}

function setButtonTypes() {
	return {
		"functions": (evt) => { funcActions(evt) },
		"digits": () => { console.log('digit'); },
		"operators": () => { console.log('operator'); },
		"memory": () => { console.log('memory'); }
	}
}

function setButtonActions() {
	//
	[].forEach.call(buttonList, (currButton) => {
		currButton.addEventListener('click', (evt) => {
			btnAction(evt);
		});
	});
}


function btnAction(evt) {
	for (key in buttonTypes) {
		if (evt.target.classList.contains(key)) {
			buttonTypes[key](evt);
		}
	}
}

function funcActions(evt) {

}












/*function getElement(query, parentNode) {
	if (parentNode) {
		return parentNode.querySelector(query);
	} else {
		return document.body.querySelector(query);
	}
}


function buttonAct() {
	//
	return {
		'functions': (input, evt) => { funcActions(input, evt) },
		'digits': (input, evt) => { digActions(input, evt) },
		'operators': (input, evt) => { operActions(input, evt) },
		'memory': (input, evt) => { memActions(input, evt) }
	}
}

function setButtonEvent(buttonList, buttonActions, input) {
	[].forEach.call(buttonList, (currButton) => {
		currButton.addEventListener('click', (evt) => {
			buttonEvent(evt, buttonActions, input);
		});
	});
}

function buttonEvent(evt, buttonActions, input) {
	//
	for (key in buttonActions) {
		if (evt.target.classList.contains(key)) {
			buttonActions[key](input, evt);
		}
	}
}

function funcActions(input, evt) {
	console.log(evt);
}

function digActions(input, evt) {
	if (flagReset === 1) {
		input.value = '';
		flagReset = 0;
	}
	input.value = input.value + evt.target.innerHTML;
}

function operActions(input, evt) {
	console.log(evt);
}

function memActions(input, evt) {
	console.log(evt);
}
*/




/*function setButtonEvent(buttonList, buttonActions) {
	//
	[].forEach.call(buttonList, (currButton) => {
		currButton.addEventListener('click', (evt) => {
			buttonEvent(evt, buttonActions);
		});
	});
}*/

/*function buttonEvent(evt, buttonActions) {
	for (key in buttonActions) {
		if (evt.target.classList.contains(key)){
			console.log(buttonActions, key);
			// buttonActions[key];
		}
	}
}*/




/*var input = document.getElementById('display');

var buttonList = document.getElementsByClassName('button');

var result = 0;

var memory = 0;

var flagReset = 0;


for (var i = 0; i < buttonList.length; i++) {
	buttonList[i].addEventListener('click', keyEvent);
}

// Functions

//
function keyEvent() {
	var classList = this.classList;
	if (classList.contains('btn-dig')) {
		digInput(this);
	} else if (classList.contains('arithm-operator')) {
		arithmOperatorInput(this);
	} else if (classList.contains('function')) {
		funcInput(this);
	}
}

//
function digInput(node) {
	if (flagReset == 1) {
		input.value = '';
		flagReset = 0;
	}
	input.value = input.value + node.value;
}

//
function arithmOperatorInput(node) {
	if (flagReset == 1) {
		input.value = '';
		flagReset = 0;
	}
	if (node.value == '=') {
		result = eval(input.value);
		input.value = String(result);
		flagReset = 1;
	} else {
		input.value = input.value + node.value;	
	}
}

//
function funcInput(node) {
	if (node.value == 'C') {
		input.value = '';
	} else if (node.value == "sqrt") {
		result = Math.sqrt(+input.value);
		input.value = String(result);
		flagReset = 1;
	} else if (node.value == "x^y") {

	}
	else if (node.value == "AC") {

	} else if (node.value == "MC") {
		
	} else if (node.value == "MR") {
		
	} else if (node.value == "M+") {
		
	} else if (node.value == "M-") {

	}
	
	var actions = {
		'C': function() {
			input.value = '';
		},
		'sqrt': function() {
			result = Math.sqrt(+input.value);
			input.value = String(result);
			flagReset = 1;
		}
	};

	actions[node.value]();
}*/

