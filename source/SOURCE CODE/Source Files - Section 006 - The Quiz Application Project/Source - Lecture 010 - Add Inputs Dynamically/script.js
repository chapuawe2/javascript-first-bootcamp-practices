// Lecture: Add Inputs Dynamically

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
            // 19           // 25    // 29       // 31        // 43            // 59
            var optionsArr, corrAns, questionId, newQuestion, getStoredQuests, isChecked;
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
                    // 60
                    isChecked = true;
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
            // 52
            if(newQuestText.value !== "") {
                // 55
                if(optionsArr.length > 1) {
                    // 58
                    if(isChecked) { 
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
                        // 48
                        newQuestText.value = "";
                        // 49
                        for(var x = 0; x < opts.length; x++) {
                            // 50
                            opts[x].value = "";
                            // 51
                            opts[x].previousElementSibling.checked = false;
                        }
                        // 47
                        console.log(questionLocalStorage.getQuestionCollection());
                    // 61
                    } else {
                        // 62
                        alert('You missed to check correct answer, or you checked answer without value');
                    }
                // 56
                } else {
                    // 57
                    alert('You must insert at least two options');
                }
            // 53
            } else {
                // 54
                alert('Please, Insert Question');
            }
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
        adminOptions: document.querySelectorAll('.admin-option'), // 16
        adminOptionsContainer: document.querySelector(".admin-options-container") // 65
    };

    // 7
    return {
        getDomItems: domItems, // 8
        // 63
        addInputsDynamically: function() {
            // 67
            var addInput = function() {
                // 68
                // console.log('Works');
                // 69         // 71
                var inputHTML, z;
                // 72
                z = document.querySelectorAll(".admin-option").length;
                // 70                                                                                 //73    
                inputHTML = '<div class="admin-option-wrapper"><input type="radio" class="admin-option-' + z + '" name="answer" value="' + z + '"><input type="text" class="admin-option admin-option-' + z + '" value=""></div>';
                // 74
                domItems.adminOptionsContainer.insertAdjacentHTML('beforeend', inputHTML);
                // 75
                domItems.adminOptionsContainer.lastElementChild.previousElementSibling.lastElementChild.removeEventListener('focus', addInput);
                // 76
                domItems.adminOptionsContainer.lastElementChild.lastElementChild.addEventListener('focus', addInput);
            }
            // 66
            domItems.adminOptionsContainer.lastElementChild.lastElementChild.addEventListener('focus', addInput);
        }
    };

})();

/*******************************
***********CONTROLLER***********
*******************************/
// 3
var controller = (function(quizCtrl, UICtrl) {

    // 11
    var selectedDomItems = UICtrl.getDomItems;
    // 64
    UICtrl.addInputsDynamically();
    // 9 -- //12 (change with var selectedDomItems)
    selectedDomItems.questInsertBtn.addEventListener('click', function() {
        // 77
        var adminOptions = document.querySelectorAll('.admin-option');
        // 10
        // console.log('Works');
        // 17                                                                // 78
        quizCtrl.addQuestionOnLocalStorage(selectedDomItems.newQuestionText, adminOptions);

    });

})(quizController, UIController);











