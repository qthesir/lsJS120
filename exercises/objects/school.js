const ALLOWED_YEARS = ["1st", "2nd", "3rd", "4th", "5th"];

function createSchool() {
  return {
    students: [],

    addStudent(name, year) {
      if (!ALLOWED_YEARS.includes(year)) {
        console.log("Invalid Year");
        return;
      }

      let student = createStudent(name, year);
      this.students.push(student);
      return student;
    },

    enrollStudent(student, course) {
      student.addCourse(course);
    },

    addGrade(student, courseCode, grade) {
      let course = student.findCourseByCode(courseCode);
      if (!course) return;

      course.grade = grade;
    },

    getReportCard(student) {
      console.log("");
      student.listCourses().forEach((course) => {
        if (course.grade) {
          console.log(`${course.name}: ${course.grade}`);
        } else {
          console.log(`${course.name}: In progress`);
        }
      });
    },

    courseReport(courseCode) {
      let courseEntries = [];
      this.students.forEach((student) => {
        let course = student.findCourseByCode(courseCode);
        if (course && course.grade !== undefined) {
          courseEntries.push({
            studentName: student.name,
            courseName: course.name,
            courseGrade: course.grade,
          });
        }
      });

      if (courseEntries.length === 0) {
        return undefined;
      }

      let grades = courseEntries.map((course) => course.courseGrade);
      let averageGrade = this.getAverageGrade(grades);

      console.log(" ");
      console.log(`=${courseEntries[0].courseName} Grades=`);
      courseEntries.forEach((course) => {
        console.log(`${course.studentName}: ${course.courseGrade}`);
      });
      console.log("---");
      console.log(`Course Average: ${averageGrade}`);
    },

    getAverageGrade(courseEntries) {
      let totalGrade = courseEntries.reduce((sum, grade) => sum + grade, 0);

      return totalGrade / courseEntries.length;
    },
  };
}

function createStudent(name, year) {
  return {
    name: name,
    year: year,
    courses: [],

    info() {
      console.log(`${this.name} is a ${this.year} year student`);
    },

    addCourse(course) {
      this.courses.push(course);
    },

    listCourses() {
      return this.courses;
    },

    findCourseByCode(courseCode) {
      return this.listCourses().find((course) => course.code === courseCode);
    },

    addNote(code, note) {
      let course = this.courses.find((course) => course.code === code);
      if (!course) return;

      if (course.note) {
        course.note += `; ${note}`;
      } else {
        course.note = note;
      }
    },

    updateNote(code, note) {
      let course = this.courses.find((course) => course.code === code);
      if (!course) return;

      course.note = note;
    },

    viewNotes() {
      this.courses.forEach((course) => {
        if (course.note) {
          console.log(`${course.name}: ${course.note}`);
        }
      });
    },
  };
}

let school = createSchool();

let foo = school.addStudent("Foo", "1st");
let paul = school.addStudent("Paul", "3rd");
let mary = school.addStudent("Mary", "1st");
let kim = school.addStudent("Kim", "2nd");
let mathCourse = { name: "Math", code: 101 };
let advancedMathCourse = { name: "Advanced Math", code: 102 };
let physics = { name: "Physics", code: 202 };
school.enrollStudent(foo, { name: "Math", code: 101 });
school.enrollStudent(foo, { name: "Advanced Math", code: 102 });
school.enrollStudent(foo, { name: "Physics", code: 202 });
school.enrollStudent(paul, { name: "Math", code: 101 });
school.enrollStudent(paul, { name: "Advanced Math", code: 102 });
school.enrollStudent(paul, { name: "Physics", code: 202 });
school.enrollStudent(mary, { name: "Math", code: 101 });
school.enrollStudent(kim, { name: "Math", code: 101 });
school.enrollStudent(kim, { name: "Advanced Math", code: 102 });
school.addGrade(foo, 101, 87);
school.addGrade(foo, 102, 75);
school.addGrade(paul, 101, 95);
school.addGrade(paul, 102, 90);
school.addGrade(mary, 101, 91);
school.addGrade(kim, 101, 93);
school.addGrade(kim, 102, 90);
school.getReportCard(foo);
school.getReportCard(paul);
school.getReportCard(mary);
school.getReportCard(kim);
school.courseReport(101);
school.courseReport(102);
school.courseReport(202);

school.addStudent("Bar", "6th");

/* 
      
      PEDAC for school.courseReport() 

      principle issue with this one is that there is a list of unique courses. Maybe I create a new object, which contains the course
      and all the grades, and then iterates through the list of grades and set a variable course name. But this feels kind wrong, 
      because I'm setting the variable a bunch of times. And then what to do if I can't find a grade? I also need the course name 
      before I start logging the individual grades and then the average. So there's a few things going on in this function. First thing
      is that I need to render the name. then i need to render the individual grades... fuck, with the students name. and then I need to average all the grades. So I need
      to get the list of courses first, perhaps, and then extract the information from that list. So I need to create a list of all the
      courses. I need to use that list to get the name, log the name from the first course in the list. Then I can iterate through the 
      list of courses and log the grade. then I can calculate the average grade and log the average. Thats it. Got it. 
      
      Nope, don't quite got it. I think I need to take a step back and do this out in pseudocode. 

      Input: courseCode
      Output: Course name headline, list of name of student with their corresponding grade for the course, and then the average 
      grade of all students. 

      I almost need a need data structure. I could create a new list, which contains objects with 3 properties: nameOfCourse, nameOfStudent,
      and grade. That gives me everything I need to render the course info. So why dont I do that? Oh, but for the average, I still have 
      to filter the list of grades to just the students that actually have a grade. if there is no grade, then it is 0. 

      Algorithm 
      - Accept course code as an input
      - Declare a variable "courseList"
      - Iterate through the list of students
      - If the student has the course that matches the code:
        - Create a new object with student name from the student, the course name, and the grade
        - add the object to course list
      - Log the course header with the course name from the first element of the courseList array
      - For each element in the course list:
        - Log the name of the student and the grade
      - Compute the average grade of all the students from the course list
      - Log the average grade. 

      */

/*
When to pass around objects vs do lookups: 

Some tradeoffs to think about:

Clarity of responsibility
Passing an identifier (like a name or id) means: “School, you figure out which student this is.”
Passing the object means: “I already know exactly which student I’m talking about; just operate on it.”
In the exercise’s reference solution, they pass the student object because the focus is on using the student API, not on how to look up a student.

Domain modeling
Think about what the natural API reads like:

school.enrollStudent(student, courseName, courseCode);
This reads as: “Enroll this student in this course.”
school.enrollStudent("Paul", { name: "Math", code: 101 });
This reads as: “Enroll whoever has the name "Paul" in this course.”
If your program already has a student object in hand (because you just created it, or you got it from another operation), it often feels more natural and less repetitive to pass the object itself.

Uniqueness and stability
Names may not be unique ("John" can appear many times).
Names can change.
A dedicated ID (like studentId) is usually better if you want to pass identifiers around.
If you don’t have a stable unique id, passing the object directly avoids the question of “what if two students share this name?”.

Who does the lookup?
There are roughly three common patterns:

Callers pass identifiers, and school does the lookup internally (your approach).
Callers pass the full object, and school just uses it (reference approach).
Callers ask school for the object once (e.g., school.findStudentByName or school.findStudentById), then keep and pass that object around afterward.
That third pattern is common: you use an identifier once to fetch, then work with the object itself.

In the context of a larger program
In a bigger system:

It’s very common to pass full objects between parts of your program (e.g., from UI → service → domain object), especially in OO designs.
It’s also common to have “id-based” APIs when you’re at the boundary with something like a database or HTTP API (e.g., GET /students/123).
So inside your application code, passing objects is very normal. At the edges (database, network, etc.), you usually pass ids/identifiers.

Bringing it back to this exercise:

Your school methods (addGrade, enrollStudent) take a name and internally look up the student. That’s completely fine, and your code is clear and readable.
The reference solution chooses to pass the student object instead. This keeps school simpler (no lookup work inside those methods) and makes it explicit that callers must already know which student object they’re dealing with.


You’re thinking about some really important design ideas here, and your questions are spot on for where you are in the course.

First I’ll answer your “edge” / “ids” questions, then relate it briefly to your school code.

About “the edge” and passing ids
When people say “the edge” of an application, they usually mean the places where your code talks to the outside world or where different parts of your system talk to each other. Typical “edges” are:

HTTP requests/responses (e.g., a web API)
Database queries and results
Message queues, files, command line arguments, browser events
Sometimes also the boundary between layers inside your app (e.g., UI ↔ domain logic)
Another way to say it: the edge is the boundary between your core logic and everything else.

Inside your “core” code, you might want to work with rich objects, methods, behavior, etc. But at the boundaries, things are usually simpler, more primitive:

JSON with strings, numbers, arrays, and objects
Database rows with ids and columns
Route parameters like /users/42, where 42 is the id
That’s why people say “pass ids at the edge”:
At the boundary, you identify the thing you care about by its id, and then inside your core logic you look up or load that thing and work with the full object.

Why prefer ids at the edge?
Not because objects are “too big” in some technical sense, but mainly for:

Clarity and responsibility
The edge layer’s job is: “Who is the user asking about?” → “user with id 42”.
The inner layer’s job is: “What does the domain logic do with that user?” → load user, validate, perform actions, etc.
Separating these concerns makes the code easier to understand and change.

Consistency and control
If your core logic always gets a proper User (or Student) object by looking it up, you control how those objects are created and validated in one place.
If you pass big, already-constructed objects across boundaries, it’s easier to end up with half-baked or inconsistent objects (e.g., missing properties, stale data, unexpected shape).
Serialization / data format limitations
At the edge (HTTP, DB, files), you usually can’t send methods, prototypes, or cycles in object graphs.
Identifiers (like an id, code, or name) are simple data that travel cleanly through these systems.
So the rule of thumb is:

At boundaries: use simple identifiers to say which entity you want.
Inside: use the full object to say what you want to do with it.
This is less about cost and more about clean separation of responsibilities.

*/