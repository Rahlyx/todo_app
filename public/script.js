let tasksList = [];

/**
 * Request that goes retrieve data from the server on JSON file
 */
async function getAllTasks() {
  const parsedTasks = await (await fetch("/all-tasks")).json();
  for (let key in parsedTasks) {
    tasksList.push(parsedTasks[key]);
  }
  displayTaskList(tasksList);
}

/**
 * Display the entire list of tasks by creating HTML with JS
 * @param {array} tasksList
 */
function displayTaskList(tasksList) {
  let list = document.getElementById("task-list");
  for (key in tasksList) {
    let task = tasksList[key];
    let li = document.createElement("li");
    li.classList.add("task");

    let taskHeader = document.createElement("div");
    taskHeader.classList.add("task-header");

    let todoTitle = document.createElement("span");
    todoTitle.textContent = task.title;

    let img = document.createElement("img");
    if (task.state === "to do") {
      li.classList.add("to-do-task");
      img.src = "public/logos/unchecked_box.svg";
    } else {
      li.classList.add("done-task");
      img.src = "public/logos/checked_box.svg";
    }
    li.setAttribute("id", `li-${task.id}`);
    li.addEventListener("click", () => {
      toggleDeployTask(task);
    });

    let description = document.createElement("p");
    description.textContent = task.description;
    description.classList.add("task-description");
    description.style.display = "none";
    description.setAttribute("id", `desc-${task.id}`);

    img.setAttribute("id", `logo-${task.id}`);
    img.addEventListener("click", () => {
      crossTask(task);
    });
    taskHeader.appendChild(todoTitle);
    taskHeader.appendChild(img);
    li.appendChild(taskHeader);
    li.appendChild(description);
    list.appendChild(li);
  }
}

/**
 * Check the task box to change its state
 * Fix bug when restarting browser (data is not saved here)
 * @param {Object} task
 * return {void}
 */
function crossTask(task) {
  let img = document.getElementById(`logo-${task.id}`);
  let li = document.getElementById(`li-${task.id}`);

  if (task.state === "to do") {
    li.classList.remove("to-do-task");
    li.classList.add("done-task");
    task.state = "done";
    img.src = "public/logos/checked_box.svg";
    changeTaskPosition(task);
  } else {
    console.log("Task is already completed");
  }
}

/**
 * Change the task position to the end of the list and display it
 * @param {Object} task
 * return {void}
 */
function changeTaskPosition(task) {
  let taskIndex = tasksList.findIndex((e) => e.id === task.id);

  // tasksList.splice(taskIndex, 1);
  // tasksList.push(task);
  tasksList.push(tasksList.splice(taskIndex, 1)[0]);
  clearDisplayedList();
  displayTaskList(tasksList);

  toggleDeployTask(task);
}

/**
 * Clear the displayed list to avoid array duplication
 */
function clearDisplayedList() {
  let ul = document.getElementById("task-list");
  // while (ul.firstChild) {
  //   ul.removeChild(ul.firstChild);
  // }
  ul.innerHTML = "";
}

/**
 * Allow to display the task description
 * @param {*} task
 * return {void}
 */
function toggleDeployTask(task) {
  let description = document.getElementById(`desc-${task.id}`);
  if (description.style.display === "none") {
    description.style.display = "block";
  } else {
    description.style.display = "none";
  }
}

let newTaskButton = document.getElementById("new-task-button");
newTaskButton.addEventListener("click", () => {
  displayTaskForm(newTaskButton);
});

/**
 * Display the task form by clicking on the new task button
 * @param {object} newTaskButton
 * return {void}
 */
function displayTaskForm(newTaskButton) {
  let form = document.getElementById("task-form");
  let taskList = document.getElementById("task-list");
  if (newTaskButton.textContent === "New task") {
    form.style.display = "flex";
    taskList.style.maxHeight = "50vh";
    newTaskButton.textContent = "Cancel";
  } else {
    newTaskButton.textContent = "New task";
    form.reset();
    form.style.display = "none";
    taskList.style.maxHeight = "70vh";
  }
}

let form = document.getElementById("task-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let title = document.getElementById("form-title").value;
  let description = document.getElementById("form-description").value;
  form.reset();
  createNewTAsk(tasksList, title, description);
});

/**
 * Send a new task on the server to save it on JSON file
 * @param {array} tasksList
 * @param {string} title
 * @param {string} description
 */
function createNewTAsk(tasksList, title, description) {
  let newTask = {
    id: tasksList.length + 1,
    title: title,
    description: description,
    state: "to do",
  };
  try {
    fetch("/new-task", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newTask, tasksList }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        document.getElementById("task-list").innerHTML = "";
        tasksList = data;
        clearDisplayedList();
        displayTaskList(data);
      });
  } catch (error) {
    console.log("Error : ", error);
  }
}

getAllTasks();
