async function getAllTasks() {
  const tasksList = await (await fetch("/all-tasks")).json();
  updateTaskList(tasksList);
}

function updateTaskList(tasksList) {
  let list = document.getElementById("task-list");
  for (key in tasksList) {
    let task = tasksList[key];
    let li = document.createElement("li");
    li.classList.add("task");
    let span = document.createElement("span");
    span.textContent = task.title;
    let img = document.createElement("img");
    if (task.state === "to do") {
      li.classList.add("to-do-task");
      img.src = "public/logos/unchecked_box.svg";
    } else {
      li.classList.add("done-task");
      img.src = "public/logos/checked_box.svg";
    }
    li.appendChild(span);
    li.appendChild(img);
    list.appendChild(li);
  }
}

getAllTasks();
