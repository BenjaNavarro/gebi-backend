import { Schema } from "mongoose";

export const IndicatorSchema = new Schema({
    nombre: { type: String, required: true, unique: true },
    descripcion: { type: String, required: false },
    estado: { type: Boolean, required: true },
    nivelComplejidad: { type: Number, required: true },
},{
    timestamps: true,
});