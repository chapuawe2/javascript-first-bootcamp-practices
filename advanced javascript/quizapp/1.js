var quizController = (function(){
	var private = 10

	var privateFn = function(a){
		return a + private;
	}

	return {
		publicMethod: function(){
			return privateFn(20);
		}
	}
})();

var UIController = (function(){
	num1 = 30;

	return {
		sum: function(num2){
			return num1 + num2
		}
	}
})();

var controller = (function(QuizCtrl, UICtrl){
	console.log(UIController.sum(100) + QuizCtrl.publicMethod())
})(quizController, UIController);