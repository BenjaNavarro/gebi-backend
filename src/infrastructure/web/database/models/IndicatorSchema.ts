import { Schema, model, type InferSchemaType, type HydratedDocument } from 'mongoose';

export const IndicatorSchema = new Schema({
    nombre: { type: String, required: true, unique: true },
    descripcion: { type: String, required: false },
    estado: { type: Boolean, required: true },
    nivelComplejidad: { type: Number, required: true },
},{
    timestamps: true,
});

export type Indicator = InferSchemaType<typeof IndicatorSchema>;
export type IndicatorDoc = HydratedDocument<Indicator>;
export const IndicatorModel = model<Indicator>("Indicator", IndicatorSchema);