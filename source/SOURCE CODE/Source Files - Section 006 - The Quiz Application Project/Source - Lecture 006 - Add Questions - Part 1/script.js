// Lecture: Add Questions - Part 1

/*******************************
*********QUIZ CONTROLLER********
*******************************/
//1
var quizController = (function() {

    //4
    //*********Question Constructor*********/
    function Question(id, questionText, options, correctAnswer) {
        this.id = id;
        this.questionText = questionText;
        this.options = options;
        this.correctAnswer = correctAnswer;
    }

    //13
    return {
        //14
        addQuestionOnLocalStorage: function(newQuestText, opts) {
            // 18
            // console.log('Hi');
        }
    };

})();

/*******************************
**********UI CONTROLLER*********
*******************************/
//3
var UIController = (function() {

    //5
    var domItems = {
        //*******Admin Panel Elements********/
        questInsertBtn: document.getElementById('question-insert-btn'), //6
        newQuestionText: document.getElementById('new-question-text'), //15
        adminOptions: document.querySelectorAll('.admin-option') //16
    };

    //7
    return {
        getDomItems: domItems //8
    };

})();

/*******************************
***********CONTROLLER***********
*******************************/
//3
var controller = (function(quizCtrl, UICtrl) {

    //11
    var selectedDomItems = UICtrl.getDomItems;

    //9 -- //12 (change with var selectedDomItems)
    selectedDomItems.questInsertBtn.addEventListener('click', function() {
        //10
        // console.log('Works');
        //17
        quizCtrl.addQuestionOnLocalStorage(selectedDomItems.newQuestionText, selectedDomItems.adminOptions);

    });

})(quizController, UIController);











