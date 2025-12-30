import { Schema, model, type InferSchemaType } from 'mongoose';

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

export type UserDoc = InferSchemaType<typeof UserSchema>;
export const UserModel = model("User", UserSchema);