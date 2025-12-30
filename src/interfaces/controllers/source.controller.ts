import { SourceModel } from "../../infrastructure/web/database/models/SourceSchema.ts";
import { _Request, _Response } from "../../infrastructure/web/ExpressServer.ts";

export class SourceController {
    async list(req: _Request, res: _Response) {
        const { q } = req.query;
        const filter =
        typeof q === "string" && q.trim().length > 0
            ? { nombre: new RegExp(q, "i") }
            : {};
        const sources = await SourceModel.find(filter)
            .sort({ createdAt: -1 })
            .lean();
        res.json(sources);
    }

    async getById(req: _Request, res: _Response) {
        const { id } = req.params;
        const source = await SourceModel.findById(id).lean();
        if (!source) return res.status(404).json({ message: "Source not found" });
        res.json(source);
    }
}