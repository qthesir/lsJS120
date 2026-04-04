function createSchool() {
  // Where is the right place to put allowed years const? Where to put static variables on factories?
  // Cant recall.

  const ALLOWED_YEARS = ["1st", "2nd", "3rd", "4th", "5th"];
  return {
    students: [],

    addStudent(name, year) {
      if (!ALLOWED_YEARS.includes(year)) {
        console.log("Invalid Year");
        return;
      }

      let student = createStudent(name, year);
      this.students.push(student);
    },

    enrollStudent(studentName, course) {
      let student = this.findStudentByName(studentName);
      student.addCourse(course);
    },

    addGrade(studentName, courseCode, grade) {
      let student = this.findStudentByName(studentName);
      let course = student.findCourseByCode(courseCode);

      course.grade = grade;
    },

    getReportCard(studentName) {
      console.log("");
      let student = this.findStudentByName(studentName);
      student.listCourses().forEach((course) => {
        if (course.grade) {
          console.log(`${course.name}: ${course.grade}`);
        } else {
          console.log(`${course.name}: In progress`);
        }
      });
    },

    courseReport(courseCode) {
      let courseList = [];
      this.students.forEach((student) => {
        let course = student.findCourseByCode(courseCode);
        if (course) {
          courseList.push({
            studentName: student.name,
            courseName: course.name,
            courseGrade: course.grade,
          });
        }
      });

      let averageGrade = this.getAverageGrade(courseList);
      if (!averageGrade) {
        return undefined;
      }

      console.log(" ");
      console.log(`=${courseList[0].courseName} Grades=`);
      courseList.forEach((course) => {
        console.log(`${course.studentName}: ${course.courseGrade}`);
      });
      console.log("---");
      console.log(`Course Average: ${averageGrade}`);
    },

    getAverageGrade(courseList) {
      let gradeList = courseList.filter((course) => {
        return course.courseGrade;
      });

      if (gradeList.length === 0) {
        return undefined;
      }

      let totalGrade = gradeList.reduce((totalGrade, { courseGrade }) => {
        totalGrade += courseGrade;
        return totalGrade;
      }, 0);

      return totalGrade / gradeList.length;
    },

    findStudentByName(studentName) {
      return this.students.find((student) => student.name === studentName);
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

      course.note = [note];
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

school.addStudent("Foo", "1st");
school.addStudent("Paul", "3rd");
school.addStudent("Mary", "1st");
school.addStudent("Kim", "2nd");
let mathCourse = { name: "Math", code: 101 };
let advancedMathCourse = { name: "Advanced Math", code: 102 };
let physics = { name: "Physics", code: 202 };
school.enrollStudent("Foo", { name: "Math", code: 101 });
school.enrollStudent("Foo", { name: "Advanced Math", code: 102 });
school.enrollStudent("Foo", { name: "Physics", code: 202 });
school.enrollStudent("Paul", { name: "Math", code: 101 });
school.enrollStudent("Paul", { name: "Advanced Math", code: 102 });
school.enrollStudent("Paul", { name: "Physics", code: 202 });
school.enrollStudent("Mary", { name: "Math", code: 101 });
school.enrollStudent("Kim", { name: "Math", code: 101 });
school.enrollStudent("Kim", { name: "Advanced Math", code: 102 });
school.addGrade("Foo", 101, 87);
school.addGrade("Foo", 102, 75);
school.addGrade("Paul", 101, 95);
school.addGrade("Paul", 102, 90);
school.addGrade("Mary", 101, 91);
school.addGrade("Kim", 101, 93);
school.addGrade("Kim", 102, 90);
school.getReportCard("Foo");
school.getReportCard("Paul");
school.getReportCard("Mary");
school.getReportCard("Kim");
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