var startup;
var quizController = (function(){
	//Question Constructor

	function Question(id, questionText, options, correctAnswer){
		this.id = id;
		this.questionText = questionText;
		this.options = options;
		this.correctAnswer = correctAnswer;
	}

	var questionCol = {
		setQuestionCol: function(newCol){
			localStorage.setItem('questionCol', JSON.stringify(newCol))
		},

		getQuestionCol: function(){
			return (function(){
				if (localStorage.getItem('questionCol')){
					return JSON.parse(localStorage.getItem('questionCol'))
				} else {
					return [];
				}
			}());
		},

		removeQuestionCol: function(){
			localStorage.removeItem('questionCol');
		}
	}

	var questionProgress = {
		quizIndex: 0,
		updateQuizIndex: function(){ 
			this.quizIndex++;
		}
	}

	// Person Constructor

	function Person(id, firstname, lastname, score) {
		this.id = id;
		this.firstname = firstname;
		this.lastname = lastname;
		this.score = score;
	}

	var personCol = {
		setPersonData: function(personData){
			localStorage.setItem('personData', JSON.stringify(personData));
		},
		getPersonData: function(){
			return (function(){
				if (localStorage.getItem('personData')){
					return JSON.parse(localStorage.getItem('personData'));
				} else {
					return [];
				}
			}());
		},
		removePersonData: function(){
			localStorage.removeItem('personData');
		}
	}

	var currentPerson = {
		firstname: '',
		lastname: '',
		score: 0
	}

	return {
		questionProg: function(){return questionProgress},
		publicQuestionCol: questionCol,
		publicPersonCol: personCol,
		getCurrentPerson: function(){return currentPerson},
		updateCurrentPerson: function(person){
			currentPerson = person;
		},
		addQuestion: function(questionText, options, questionEdit, clearer, argclr){
			if (questionText.value == ""){
				alert('Please put some text on the question');
				return false;
			}

			var optionsArr, correctAnswer, questionId, newQuestion, questionStored;
			optionsArr = []

			for (var i = 0; i < options.length; i++){
				if(options[i].value !== ""){
					optionsArr.push(options[i].value);

					if (options[i].previousElementSibling.checked){
						correctAnswer = options[i].value;
					}
				}
			}

			if (!correctAnswer){
				alert('You missed to check a answer or you checked a empty input');
				return false;
			} 

			if (optionsArr.length < 2) {
				alert('Pleas put two or more options');
				return false;
			}

			if (questionCol.getQuestionCol().length > 0){
				questionId = questionCol.getQuestionCol().length;
			} else {
				questionId = 0
			}

			newQuestion = new Question(questionId, questionText.value, optionsArr, correctAnswer);

			if (questionEdit){
				clearer(argclr);
				return newQuestion;
			}

			questionStored = questionCol.getQuestionCol();
			questionStored.push(newQuestion);
			questionCol.setQuestionCol(questionStored);
			
			clearer(argclr);
		},
		addPerson: function(){
			var newPerson, personId, firstname, lastname, score, personData;
			personData = personCol.getPersonData();

			firstname = currentPerson.firstname;
			lastname = currentPerson.lastname;
			score = currentPerson.score;

			if (personCol.getPersonData().length > 0){
				personId = personCol.getPersonData().length;
			} else {
				personId = 0;
			}

			newPerson = new Person(personId, firstname, lastname, score);
			personData.push(newPerson);
			personCol.setPersonData(personData);

		}
	}

})();

var UIController = (function(){
	var dom = {
		//Landing Page//
		landPageContainer: function(){return document.querySelector('.landing-page-container')},
		landStartBtn: function(){return document.querySelector('#start-quiz-btn')},
		landFirstname: function(){return document.querySelector('#firstname')},
		landLastname: function(){return document.querySelector('#lastname')},
		//Admin Panel//
		adminPageContainer: function(){return document.querySelector('.admin-panel-container')},
		questionUpdateButton: function(){return document.querySelector('#question-update-btn')},
		questionDeleteButton: function(){return document.querySelector('#question-delete-btn')},
		questionInsertButton: function(){return document.querySelector('#question-insert-btn')},
		questionClearButton: function(){return document.querySelector('#questions-clear-btn')},
		newQuestionText: function(){return document.querySelector('#new-question-text')},
		adminOptions: function(){return document.querySelectorAll('.admin-option')},
		adminOptionsCon: function(){return document.querySelector('.admin-options-container')},
		questionHTMLList: function(){return document.querySelector('.inserted-questions-wrapper')},
		questionHTMLListButton: function(){return document.querySelectorAll('.inserted-questions-wrapper button')},
		//Quiz Section//
		userQuizText: function(){return document.querySelector('#asked-question-text')},
		userQuizOptions: function(){return document.querySelector('.quiz-options-wrapper')},
		userQuizProgressBar: function(){return document.querySelector('.progressBar')},
		userQuizInAnsCon: function(){return document.querySelector('.instant-answer-container')},
		quizPageContainer: function(){return document.querySelector('.quiz-container')},
		//Result Section//
		resultPageContainer: function(){return document.querySelector('.final-result-container')},
		resultScoreText: function(){return document.querySelector('#final-score-text')}
	};

	return {
		getDom: dom,
		createInput: function(container){
			var place = container.children.length;

			var input1 = document.createElement('input');
			input1.className = 'admin-option-' + place;
			input1.setAttribute('type', 'radio');
			input1.setAttribute('name', 'answer');
			input1.setAttribute('value', place);

			var input2 = document.createElement('input');
			input2.className = 'admin-option admin-option-' + place;
			input2.setAttribute('type', 'text');
			input2.setAttribute('value', '');

			var wrapper = document.createElement('div');
			wrapper.classList.add('admin-option-wrapper');
			wrapper.appendChild(input1);
			wrapper.appendChild(input2);

			dom.adminOptionsCon().appendChild(wrapper);

			/* ***********************************************
			**************************************************
			**************************************************

			Or You Can use insertAdjacentHTML(), please view it in MDN

			**************************************************
			**************************************************
			*********************************************** */
		},
		addInputDin: function(){
			var myself = this;
			var options = function(){return dom.adminOptions()};
			var optionsCon = dom.adminOptionsCon();
			var last = function(){return optionsCon.lastElementChild.lastElementChild};

			for (var i = 0; i < options().length; i++){
				var option = options()[i];
				var opClone = option.cloneNode(true);
				option.parentNode.replaceChild(opClone, option);

				options()[i].addEventListener('focus', function(e){
					if (e.target === last()){
						myself.createInput(optionsCon);
						myself.addInputDin();
					}
				});
			}
		},
		createQuestionLs: function(questions){
			dom.questionHTMLList().innerHTML = '';
			var localFunQuestionCol = questions.getQuestionCol();

			if (localFunQuestionCol.length == 0) {
				return;
			} else {
				for (var i = 0; i < localFunQuestionCol.length; i++) {
					dom.questionHTMLList().insertAdjacentHTML('afterbegin', '<p><span>'+ (i + 1) +'. '+ localFunQuestionCol[i].questionText +'</span><button id="question-'+ i +'">Edit</button></p>');
				}

			}
		},
		editQuestionLs: function(event, LS, addQuestion, startup){
			var myself = this;

			var buttonId = parseInt(event.target.id.split('-')[1]);
			var localQuestionsLS = LS.getQuestionCol();
			var localQuestion = localQuestionsLS[buttonId];

			var localOptionsEdit = localQuestion.options;
			var localOptionsCon = dom.adminOptionsCon();

			dom.newQuestionText().value = localQuestion.questionText;
			localOptionsCon.innerHTML = '';

			localOptionsEdit.forEach(function(){
				myself.createInput(localOptionsCon);
				myself.addInputDin();
			});

			for (var i = 0; i < dom.adminOptions().length; i++){
				dom.adminOptions()[i].value = localOptionsEdit[i];
			}

			dom.questionUpdateButton().style.visibility = 'visible';
			dom.questionDeleteButton().style.visibility = 'visible';
			dom.questionInsertButton().style.visibility = 'hidden';
			dom.questionClearButton().style.pointerEvents = 'none';

			function restart(){
				dom.questionUpdateButton().style.visibility = 'hidden';
				dom.questionDeleteButton().style.visibility = 'hidden';
				dom.questionInsertButton().style.visibility = 'visible';
				dom.questionClearButton().style.pointerEvents = 'auto';

				dom.newQuestionText().value = '';
				var optionsCon = dom.adminOptionsCon();
				optionsCon.innerHTML = '';

				for (i = 0; i < 2; i++){
					myself.createInput(optionsCon);
				}

				startup();
			}

			dom.questionUpdateButton().addEventListener('click', function(){

				/***************************************
				****************************************
				OR YOU CAN USE SPLICE() METHOD, EXAMPLE:
				localQuestionLS.splice(buttonId, 1);
				localQuestionLS.splice(buttonId, 1, localNewQuestion);
				****************************************
				***************************************/

				localQuestion.questionText = dom.newQuestionText().value;
				var localNewQuestion = addQuestion(dom.newQuestionText(), dom.adminOptions(), true);

				if (localNewQuestion === false){
					return;
				} else {
					restart();
				}

				localNewQuestion.id = localQuestion.id;
				localQuestionsLS[buttonId] = localNewQuestion;

				LS.setQuestionCol(localQuestionsLS);
				restart();
			});

			dom.questionDeleteButton().addEventListener('click', function(){
				localQuestionsLS.splice(buttonId, 1);
				LS.setQuestionCol(localQuestionsLS);

				if (LS.getQuestionCol().length === 0){
					LS.removeQuestionCol();
				}

				restart();
			});

		},
		clearQuestionLs: function(event, LS){
			if (LS.getQuestionCol().length < 1){
				return;
			} else {
				/*
					confirm() display a message like alert(), but with
					options, if the user click ok, then return true, 
					otherwise return false
				*/

				var confirmMessage = 'Do you want to delete all the questions ?, You cant restore it'
				
				if (confirm(confirmMessage) === false){
					return;
				}
			}

			dom.questionHTMLList().innerHTML = '';
			LS.removeQuestionCol();
		},
		clearInputs: function(create){
			dom.newQuestionText().value = '';
			dom.adminOptionsCon().innerHTML = '';

			for (var i = 0; i < 2; i++){
				create(dom.adminOptionsCon())
			}
		},
		startQuiz: function(LS, PS, progress){
			localQuestionCol = LS.getQuestionCol();
			localPersonFun = PS;
			myself = this;

			if (localQuestionCol.length < 1) { return; }

			function updateProgress(){
				if ((progress().quizIndex + 1) > localQuestionCol.length){
					return;
				}

				var progbarText = dom.userQuizProgressBar().querySelector('#progress');
				progbarText.textContent = (progress().quizIndex + 1) + '/' + localQuestionCol.length;

				var progbar = dom.userQuizProgressBar().querySelector('progress');
				progbar.setAttribute('value', (progress().quizIndex + 1))
				progbar.setAttribute('max', localQuestionCol.length);
			}

			function manageAnswer(passed, span){
				function instantAnswer(color, message){
					var container = dom.userQuizInAnsCon();
					var wrapper = container.querySelector('#instant-answer-wrapper');
					var emotion = container.querySelector('#emotion');
					var text = container.querySelector('#instant-answer-text');
					var button = container.querySelector('button');

					container.style.opacity = '1';
					wrapper.className = color;
					text.textContent = message;

					if (color === 'red'){
						emotion.setAttribute('src', 'images/sad.png')
						span.style.background = 'rgba(200, 0, 0, .6)';
					} else {
						emotion.setAttribute('src', 'images/happy.png')
						span.style.background = 'rgba(0, 225, 0, .6)';
					}

					if (progress().quizIndex === localQuestionCol.length){
						button.textContent = 'Finish';
					}

					button.addEventListener('click', start);
				}

				if (passed === true) {
					instantAnswer('green', 'This is a correct answer');
				} else {
					instantAnswer('red', 'This is a wrong answer');
				}
			}

			function manageClick(e){
				var index = parseInt(e.target.className.split('-')[1]);
				var quiznumber = progress().quizIndex;

				var answer = localQuestionCol[quiznumber].options[index];
				var correct = localQuestionCol[quiznumber].correctAnswer;
				var span = dom.userQuizOptions().querySelector('div.' + e.target.className + ' span');

				dom.userQuizOptions().style.opacity = '0.7';
				dom.userQuizOptions().style.pointerEvents = 'none';

				progress().updateQuizIndex();
				
				if (answer === correct){
					var curr = localPersonFun.getCurrentPerson();
					curr.score++;

					localPersonFun.updateCurrentPerson(curr);
					manageAnswer(true, span);
				} else {
					manageAnswer(false, span);
				}
			}

			function createOption(number, text){
				var myspan = document.createElement('span');
				myspan.textContent = number + 1;
				myspan.className = 'choice-' + number;

				var myp = document.createElement('p');
				myp.textContent = text;
				myp.className = 'choice-' + number;

				var mydiv = document.createElement('div');
				mydiv.className = 'choice-' + number;
				mydiv.appendChild(myspan);
				mydiv.appendChild(myp);

				return mydiv;
			}

			function displayQuestion(index) {
				if (index === localQuestionCol.length){
					finishQuiz();
					return;
				}

				dom.userQuizText().textContent = localQuestionCol[index].questionText;
				dom.userQuizOptions().innerHTML = '';
				dom.userQuizInAnsCon().style.opacity = '0';

				var quizOptions = localQuestionCol[index].options;
				quizOptions.forEach( function(element, index) {
					var myoption = createOption(index, element);
					myoption.addEventListener('click', manageClick);

					dom.userQuizOptions().appendChild(myoption);
				});

				dom.userQuizOptions().style.opacity = '1';
				dom.userQuizOptions().style.pointerEvents = 'auto';
			}

			function finishQuiz() {
				localPersonFun.addPerson();
				var myperson = localPersonFun.getCurrentPerson();
				var scoreText = dom.resultScoreText();

				myself.displayPage(dom.resultPageContainer());

				scoreText.textContent = myperson.firstname + ' ';
				scoreText.textContent += myperson.lastname + ' -- ';
				scoreText.textContent += myperson.score;
			}

			function start() {
				displayQuestion(progress().quizIndex);
				updateProgress();
			}

			if (progress().quizIndex === 0){
				start();
			}
		},
		displayPage(page, starter){
			var land, admin, quiz, result;
			land = dom.landPageContainer();
			admin = dom.adminPageContainer();
			quiz = dom.quizPageContainer();
			result = dom.resultPageContainer();

			land.style.display = 'none';
			admin.style.display = 'none';
			quiz.style.display = 'none';
			result.style.display = 'none';

			page.style.display = 'block';
			startup()	
		},
		getFullName(ctrl){
			var firstname = dom.landFirstname().value;
			var lastname = dom.landLastname().value;
			var questcol = ctrl.publicQuestionCol;
			
			if (firstname == '' || lastname == ''){
				alert('Please put your name');
				return;
			}

			if (firstname == 'John' && lastname == 'Smith'){
				this.displayPage(dom.adminPageContainer());
				return;
			}

			if (!(questcol.getQuestionCol().length > 0)){
				alert('Quiz is not ready, please contact the administrator');
				return;
			}

			var person = ctrl.getCurrentPerson();
			person.firstname = firstname;
			person.lastname = lastname;

			ctrl.updateCurrentPerson(person);
			this.displayPage(dom.quizPageContainer());
		},
		showResults(personData){
			var obj = personData.getPersonData();
			var container = document.querySelector('.results-list-wrapper');
			container.innerHTML = '';

			var clearResults0 = document.querySelector('#results-clear-btn');
			var clearResults = clearResults0.cloneNode(true);

			clearResults0.parentElement.replaceChild(clearResults, clearResults0);
			clearResults.addEventListener('click', function(){
				if (personData.getPersonData().length === 0){
					alert('All the results are actually deleted');
					return;
				}

				var dou = confirm('Are you sure that u wanna delete the results ?');
				if (!dou){
					return;
				}

				container.innerHTML = '';
				personData.removePersonData();
			});

			function createP(person){
				var name = person.firstname + ' ' + person.lastname;

				var myspan = document.createElement('span');
				myspan.className = 'person-' + person.id;
				myspan.textContent = name + ' - ' + person.score + ' points';

				var mybutton = document.createElement('button');
				mybutton.setAttribute('id', 'delete-result-btn_' + person.id);
				mybutton.className = 'delete-result-btn';
				mybutton.textContent = 'Delete';

				mybutton.addEventListener('click', function(){
					mybutton.parentElement.parentElement.removeChild(mybutton.parentElement);
					obj.splice(person.id, 1);
					personData.setPersonData(obj);
				})

				var myp = document.createElement('p');
				myp.className = 'person person-' + person.id;
				myp.appendChild(myspan);
				myp.appendChild(mybutton);

				container.appendChild(myp);
			}

			for (var i = 0; i < obj.length; i++){
				createP(obj[i]);
			}
		}
	};

})();

var controller = (function(QuizCtrl, UICtrl){
	
	var dom = UICtrl.getDom;

	startup = function(){ UICtrl.addInputDin(); HTMLQuestionLs(); questionEditButton(); questionClearButton(); startQuiz(); showResults(); }
	var HTMLQuestionLs = function(){ UICtrl.createQuestionLs(QuizCtrl.publicQuestionCol) }
	var questionEditButton = function(){ Array.from(dom.questionHTMLListButton()).forEach(function(element, index){element.addEventListener('click', function(e){UICtrl.editQuestionLs(e, QuizCtrl.publicQuestionCol, QuizCtrl.addQuestion, startup);})}); }
	var questionClearButton = function(){ dom.questionClearButton().addEventListener('click', function(e){UICtrl.clearQuestionLs(e, QuizCtrl.publicQuestionCol);}) };
	var QuizAddQuestion = function(){ QuizCtrl.addQuestion(dom.newQuestionText(), dom.adminOptions(), false, UICtrl.clearInputs, UICtrl.createInput)}
	var startQuiz = function(){ UICtrl.startQuiz(QuizCtrl.publicQuestionCol, QuizCtrl, QuizCtrl.questionProg); };
	var showResults = function(){ UICtrl.showResults(QuizCtrl.publicPersonCol); };

	UICtrl.displayPage(dom.landPageContainer());

	dom.questionInsertButton().addEventListener('click', function(){
		QuizAddQuestion();
		startup();
	})

	dom.landStartBtn().addEventListener('click', function(){
		UICtrl.getFullName(QuizCtrl);
	})

	Array.from(dom.landPageContainer().querySelectorAll('input')).forEach(function(element, index){
		element.addEventListener('keypress', function(e){
			if (e.keyCode == 13){
				UICtrl.getFullName(QuizCtrl);
			}
		})
	});


})(quizController, UIController);