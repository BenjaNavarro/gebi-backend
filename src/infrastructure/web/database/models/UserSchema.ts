import mongoose from "mongoose";
import { Schema, model, type InferSchemaType, type HydratedDocument } from 'mongoose';
//eslint-disable-next-line @typescript-eslint/no-unused-vars
import _paginate from 'mongoose-paginate-v2';

export const UserSchema = new Schema({
    idUsuario: { type: String, required: true, unique: true },
    nombres: { type: String, required: true },
    apaterno: { type: String, required: true },
    amaterno: { type: String, required: false },
    correo: { type: String, required: true, unique: true },
    estado: { type: Boolean, required: true },
    rut: { type: String, required: true, unique: true },
    perfil: { type: Schema.Types.ObjectId, ref: 'Perfil', required: true },
    biblioteca: { type: Schema.Types.ObjectId, ref: 'Biblioteca', required: false }
},
{
    timestamps: true,
});

export type User = InferSchemaType<typeof UserSchema>;
export type UserDoc = HydratedDocument<User>;
export const UserModel = model<User, mongoose.PaginateModel<User>>("User", UserSchema);