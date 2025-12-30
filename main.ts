import { connectDB } from "./src/infrastructure/web/database/Database.ts";
import { ExpressServer } from "./src/infrastructure/web/ExpressServer.ts";

const PORT = Number(Deno.env.get("PORT") ?? "3000");

await connectDB();

const server = new ExpressServer();
server.listen(PORT);