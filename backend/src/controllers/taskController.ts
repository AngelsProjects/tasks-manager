import { Request, Response, NextFunction } from 'express';
import { Task } from '../models/task';
import AppError from '../utils/errorHandler';
import { v4 as uuidv4 } from 'uuid';

let tasks: Task[] = [];

export const getTasks = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(tasks);
  } catch (error) {
    next(new AppError('Failed to fetch tasks', 500));
  }
};

export const addTask = (req: Request, res: Response, next: NextFunction) => {
  const { title, status } = req.body;

  if (!title || !['pending', 'completed'].includes(status)) {
    return next(new AppError('Invalid task data', 400));
  }

  const newTask: Task = { id: uuidv4(), title, status };
  tasks.push(newTask);
  res.status(201).json(newTask);
};

export const updateTask = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { title, status } = req.body;

  const task = tasks.find((task) => task.id === id);
  if (!task) return next(new AppError('Task not found', 404));

  if (title) task.title = title;
  if (status && ['pending', 'completed'].includes(status)) {
    task.status = status;
  } else if (status) {
    return next(new AppError('Invalid status', 400));
  }

  res.json(task);
};

export const deleteTask = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) return next(new AppError('Task not found', 404));

  tasks.splice(taskIndex, 1);
  res.status(204).end();
};
