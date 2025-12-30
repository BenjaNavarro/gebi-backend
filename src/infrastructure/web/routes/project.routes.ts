import { Router } from "express";
import { ProjectController } from "../../../interfaces/controllers/project.controller.ts";
import { _Request, _Response } from "../ExpressServer.ts";

export function buildProjectRouter(): Router {
  const router = Router();
  const controller = new ProjectController();

  router.get("/", (req: _Request, res: _Response) => controller.list(req, res));
  router.get("/:id", (req: _Request, res: _Response) => controller.getById(req, res));
  router.post("/", (req: _Request, res: _Response) => controller.create(req, res));
  router.put("/:id", (req: _Request, res: _Response) => controller.update(req, res));
  router.delete("/:id", (req: _Request, res: _Response) => controller.remove(req, res));
  return router;
}
