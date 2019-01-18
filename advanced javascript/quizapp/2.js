var quizController = (function(){
	localStorage.setItem('data', [1,2,3,4])
	console.log(localStorage.getItem('data'));

	//console.log(typeof localStorage.getItem('data'));
	//String

	localStorage.setItem('data', JSON.stringify([1,2,3,4]))
	console.log(JSON.parse(localStorage.getItem('data')));

	localStorage.removeItem('data');
})();

var UIController = (function(){
	
})();

var controller = (function(QuizCtrl, UICtrl){
	
})(quizController, UIController);