import { Schema, model, type InferSchemaType, type HydratedDocument } from 'mongoose';

export const ProjectStateSchema = new Schema({
    nombre: { type: String, required: true, unique: true },
    descripcion: { type: String, required: false },
    estado: { type: Boolean, required: true },
},{
    timestamps: true,
});

export type ProjectState = InferSchemaType<typeof ProjectStateSchema>;
export type ProjectStateDoc = HydratedDocument<ProjectState>;
export const ProjectStateModel = model<ProjectState>("ProjectState", ProjectStateSchema);