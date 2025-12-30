import { Schema } from "mongoose";

export const ProductTypeSchema = new Schema(
    {
        idTipoProducto: { type: String, required: true, unique: true },
        nombre: { type: String, required: true },
        descripcion: { type: String, required: false },
        estado: { type: Boolean, required: true },
    },
    { timestamps: true },
);