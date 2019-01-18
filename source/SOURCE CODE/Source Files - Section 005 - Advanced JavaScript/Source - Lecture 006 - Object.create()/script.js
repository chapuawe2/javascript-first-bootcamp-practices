// Lecture: Object.create()

/*
// console.dir(Object);

// var obj1 = Object.create(Object.prototype, {
//   name: {
//     value: 'John'
//   }
// });
// // obj1.name = 'John';



// console.log(obj1);

// var obj2 = {};
// console.log(obj2);

// function Person() {
//   this.name = 'John';
// }

// Person.prototype.greet = 'Hello';

// var person1 = new Person();
// var person2 = Object.create(Person.prototype);

// console.log(person1);
// console.log(person2);

var firstProto = {
  sayHello: function() {
    return 'Hello ' + this.name;
  }
};

var john = Object.create(firstProto, {
  name: {
    value: 'John'
  }
});

console.log(john);

var secondProto = Object.create(firstProto, {
  sayHi: {
    value: function() {
    return 'Hi ' + this.name;
    }
  }
});

console.log(secondProto);

var bob = Object.create(secondProto, {
  name: {
    value: 'Bob'
  }
});

console.log(bob);


var obj = Object.create(null);
console.log(obj);
*/







