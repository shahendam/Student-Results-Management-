class Student {

    #grade1;
    #grade2;
    #grade3;
    #attendance;

    constructor(name, grade1, grade2, grade3, attendance) {

        if (!name || !name.trim()) {
            throw new Error("Please enter the student name.");
        }

        this.name = name;

        this.grade1 = grade1;
        this.grade2 = grade2;
        this.grade3 = grade3;
        this.attendance = attendance;
    }

    set grade1(value) {
        this.#grade1 = this.validate(value, "Subject 1");
    }

    set grade2(value) {
        this.#grade2 = this.validate(value, "Subject 2");
    }

    set grade3(value) {
        this.#grade3 = this.validate(value, "Subject 3");
    }

    set attendance(value) {
        this.#attendance = this.validate(value, "Attendance");
    }

    get grade1() {
        return this.#grade1;
    }

    get grade2() {
        return this.#grade2;
    }

    get grade3() {
        return this.#grade3;
    }

    get attendance() {
        return this.#attendance;
    }

    validate(value, fieldName) {

        if (value === "" || value === null ||
            value === undefined) {
            throw new Error(fieldName + " cannot be empty.");
        }

        const number = Number(value);

        if (!Number.isFinite(number) ||
            number < 0 || number > 100) {
            throw new Error(fieldName + " must be between 0 and 100.");
        }

        return number;
    }

    getAverage() {
        return (this.#grade1 + this.#grade2 + this.#grade3) / 3;
    }
}

let studentsList = [];

const studentName = document.getElementById("studentName");

const grade1 = document.getElementById("grade1");
const grade2 = document.getElementById("grade2");
const grade3 = document.getElementById("grade3");

const attendance = document.getElementById("attendance");

const addStudentBtn = document.getElementById("addStudent");

const graceCommitteeBtn =
    document.getElementById("graceCommittee");

const errorMessage =
    document.getElementById("errorMessage");

const studentsDisplay =
    document.getElementById("studentsDisplay");

const finalReport =
    document.getElementById("finalReport");




addStudentBtn.onclick = function () {

    try {

        errorMessage.textContent = "";
        errorMessage.classList.add("d-none");

        const student = new Student(
            studentName.value,
            grade1.value,
            grade2.value,
            grade3.value,
            attendance.value
        );

        studentsList.push(student);

    

        const li = document.createElement("li");

        li.className = "list-group-item";

        li.textContent =
            student.name +
            " | Average: " +
            student.getAverage().toFixed(2) +
            "%";

        studentsDisplay.appendChild(li);

    

        studentName.value = "";
        grade1.value = "";
        grade2.value = "";
        grade3.value = "";
        attendance.value = "";

        finalReport.innerHTML =
            '<p class="text-muted">Activate the grace committee to generate a new report.</p>';

    }

    catch (error) {

        errorMessage.textContent = error.message;

        errorMessage.classList.remove("d-none");

    }

};



graceCommitteeBtn.onclick = function () {



    const strugglingStudents = studentsList.filter(
        student =>
            student.getAverage() >= 40 &&
            student.getAverage() <= 49
    );



    const updatedStudents = strugglingStudents.map(
        student => {

            return {
                name: student.name,
                newAverage: student.getAverage() + 5
            };

        }
    );



    const totalAverage = updatedStudents.reduce(
        (total, student) =>
            total + student.newAverage,
        0
    );



    let generalAverage = 0;

    if (updatedStudents.length > 0) {

        generalAverage =
            totalAverage / updatedStudents.length;

    }



    if (updatedStudents.length === 0) {

        finalReport.innerHTML = `
            <div class="alert alert-info">
                No struggling students found.
            </div>
        `;

    }

    else {

        const studentNames = updatedStudents.map(
            student => `
                <li class="list-group-item">
                    <strong>${student.name}</strong>
                    - New Average:
                    ${student.newAverage.toFixed(2)}%
                </li>
            `
        ).join("");

        finalReport.innerHTML = `

            <div class="alert alert-success">

                <h5>Grace Committee Report</h5>

                <p>
                    <strong>Number of struggling students:</strong>
                    ${updatedStudents.length}
                </p>

                <p><strong>Students Names and New Averages:</strong></p>

                <ul class="list-group mb-3">
                    ${studentNames}
                </ul>

                <h5>
                    General Average After Grace:
                    ${generalAverage.toFixed(2)}%
                </h5>

            </div>

        `;

    }

};