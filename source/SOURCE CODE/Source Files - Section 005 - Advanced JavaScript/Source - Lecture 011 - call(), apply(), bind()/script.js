// Lecture: call(), apply(), bind()

/*
var person = {
  firstname: 'John',
  lastname: 'Smith',
  fullname: function() {
    return this.firstname + ' ' + this.lastname;
  }
};

var nick = {
  firstname: 'Nick',
  lastname: 'Doe'
};

console.log(person.fullname.call(nick));


var definePerson = function(age, job) {
  console.log(this.fullname() + ' is ' + age + ' years old and he is a ' + job);
};

// definePerson(28, 'developer');
definePerson.call(person, 28, 'developer');
definePerson.apply(person, [30, 'designer']);

// var getPerson = definePerson.bind(person);
// getPerson(19, 'student');

// var getPerson = definePerson.bind(person, 19, 'student');
// getPerson();

var getPerson = definePerson.bind(person, 35);
getPerson('musician');
getPerson('driver');
*/










