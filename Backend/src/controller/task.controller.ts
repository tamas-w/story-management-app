import { Request, Response } from "express";
import { Task } from "../entity/task.entity";

interface TaskBody {
  project: string;
  short_description: string;
  description?: string;
  assignedTo?: string;
}

export const getAll = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    return res.json(tasks);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneBy({ id: parseInt(id) });

    if (!task) return res.status(404).json({ message: "Task not found" });
    return res.json(task);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const createTask = async (
  req: Request<unknown, unknown, TaskBody>,
  res: Response
) => {
  const { project, short_description } = req.body;
  if (!project || !short_description) {
    return res
      .status(418)
      .json({ message: "Project name and shot descriptions in mandatory!" });
  }

  const task = new Task();
  task.project = project;
  task.short_description = short_description;
  await task.save();
  return res.json(task);
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const task = await Task.findOneBy({ id: parseInt(id) });
    if (!task) return res.status(404).json({ message: "Not user found" });

    await Task.update({ id: parseInt(id) }, req.body);

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await Task.delete({ id: parseInt(id) });

    if (result.affected === 0)
      return res.status(404).json({ message: "Task not found" });

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
