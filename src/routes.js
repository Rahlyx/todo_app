import { Router } from "express";
import express from "express";
import { listOfTasks, listOfId } from "../mocks/mockedData.js";

const router = Router();

router.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/templates/index.html");
});

router.get("/all-tasks", (req, res) => {
  res.json(listOfTasks);
});

router.get("/all-tasks-id", (req, res) => {
  res.json(listOfId);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  for (let task in listOfTasks) {
    if (listOfTasks[task].id === parseInt(id)) {
      res.json(listOfTasks[task]);
      break;
    }
  }
});

router.post("/new-task", express.json(), (req, res) => {
  const newTask = {
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    state: req.body.state,
  };
  listOfTasks.unshift(newTask);
  res.json(listOfTasks);
});

router.post("/add-id", express.json(), (req, res) => {
  res.json(listOfId);
});

router.post("/change-task-state", express.json(), (req, res) => {
  let taskUpdated = req.body;
  taskUpdated.state = "done";
  let taskIndex = listOfTasks.findIndex((v) => v.id === req.body.id);
  if (taskIndex === -1)
    return res.status(401).json({ error: "resource not found" });
  listOfTasks.splice(taskIndex, 1);
  listOfTasks.push(taskUpdated);
  res.json(listOfTasks);
});

export default router;
