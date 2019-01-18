// Lecture: Add Questions - Part 3

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

    //34
    var questionLocalStorage = {
        // 35
        setQuestionCollection: function(newCollection) {
            localStorage.setItem('questionCollection', JSON.stringify(newCollection));
        },
        // 36
        getQuestionCollection: function() {
            return JSON.parse(localStorage.getItem('questionCollection'));
        }, 
        // 37
        removeQuestionCollection: function() {
            localStorage.removeItem('questionCollection');
        }
    }

    // 13
    return {
        // 14
        addQuestionOnLocalStorage: function(newQuestText, opts) {
            // 18
            // console.log('Hi');
            // 19           // 25    // 29       // 31        // 43
            var optionsArr, corrAns, questionId, newQuestion, getStoredQuests;
            // 48
            if(questionLocalStorage.getQuestionCollection() === null) {
                questionLocalStorage.setQuestionCollection([]);
            }
            //20
            optionsArr = [];
            // 30 -- // 41 - Delete --> questionId = 0;
            // questionId = 0;
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

            // 38
            // [ {id: 0}, {id: 1} ]

            // 39
            if(questionLocalStorage.getQuestionCollection().length > 0) {
                // 42
                questionId = questionLocalStorage.getQuestionCollection()[questionLocalStorage.getQuestionCollection().length - 1].id + 1;
            // 40    
            } else {
                questionId = 0;
            }

            // 32
            newQuestion = new Question(questionId, newQuestText.value, optionsArr, corrAns);
            // 44
            getStoredQuests = questionLocalStorage.getQuestionCollection();
            // 45
            getStoredQuests.push(newQuestion);
            // 46
            questionLocalStorage.setQuestionCollection(getStoredQuests);
            // 24
            // console.log(optionsArr);
            // 28
            // console.log(corrAns);
            // 33
            // console.log(newQuestion);
            // 47
            console.log(questionLocalStorage.getQuestionCollection());
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











