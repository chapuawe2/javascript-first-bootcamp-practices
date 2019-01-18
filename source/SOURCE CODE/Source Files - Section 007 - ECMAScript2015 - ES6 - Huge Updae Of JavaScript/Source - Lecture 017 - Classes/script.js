// Lecture: Classes

/*
function PersonES5(firstname, lastname, age) {

    this.firstname = firstname;
    this.lastname = lastname;
    this.age = age;

}

PersonES5.prototype.aboutPerson = function() {

    console.log(`My name is ${this.firstname} ${this.lastname} and I am ${this.age} years old`);

}

function DeveloperES5(firstname, lastname, age, experience, projects) {

    PersonES5.call(this, firstname, lastname, age);
    this.experience = experience;
    this.projects = projects;

}

DeveloperES5.prototype = Object.create(PersonES5.prototype);

DeveloperES5.prototype.aboutDev = function() {

    console.log(`My name is ${this.firstname} ${this.lastname}, I am ${this.age} years old with ${this.experience} years of experience and I have participated in ${this.projects} projects`);

}

const nickES5 = new PersonES5('Nick', 'Smith', 28);

const alexDev = new DeveloperES5('Alex', 'Brown', 30, 10, 5);

nickES5.aboutPerson();

alexDev.aboutPerson();

alexDev.aboutDev();

// nickES5.aboutDev();

console.log('--------------------------------------------------------');

class PersonES6 {

    constructor(firstname, lastname, age) {

        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;

    }
    aboutPerson() {

        console.log(`My name is ${this.firstname} ${this.lastname} and I am ${this.age} years old`);

    }

}

class DeveloperES6 extends PersonES6 {

    constructor(firstname, lastname, age, experience, projects) {

        super(firstname, lastname, age);
        this.experience = experience;
        this.projects = projects;

    }

        aboutDev() {

            console.log(`My name is ${this.firstname} ${this.lastname}, I am ${this.age} years old with ${this.experience} years of experience and I have participated in ${this.projects} projects`);

        }

}

const nickES6 = new PersonES6('Nick', 'Smith', 28);

const bobDev = new DeveloperES6('Bob', 'James', 40, 15, 7);

nickES6.aboutPerson();

bobDev.aboutDev();

bobDev.aboutPerson();

nickES5.aboutDev();
*/










































































