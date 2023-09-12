let tasksList = [];

async function getAllTasks() {
  const parsedTasks = await (await fetch("/all-tasks")).json();
  for (let key in parsedTasks) {
    tasksList.push(parsedTasks[key]);
  }
  displayTaskList(tasksList);
}

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

function crossTask(task) {
  let img = document.getElementById(`logo-${task.id}`);
  let li = document.getElementById(`li-${task.id}`);

  if (task.state === "to do") {
    li.classList.remove("to-do-task");
    li.classList.add("done-task");
    task.state = "done";
    img.src = "public/logos/checked_box.svg";
  } else {
    console.log("Task is already completed");
  }
  changeTaskPosition(task);
}

function changeTaskPosition(task) {
  let taskIndex = tasksList.findIndex((e) => e.id === task.id);
  tasksList.splice(taskIndex, 1);
  tasksList.push(task);
  clearDisplayedList();
  displayTaskList(tasksList);
  toggleDeployTask(task);
}

function clearDisplayedList() {
  let ul = document.getElementById("task-list");
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
}
function toggleDeployTask(task) {
  let description = document.getElementById(`desc-${task.id}`);
  if (description.style.display === "none") {
    description.style.display = "block";
  } else {
    description.style.display = "none";
  }
}

getAllTasks();
