import fs from "fs";

let myTasks = [];

const mockedTasks = fs.readFileSync(
  process.cwd() + "/mocks/tasks.json",
  "utf8"
);
const parsedTasks = JSON.parse(mockedTasks);

for (let key in parsedTasks) {
  myTasks.push(parsedTasks[key]);
}

export default myTasks;
