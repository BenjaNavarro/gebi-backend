import { Schema } from "mongoose";

export const LibrarySchema = new Schema(
    {
        id_biblioteca: { type: String, required: true, unique: true },
        nombre: { type: String, required: true, unique: true },
        descripcion: { type: String, required: false },
        estado: { type: Boolean, required: true },
    },
    { timestamps: true },
);