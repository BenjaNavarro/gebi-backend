// src/infrastructure/web/routes/user.routes.ts
import { Router } from "express";
import { UserController } from "../../../interfaces/controllers/UserController.ts";
import { _Request, _Response } from "../ExpressServer.ts";

export function buildUserRouter(): Router {
  const router = Router();
  const controller = new UserController();

  router.get("/", (req: _Request, res: _Response) => controller.list(req, res));
  router.get("/:id", (req: _Request, res: _Response) => controller.getById(req, res));
  router.post("/", (req: _Request, res: _Response) => controller.create(req, res));
  router.put("/:id", (req: _Request, res: _Response) => controller.update(req, res));
  router.delete("/:id", (req: _Request, res: _Response) => controller.remove(req, res));
  return router;
}
