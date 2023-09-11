import { Router } from "express";
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

export default router;
