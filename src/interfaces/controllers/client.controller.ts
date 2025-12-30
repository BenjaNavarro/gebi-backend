import { ClientUnitModel } from "../../infrastructure/web/database/models/ClientUnitSchema.ts";
import { _Request, _Response } from "../../infrastructure/web/ExpressServer.ts";

export class ClientController {
    async list(req: _Request, res: _Response) {
        const { q } = req.query;
        const filter =
        typeof q === "string" && q.trim().length > 0
            ? { nombre: new RegExp(q, "i") }
            : {};
        const clientUnits = await ClientUnitModel.find(filter)
            .sort({ createdAt: -1 })
            .lean();
        res.json(clientUnits);
    }

    async getById(req: _Request, res: _Response) {
        const { id } = req.params;
        const clientUnit = await ClientUnitModel.findById(id).lean();
        if (!clientUnit) return res.status(404).json({ message: "Client Unit not found" });
        res.json(clientUnit);
    }

    async create(req: _Request, res: _Response) {
        const { nombre, descripcion } = req.body;
        const newClientUnit = new ClientUnitModel({ nombre, descripcion });
        await newClientUnit.save();
        res.status(201).json(newClientUnit);
    }

    async update(req: _Request, res: _Response) {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;
        const updatedClientUnit = await ClientUnitModel.findByIdAndUpdate(
            id,
            { nombre, descripcion },
            { new: true }
        ).lean();
        if (!updatedClientUnit) return res.status(404).json({ message: "Client Unit not found" });
        res.json(updatedClientUnit);
    }

    async setEstado(req: _Request, res: _Response) {
        const { id } = req.params;
        const clientUnit = await ClientUnitModel.findById(id);
        if (!clientUnit) return res.status(404).json({ message: "Client Unit not found" });
        clientUnit.estado = !clientUnit.estado;
        await clientUnit.save();
        res.json(clientUnit);
    }

    async remove(req: _Request, res: _Response) {
        const { id } = req.params;
        const deletedClientUnit = await ClientUnitModel
            .findByIdAndDelete(id)
            .lean();
        if (!deletedClientUnit) return res.status(404).json({ message: "Client Unit not found" });
        res.status(204).send();
    }
}