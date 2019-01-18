// Lecture: Edit Questions

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
        removeQuestionCollectino: function() {
            localStorage.removeItem('questionColection');
        }
    }
    // 90
    if(questionLocalStorage.getQuestionCollection() === null) {
        questionLocalStorage.setQuestionCollection([]);
    }
    // 13
    return {
        // 80
        getQuestionLocalStorage: questionLocalStorage,
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
                        // 96
                        return true;
                    // 61
                    } else {
                        // 62
                        alert('You missed to check correct answer, or you checked answer without value');
                        //97
                        return false;
                    }
                // 56
                } else {
                    // 57
                    alert('You must insert at least two options');
                    // 98
                    return false;
                }
            // 53
            } else {
                // 54
                alert('Please, Insert Question');
                // 99
                return false;
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
        adminOptionsContainer: document.querySelector(".admin-options-container"), // 65
        insertedQuestsWrapper: document.querySelector(".inserted-questions-wrapper"), // 83
        questUpdateBtn: document.getElementById('question-update-btn'), // 133
        questDeleteBtn: document.getElementById('question-delete-btn') // 134
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
        },
        // 79
        createQuestionList: function(getQuestions) {
            // 86          // 91
            var questHTML, numberingArr;
            // 92
            numberingArr = [];
            // 82
            // console.log(getQuestions);
            // 84
            domItems.insertedQuestsWrapper.innerHTML = "";
            // 85
            for(var i = 0; i < getQuestions.getQuestionCollection().length; i++) {
                // 93
                numberingArr.push(i + 1);
                // 87                     // 94                    // 88
                questHTML = '<p><span>' + numberingArr[i] + '. ' + getQuestions.getQuestionCollection()[i].questionText + '</span><button id="question-' + getQuestions.getQuestionCollection()[i].id + '">Edit</button></p>';
                // 95
                // console.log(getQuestions.getQuestionCollection()[i].id);
                // 89
                domItems.insertedQuestsWrapper.insertAdjacentHTML('afterbegin', questHTML);
            }
        },
        // 104                                           // 130
        editQuestList: function(event, storageQuestList, addInpsDynFn) {
            // 109     // 113               // 117     // 119      // 125
            var getId, getStorageQuestList, foundItem, placeInArr, optionHTML;
            // 107
            if('question-'.indexOf(event.target.id)) {
                // 110  // 112
                getId = parseInt(event.target.id.split('-')[1]);
                // 114
                getStorageQuestList = storageQuestList.getQuestionCollection();
                // 115
                for(var i = 0; i < getStorageQuestList.length; i++) {
                    // 116
                    if(getStorageQuestList[i].id === getId) {
                        // 118
                        foundItem = getStorageQuestList[i];
                        // 120
                        placeInArr = i;
                    }
                }
                // 121
                // console.log(foundItem, placeInArr);
                // 122
                domItems.newQuestionText.value = foundItem.questionText;
                // 123
                domItems.adminOptionsContainer.innerHTML = '';
                // 128
                optionHTML = '';
                // 124
                for(var x = 0; x < foundItem.options.length; x++) {
                    // 126
                    optionHTML += '<div class="admin-option-wrapper"><input type="radio" class="admin-option-' + x + '" name="answer" value="' + x + '"><input type="text" class="admin-option admin-option-' + x + '" value="'+ foundItem.options[x] + '"></div>';
                }
                // 129
                domItems.adminOptionsContainer.innerHTML = optionHTML;
                // 135
                domItems.questDeleteBtn.style.visibility = 'visible';
                // 136
                domItems.questUpdateBtn.style.visibility = 'visible';
                // 137
                domItems.questInsertBtn.style.visibility = 'hidden';
                // 127
                // console.log(optionHTML);
                // 132
                addInpsDynFn();
            }
            // 106
            // console.log(event, storageQuestList);
            // 108
            // console.log(event.target.id);
            // 111
            // console.log(getId);
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
    // 81
    UICtrl.createQuestionList(quizCtrl.getQuestionLocalStorage);
    // 9 -- //12 (change with var selectedDomItems)
    selectedDomItems.questInsertBtn.addEventListener('click', function() {
        // 77
        var adminOptions = document.querySelectorAll('.admin-option');
        // 10
        // console.log('Works');
        // 100             // 17                                                                // 78
        var checkBoolean = quizCtrl.addQuestionOnLocalStorage(selectedDomItems.newQuestionText, adminOptions);
        // 101
        if(checkBoolean) {
            // 102
            UICtrl.createQuestionList(quizCtrl.getQuestionLocalStorage);
        }

    });

    // 103
    selectedDomItems.insertedQuestsWrapper.addEventListener('click', function(e) {
        // 105                                                    // 131
        UICtrl.editQuestList(e, quizCtrl.getQuestionLocalStorage, UICtrl.addInputsDynamically);
    });

})(quizController, UIController);










