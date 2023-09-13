import { Router } from "express";
import express from "express";
import fs from "fs";

const router = Router();

router.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/templates/index.html");
});

router.get("/all-tasks", (req, res) => {
  const jsonFileTAsks = fs.readFileSync(
    process.cwd() + "/mocks/tasks.json",
    "utf8"
  );
  const parsedTasks = JSON.parse(jsonFileTAsks);
  res.json(parsedTasks);
});

router.get("/{id}", (req, res) => {});

router.post("/new-task", express.json(), (req, res) => {
  let newListArray = [];
  let parsedTasks = req.body.tasksList;
  for (let key in parsedTasks) {
    newListArray.push(parsedTasks[key]);
  }
  newListArray.unshift(req.body.newTask);
  fs.writeFileSync(
    process.cwd() + "/mocks/tasks.json",
    JSON.stringify(newListArray, null, 4)
  );
  res.json(newListArray);
});

export default router;
