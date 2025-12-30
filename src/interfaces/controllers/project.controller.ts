import { ProjectModel } from "../../infrastructure/web/database/models/ProjectSchema.ts";
import { _Request, _Response } from "../../infrastructure/web/ExpressServer.ts";

export class ProjectController {
  async list(req: _Request, res: _Response) {
    const { q } = req.query;

    const filter =
      typeof q === "string" && q.trim().length > 0
        ? {
            $or: [
              { nombre: new RegExp(q, "i") },
              { idIB: new RegExp(q, "i") },
              { entrega: new RegExp(q, "i") },
            ],
          }
        : {};

    const projects = await ProjectModel.find(filter)
      // ajusta estos populate a los campos reales que tengas como ObjectId:
      .populate("coordinador")
      .populate("biblioteca")
      .populate("bibliotecaApoyo")
      .populate("estado")
      .populate("tipoProducto")
      .populate("unidadSolicitante")
      .sort({ createdAt: -1 })
      .lean();

    res.json(projects);
  }

  async getById(req: _Request, res: _Response) {
    const { id } = req.params;

    const project = await ProjectModel.findById(id)
      .populate("coordinador")
      .populate("biblioteca")
      .populate("bibliotecaApoyo")
      .populate("estado")
      .populate("tipoProducto")
      .populate("unidadSolicitante")
      .lean();

    if (!project) return res.status(404).json({ message: "Project not found" });

    res.json(project);
  }

  async create(req: _Request, res: _Response) {
    const created = await ProjectModel.create(req.body);
    const project = await ProjectModel.findById(created._id).lean();
    res.status(201).json(project);
  }

  async update(req: _Request, res: _Response) {
    const { id } = req.params;

    const updated = await ProjectModel.findByIdAndUpdate(id, req.body, { new: true }).lean();
    if (!updated) return res.status(404).json({ message: "Project not found" });

    res.json(updated);
  }

  async remove(req: _Request, res: _Response) {
    const { id } = req.params;

    const deleted = await ProjectModel.findByIdAndDelete(id).lean();
    if (!deleted) return res.status(404).json({ message: "Project not found" });

    res.status(204).send();
  }
}
