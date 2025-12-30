import { Schema, model, type InferSchemaType, type HydratedDocument } from 'mongoose';

export const ClientUnitSchema = new Schema(
    {
        nombre: { type: String, required: true },
        descripcion: { type: String, required: false },
        estado: { type: Boolean, required: true },
    },
    { timestamps: true },
);

export type ClientUnit = InferSchemaType<typeof ClientUnitSchema>;
export type ClientUnitDoc = HydratedDocument<ClientUnit>;
export const ClientUnitModel = model<ClientUnit>("ClientUnit", ClientUnitSchema);