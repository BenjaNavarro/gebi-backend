import { IndicatorModel } from "../../infrastructure/web/database/models/IndicatorSchema.ts";
import { _Request, _Response } from "../../infrastructure/web/ExpressServer.ts";

export class IndicatorController {
    async list(req: _Request, res: _Response) {
        const { q } = req.query;
        const filter =
        typeof q === "string" && q.trim().length > 0
            ? { nombre: new RegExp(q, "i") }
            : {};
        const indicators = await IndicatorModel.find(filter)
            .sort({ createdAt: -1 })
            .lean();
        res.json(indicators);
    }

    async getById(req: _Request, res: _Response) {
        const { id } = req.params;
        const indicator = await IndicatorModel.findById(id).lean();
        if (!indicator) return res.status(404).json({ message: "Indicator not found" });
        res.json(indicator);
    }
}