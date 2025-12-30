import { Schema, model, type InferSchemaType } from 'mongoose';

export const ProfileSchema = new Schema({
    nombre: { type: String, required: true, unique: true },
    descripcion: { type: String, required: false },
    estado: { type: Boolean, required: true },
},
{
    timestamps: true,
});

export type Profile = InferSchemaType<typeof ProfileSchema>;
export const ProfileModel = model<Profile>('Profiles', ProfileSchema);