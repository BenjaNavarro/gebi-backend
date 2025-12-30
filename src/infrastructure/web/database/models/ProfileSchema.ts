import { Schema, model, type InferSchemaType, type HydratedDocument } from 'mongoose';

export const ProfileSchema = new Schema({
    nombre: { type: String, required: true, unique: true },
    descripcion: { type: String, required: false },
    estado: { type: Boolean, required: true },
},
{
    timestamps: true,
});

export type Profile = InferSchemaType<typeof ProfileSchema>;
export type ProfileDoc = HydratedDocument<Profile>;
export const ProfileModel = model<Profile>('Profiles', ProfileSchema);