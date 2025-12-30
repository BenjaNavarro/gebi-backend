import express, { type Application, type Request } from "express";
import cors from "cors";
import morgan from "morgan";

import { buildApiRouter } from "./routes/index.ts";

export declare interface ExpressApplication extends Application {
  listen(port: number, hostname?: string, backlog?: number, callback?: () => void): Application;
  listen(port: number, hostname?: string, callback?: () => void): Application;
  listen(port: number, backlog?: number, callback?: () => void): Application;
  listen(port: number, callback?: () => void): Application;

  use(middleware: express.RequestHandler): Application;
  use(path: string, middleware: express.RequestHandler): Application;

  get(path: string, handler: express.RequestHandler): Application;
}

export declare interface _Request extends Request {
  query: { [key: string]: string | undefined };
  params: { [key: string]: string };
  body: { [key: string]: unknown };
}

export declare interface _Response extends express.Response {
  status(code: number): _Response;
  json(data: unknown): _Response;
  send(data?: unknown): _Response;
}

export class ExpressServer {
  private readonly app: ExpressApplication;

  constructor() {
    this.app = express();

    this.setupMiddlewares();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  private setupMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json({ limit: "10mb" }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan("dev"));
  }

  private setupRoutes() {
    this.app.get("/health", (_req: _Request, res: _Response) => res.status(200).json({ ok: true }));

    this.app.use("/api", buildApiRouter());
  }

  private setupErrorHandling() {
    // 404
    this.app.use((_req: _Request, res: _Response) => {
      res.status(404).json({ message: "Not Found" });
    });

    // error handler
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.app.use((err: unknown, _req: _Request, res: _Response, _next: express.NextFunction) => {
      console.error("[API error]", err);
      res.status(500).json({ message: "Internal Server Error" });
    });
  }

  listen(port: number) {
    this.app.listen(port, () => {
      console.log(`[Express] listening on port ${port}`);
    });
  }
}
