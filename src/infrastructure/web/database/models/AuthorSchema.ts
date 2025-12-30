import { Schema, model, type InferSchemaType, type HydratedDocument } from 'mongoose';

export const AuthorSchema = new Schema({
    idNameICYT: { type: String, required: true, unique: false },
    idNameICYTAnterior: { type: String, required: false },
    codPers: { type: Number, required: true },
    rut: { type: String, required: true },
    nombres: { type: String, required: true },
    apaterno: { type: String, required: true },
    amaterno: { type: String, required: false },
    nombreCompleto: { type: String, required: false },
    nombrePreferido: { type: String, required: false },
    genero: { type: String, enum: ["male", "female"], required: false },
    categoriaAcademica: { type: String, required: false },
    uaCod: { type: String, required: false },
    unidadAcademica: { type: String, required: false },
    correo: { type: String, required: true },
    origen: { type: String, required: false },
    anio: { type: Number, required: false },
    periodo: { type: String, required: false },
    tipoContrato: { type: String, required: false },
    fechaFinDn: { type: Date, required: false },
    nacionalidad: { type: String, required: false },
    categoriaDocente: { type: String, required: false },
    orcid: { type: String, required: false },
    afiliacionUC: { type: Boolean, required: false },
    otrasAfiliaciones: { type: [String], required: false },
    observaciones: { type: String, required: false },
    estado: { type: Boolean, required: true },
},
{
    timestamps: true,
});

export type Author = InferSchemaType<typeof AuthorSchema>;
export type AuthorDoc = HydratedDocument<Author>;
export const AuthorModel = mongoose.models.Author ?? model<Author>("Author", AuthorSchema);