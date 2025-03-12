document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    let errorMsg = document.getElementById("errorMsg");

    if (taskText.length < 3) {
        errorMsg.innerText = "Task must be at least 3 characters!";
        errorMsg.style.display = "block";
        taskInput.style.border = "1px solid red";
        return;
    }

    errorMsg.style.display = "none";
    taskInput.style.border = "";

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let newTask = { text: taskText, completed: false };
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";
    displayTasks();
}

function displayTasks(filter = "all") {
    let taskList = document.getElementById("taskList");
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        if (filter === "active" && task.completed) return;
        if (filter === "completed" && !task.completed) return;

        let li = document.createElement("li");

        let taskText = document.createElement("span");
        taskText.innerText = task.text;
        taskText.className = task.completed ? "completed" : "";

        let buttonGroup = document.createElement("div");
        buttonGroup.className = "button-group";

        let completeBtn = document.createElement("button");
        completeBtn.innerText = task.completed ? "Undo" : "Complete";
        completeBtn.className = "complete-btn";
        completeBtn.onclick = () => toggleTask(index);

        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "X";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = (event) => {
            event.stopPropagation();
            deleteTask(index);
        };

        buttonGroup.appendChild(completeBtn);
        buttonGroup.appendChild(deleteBtn);

        li.appendChild(taskText);
        li.appendChild(buttonGroup);
        taskList.appendChild(li);
    });

    updateCounter();
}

function toggleTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function filterTasks(filter) {
    displayTasks(filter);
}

function updateCounter() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let remainingTasks = tasks.filter(task => !task.completed).length;
    document.getElementById("taskCounter").innerText = `Tasks remaining: ${remainingTasks}`;
}

function clearAllTasks() {
    localStorage.removeItem("tasks");
    displayTasks();
}

function loadTasks() {
    displayTasks();
}
