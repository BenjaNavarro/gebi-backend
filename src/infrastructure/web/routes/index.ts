import { Router } from "express";
import { buildUserRouter } from "./user.routes.ts";
import { buildProjectRouter } from "./project.routes.ts";

export function buildApiRouter(): Router {
  const router = Router();

  router.use("/users", buildUserRouter());
  router.use("/projects", buildProjectRouter());

  return router;
}
