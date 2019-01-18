// Lecture: The Special Keyword 'this'

/*
function a() {
  console.log(this);
  console.log(this === window);

  function b() {
    console.log(this);
    console.log(this === window);
  }

  b();

}

a();


var firstname = 'Bob';

var per = {
  firstname: 'John',
  lastname: 'Smith',
  getFullName: function() {
    var that = this;
    // console.log(this === per);
    // return per.firstname + ' ' + per.lastname;
    // return this.firstname + ' ' + this.lastname;
    console.log(this.firstname + ' ' + this.lastname);

    function greet() {
      console.log('Hi ' + that.firstname);
    }
    greet();
  }
};

var per1 = {
  firstname: 'Nick',
  lastname: 'Doe'
};

per1.getFullName = per.getFullName;

per.getFullName();
per1.getFullName();
*/