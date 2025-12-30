import { UserModel } from "../../infrastructure/web/database/models/UserSchema.ts";
import { _Request, _Response } from "../../infrastructure/web/ExpressServer.ts";

export class UserController {
  async list(req: _Request, res: _Response) {
    const { q } = req.query;

    const filter =
      typeof q === "string" && q.trim().length > 0
        ? {
            $or: [
              { idUsuario: new RegExp(q, "i") },
              { correo: new RegExp(q, "i") },
              { rut: new RegExp(q, "i") },
              { nombres: new RegExp(q, "i") },
              { apaterno: new RegExp(q, "i") },
            ],
          }
        : {};

    const users = await UserModel.find(filter)
      .populate("perfil")
      .populate("biblioteca")
      .sort({ createdAt: -1 })
      .lean();

    res.json(users);
  }

  async getById(req: _Request, res: _Response) {
    const { id } = req.params;

    const user = await UserModel.findById(id).populate("perfil").populate("biblioteca").lean();
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  }

  async create(req: _Request, res: _Response) {
    const created = await UserModel.create(req.body);
    const user = await UserModel.findById(created._id).populate("perfil").populate("biblioteca").lean();
    res.status(201).json(user);
  }

  async update(req: _Request, res: _Response) {
    const { id } = req.params;

    const updated = await UserModel.findByIdAndUpdate(id, req.body, { new: true })
      .populate("perfil")
      .populate("biblioteca")
      .lean();

    if (!updated) return res.status(404).json({ message: "User not found" });
    res.json(updated);
  }

  async remove(req: _Request, res: _Response) {
    const { id } = req.params;

    const deleted = await UserModel.findByIdAndDelete(id).lean();
    if (!deleted) return res.status(404).json({ message: "User not found" });

    res.status(204).send();
  }
}