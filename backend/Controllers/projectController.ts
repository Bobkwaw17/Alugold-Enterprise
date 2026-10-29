import { Request, Response, NextFunction, RequestHandler } from "express";
import Project from "../Models/Project";
import { requireFields } from "../Utils/validate";

export const getAllProjects: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projects = await Project.find();
    res.json({ status: "success", data: projects });
  } catch (error) {
    next(error);
  }
};

export const getProjectById: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      res.status(404).json({ status: "error", data: { message: "Project not found" } });
      return;
    }
    res.json({ status: "success", data: project });
  } catch (error) {
    next(error);
  }
};

export const createProject: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    requireFields(req.body, ["name", "serviceType", "description"]);
    const { name, serviceType, description, status, progress, phase, nextMilestone } = req.body;
    const project = await Project.create({ name, serviceType, description, status, progress, phase, nextMilestone, owner: req.user?._id });
    res.status(201).json({ status: "success", data: project });
  } catch (error) {
    next(error);
  }
};

export const updateProject: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) {
      res.status(404).json({ status: "error", data: { message: "Project not found" } });
      return;
    }
    res.json({ status: "success", data: project });
  } catch (error) {
    next(error);
  }
};
