import { StateModel } from "../infrastructure/web/database/models/StateSchema.ts";
import { _Request, _Response } from "../infrastructure/web/ExpressServer.ts";

export class StateController {
    async list(req: _Request, res: _Response) {
        const { q } = req.query;
        const filter =
        typeof q === "string" && q.trim().length > 0
            ? { nombre: new RegExp(q, "i") }
            : {};
        const states = await StateModel.find(filter)
            .sort({ createdAt: -1 })
            .lean();
        res.json(states);
    }

    async getById(req: _Request, res: _Response) {
        const { id } = req.params;
        const state = await StateModel.findById(id).lean();
        if (!state) return res.status(404).json({ message: "State not found" });
        res.json(state);
    }

}