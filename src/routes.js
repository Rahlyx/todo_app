import { Router } from "express";
import myTasks from "./tasks.js";

const router = Router();

router.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/templates/index.html");
});

router.get("/all-tasks", (req, res) => {
  res.json(myTasks);
});

export default router;
