import { Schema, model, type InferSchemaType, type HydratedDocument } from 'mongoose';

export const ProjectSchema = new Schema(
  {
    idProyecto: { type: Number, required: true, unique: true },
    idIb: { type: String, required: true, unique: true, maxlength: 50 },
    nombre: { type: String, required: true, maxlength: 255 },
    entrega: { type: String, required: false, maxlength: 10 },
    clienteSolicitante: { type: String, required: false, maxlength: 100 },
    clienteArea: { type: String, required: false, maxlength: 255 },
    cantidadAutores: { type: Number, required: true },
    afiliacionSoloUC: { type: Boolean, default: null },
    periodoAnalisisInicio: { type: Number, required: true, min: 1900, max: 3000 },
    periodoAnalisisTermino: { type: Number, required: true, min: 1900, max: 3000 },
    fechaInicio: { type: Date, required: true },
    fechaTermino: {
        type: Date,
        required: true,
        validate: {
            validator: function (this: { fechaInicio: Date }, value: Date) {
                return value >= this.fechaInicio;
            },
            message: 'fechaTermino debe ser mayor o igual que fechaInicio.',
        },
    },
    tieneCosto: { type: Boolean, default: null },
    costo: { type: Number, default: 0 },
    tipoProducto: {
      type: Schema.Types.ObjectId,
      ref: 'TipoProducto',
      required: true,
    },
    unidadSolicitante: {
      type: Schema.Types.ObjectId,
      ref: 'ClienteUnidad',
      required: true,
    },
    coordinador: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true,
    },
    biblioteca: {
        type: Schema.Types.ObjectId,
        ref: 'Biblioteca',
        required: true,
    },
    bibliotecaApoyo: {
        type: Schema.Types.ObjectId,
        ref: 'Biblioteca',
        required: false,
    },
    estado: {
      type: Schema.Types.ObjectId,
      ref: 'Estado',
      required: true,
    },
    url: { type: String, required: false },
    // ts: { type: Date, default: Date.now },
    Fuentes: [{ type: Schema.Types.ObjectId, ref: 'Fuente' }],
    ClienteUnidad: [{ type: Schema.Types.ObjectId, ref: 'ClienteUnidad' }],
    Indicadores: [{ type: Schema.Types.ObjectId, ref: 'Indicador' }],
  },
  {
    timestamps: true,
    // collection: 'icyt_proyecto',
  },
);

export type Project = InferSchemaType<typeof ProjectSchema>;
export type ProjectDoc = HydratedDocument<Project>;
export const ProjectModel = model<Project>("Project", ProjectSchema);