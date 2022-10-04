import { Router } from "express";
import {
  getAll,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controller/task.controller";

const router = Router();

router.get("/task", getAll);

router.get("/task/:id", getTask);

router.post("/task", createTask);

router.put("/task/:id", updateTask);

router.delete("/task/:id", deleteTask);

export default router;
