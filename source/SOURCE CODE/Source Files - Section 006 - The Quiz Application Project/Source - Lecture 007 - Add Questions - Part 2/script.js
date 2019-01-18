// Lecture: Add Questions - Part 2

/*******************************
*********QUIZ CONTROLLER********
*******************************/
// 1
var quizController = (function() {

    // 4
    //*********Question Constructor*********/
    function Question(id, questionText, options, correctAnswer) {
        this.id = id;
        this.questionText = questionText;
        this.options = options;
        this.correctAnswer = correctAnswer;
    }

    // 13
    return {
        // 14
        addQuestionOnLocalStorage: function(newQuestText, opts) {
            // 18
            // console.log('Hi');
            // 19           // 25    // 29       // 31
            var optionsArr, corrAns, questionId, newQuestion;
            //20
            optionsArr = [];
            // 30
            questionId = 0;
            // 21
            for(var i = 0; i < opts.length; i++) {
                // 22
                if(opts[i].value !== "") {
                    // 23
                    optionsArr.push(opts[i].value);
                }
                // 26
                if(opts[i].previousElementSibling.checked && opts[i].value !== "") {
                    // 27
                    corrAns = opts[i].value;
                }
            }
            // 32
            newQuestion = new Question(questionId, newQuestText.value, optionsArr, corrAns);
            // 24
            // console.log(optionsArr);
            // 28
            // console.log(corrAns);
            // 33
            console.log(newQuestion);
        }
    };

})();

/*******************************
**********UI CONTROLLER*********
*******************************/
// 2
var UIController = (function() {

    // 5
    var domItems = {
        //*******Admin Panel Elements********/
        questInsertBtn: document.getElementById('question-insert-btn'), // 6
        newQuestionText: document.getElementById('new-question-text'), // 15
        adminOptions: document.querySelectorAll('.admin-option') // 16
    };

    // 7
    return {
        getDomItems: domItems //8
    };

})();

/*******************************
***********CONTROLLER***********
*******************************/
// 3
var controller = (function(quizCtrl, UICtrl) {

    // 11
    var selectedDomItems = UICtrl.getDomItems;

    // 9 -- //12 (change with var selectedDomItems)
    selectedDomItems.questInsertBtn.addEventListener('click', function() {
        // 10
        // console.log('Works');
        // 17
        quizCtrl.addQuestionOnLocalStorage(selectedDomItems.newQuestionText, selectedDomItems.adminOptions);

    });

})(quizController, UIController);











