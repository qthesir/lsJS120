function createSchool() {
  return {
    students: [],

    addStudent(name, year) {
      let student = createStudent(name, year);
      this.students.push(student);
    },

    enrollStudent(studentName, course) {
      let student = this.findStudentByName(studentName);
      student.addCourse(course);
    },

    addGrade(studentName, courseCode, grade) {
      let student = this.findStudentByName(studentName);
      let course = student
        .listCourses()
        .find((course) => course.code === courseCode);

      course.grade = grade;
    },

    getReportCard(studentName) {
      let student = this.findStudentByName(studentName);
      student.listCourses.forEach((course) => {
        if (course.grade) {
          console.log(`${course.name}: ${course.grade}`);
        } else {
          console.log(`${course.name}: In progress`);
        }
      });
    },

    courseReport() {},

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
