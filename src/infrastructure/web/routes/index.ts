import { Router } from "express";
import { buildUserRouter } from "./user.routes.ts";
import { buildProjectRouter } from "./project.routes.ts";
import { buildAuthorRouter } from "./author.routes.ts";
import { buildSourceRouter } from "./source.routes.ts";
import { buildStateRouter } from "./state.routes.ts";
import { buildIndicatorRouter } from "./indicator.routes.ts";

export function buildApiRouter(): Router {
  const router = Router();

  router.use("/users", buildUserRouter());
  router.use("/projects", buildProjectRouter());
  router.use("/authors", buildAuthorRouter());
  router.use("/sources", buildSourceRouter());
  router.use("/states", buildStateRouter());
  router.use("/indicators", buildIndicatorRouter());
  
  return router;
}