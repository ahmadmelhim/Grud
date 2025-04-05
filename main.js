const name = document.querySelector("#courseName");
const Category = document.querySelector("#courseCategory");
const Price = document.querySelector("#coursePrice");
const Description = document.querySelector("#courseDescription");
const Capacity = document.querySelector("#courseCapacity");
const addbtn = document.querySelector("#click");
let courses = [];
let editIndex = -1;

if (localStorage.getItem("courses") !== null) {
    courses = JSON.parse(localStorage.getItem("courses"));
    displaycourses();
}

addbtn.addEventListener("click", (e) => {
    e.preventDefault();
    const course = {
        name: name.value,
        Category: Category.value,
        Price: Price.value,
        Description: Description.value,
        Capacity: Capacity.value,
    };

    if (editIndex === -1) {
        courses.push(course);
        Swal.fire({
            title: "Course Added!",
            text: "New course is added!",
            icon: "success"
        });
    } else {
        courses[editIndex] = course;
        Swal.fire({
            title: "Course Updated!",
            text: "The course has been updated.",
            icon: "success"
        });
        editIndex = -1;
        addbtn.textContent = "Add Course";
    }

    localStorage.setItem("courses", JSON.stringify(courses));
    displaycourses();
    clearForm();
});

function displaycourses() {
    const result = courses.map((course, index) => {
        return `
        <tr>
            <td>${index}</td>
            <td>${course.name}</td>
            <td>${course.Category}</td>
            <td>${course.Price}</td>
            <td>${course.Description}</td>
            <td>${course.Capacity}</td>
            <td><button onclick="editCourse(${index})">Update</button></td>
            <td><button onclick="deleteCourse(${index})">Delete</button></td>
        </tr>
        `;
    }).join('');
    document.querySelector("#data").innerHTML = result;
}

function deleteCourse(index) {
    Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to get this course back!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel"
    }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(index, 1);
            localStorage.setItem("courses", JSON.stringify(courses));
            displaycourses();
            Swal.fire("Deleted!", "The course has been successfully deleted.", "success");
        }
    });
}

function editCourse(index) {
    const course = courses[index];
    name.value = course.name;
    Category.value = course.Category;
    Price.value = course.Price;
    Description.value = course.Description;
    Capacity.value = course.Capacity;
    editIndex = index; 
    addbtn.textContent = "Update Course"; 
}

function clearForm() {
    name.value = "";
    Category.value = "";
    Price.value = "";
    Description.value = "";
    Capacity.value = "";
}
