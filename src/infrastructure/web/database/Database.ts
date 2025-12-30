// src/infrastructure/web/database/Database.ts
import mongoose, { type Model, type Schema } from "mongoose";

import { UserSchema } from "./models/UserSchema.ts";
import { ProfileSchema } from "./models/ProfileSchema.ts";
import { SourceSchema } from "./models/SourceSchema.ts";
import { ProjectSchema } from "./models/ProjectSchema.ts";
import { AuthorsByProjectSchema } from "./models/AuthorsByProjectSchema.ts";
import { LibrarySchema } from "./models/LibrarySchema.ts";
import { AuthorSchema } from "./models/AuthorSchema.ts";
import { ProjectStateSchema } from "./models/StateSchema.ts";
import { ProductTypeSchema } from "./models/ProductYpeSchema.ts";
import { IndicatorSchema } from "./models/IndicatorSchema.ts";
import { ClientUnitSchema } from "./models/ClientUnitSchema.ts";

const MONGO_URI = Deno.env.get("MONGO_URI") ?? "mongodb+srv://bnavarro:Qwerty123@testcluster.ek2w8oq.mongodb.net/icyt";

function registerModel<T = unknown>(name: string, schema: Schema): Model<T> {
  // Si ya existe, reutiliza. Si no, registra.
  return mongoose.models[name] ?? mongoose.model<T>(name, schema);
}

export async function connectDB(): Promise<void> {
  try {
    // Conexión idempotente
    if (mongoose.connection.readyState === 1) {
      // 1 = connected
      return;
    }

    await mongoose.connect(MONGO_URI);

    registerModel("User", UserSchema);
    registerModel("Profile", ProfileSchema);
    registerModel("Source", SourceSchema);
    registerModel("Project", ProjectSchema);
    registerModel("AuthorsByProject", AuthorsByProjectSchema);
    registerModel("Library", LibrarySchema);
    registerModel("Author", AuthorSchema);
    registerModel("ProjectState", ProjectStateSchema);
    registerModel("ProductType", ProductTypeSchema);
    registerModel("Indicator", IndicatorSchema);
    registerModel("ClientUnit", ClientUnitSchema);

    console.log("✅ MongoDB connected:", MONGO_URI);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
}

// Helpers: evita repetir strings por todo el código
export const Models = {
  User: () => mongoose.model("User"),
  Project: () => mongoose.model("Project"),
  Profile: () => mongoose.model("Profile"),
  // agrega los que quieras…
} as const;
