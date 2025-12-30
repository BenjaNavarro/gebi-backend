import { Router } from "express";
import { AuthorController } from "../../../interfaces/controllers/authors.controller.ts";
import { _Request, _Response } from "../ExpressServer.ts";

export function buildAuthorRouter(): Router {
  const router = Router();
  const controller = new AuthorController();

  router.get("/", (req: _Request, res: _Response) => controller.list(req, res));
  router.get("/:id", (req: _Request, res: _Response) => controller.getById(req, res));
  router.post("/", (req: _Request, res: _Response) => controller.create(req, res));
  router.put("/:id", (req: _Request, res: _Response) => controller.update(req, res));
  router.patch("/:id/estado", (req: _Request, res: _Response) => controller.setEstado(req, res)); // toggle estado
  router.delete("/:id", (req: _Request, res: _Response) => controller.remove(req, res));

  return router;
}
