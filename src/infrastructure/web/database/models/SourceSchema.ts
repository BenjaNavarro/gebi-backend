import { Schema, model, type InferSchemaType, type HydratedDocument } from 'mongoose';

export const SourceSchema = new Schema({
    nombre: { type: String, required: true, unique: true },
    descripcion: { type: String, required: false },
    estado: { type: Boolean, required: true },
},{
    timestamps: true,
});

export type Source = InferSchemaType<typeof SourceSchema>;
export type SourceDoc = HydratedDocument<Source>;
export const SourceModel = model<Source>('Sources', SourceSchema);