import { Schema } from 'mongoose';

export const SourceSchema = new Schema({
    nombre: { type: String, required: true, unique: true },
    descripcion: { type: String, required: false },
    estado: { type: Boolean, required: true },
},{
    timestamps: true,
});