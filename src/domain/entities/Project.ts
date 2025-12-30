import { ObjectId } from "mongoose";

export type Project = {
    _id: ObjectId;
    idProyecto: number;
    idIb: string;
    nombre: string;
    entrega?: string;
    tipoProducto: ObjectId;
    clienteUnidad: ObjectId;
    clienteSolicitante?: string;
    clienteArea?: string;
    cantidadAutores: number;
    afiliacionSoloUC?: boolean | null;
    periodoAnalisisInicio: number;
    periodoAnalisisTermino: number;
    fechaInicio: Date;
    fechaTermino: Date;
    tieneCosto?: boolean | null;
    costo?: number;
    coordinador: ObjectId;
    biblioteca: ObjectId;
    bibliotecaApoyo?: ObjectId;
    estado: ObjectId;
    createdAt: Date;
    updatedAt: Date;
    Fuentes: ObjectId[];
    ClienteUnidad: ObjectId[];
    Indicadores: ObjectId[];
}