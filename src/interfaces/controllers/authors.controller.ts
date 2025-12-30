import { AuthorModel } from "../../infrastructure/web/database/models/AuthorSchema.ts";
import { _Request, _Response } from "../../infrastructure/web/ExpressServer.ts";

export class AuthorController {
  async list(req: _Request, res: _Response) {
    const { q, estado, afiliacionUC, genero, uaCod } = req.query;

    const filter: Record<string, unknown> = {};

    // filtros exactos opcionales
    if (typeof estado === "string") filter.estado = estado === "true";
    if (typeof afiliacionUC === "string") filter.afiliacionUC = afiliacionUC === "true";
    if (typeof genero === "string" && (genero === "male" || genero === "female")) filter.genero = genero;
    if (typeof uaCod === "string" && uaCod.trim()) filter.uaCod = uaCod.trim();

    // búsqueda libre opcional
    if (typeof q === "string" && q.trim()) {
      const term = q.trim();
      const rx = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");

      filter.$or = [
        { idNameICYT: rx },
        { idNameICYTAnterior: rx },
        { rut: rx },
        { correo: rx },
        { nombres: rx },
        { apaterno: rx },
        { amaterno: rx },
        { nombreCompleto: rx },
        { nombrePreferido: rx },
        { unidadAcademica: rx },
        { orcid: rx },
      ];
    }

    const authors = await AuthorModel.find(filter)
      .sort({ apaterno: 1, amaterno: 1, nombres: 1 })
      .lean();

    res.json(authors);
  }

  async getById(req: _Request, res: _Response) {
    const author = await AuthorModel.findById(req.params.id).lean();
    if (!author) return res.status(404).json({ message: "Author not found" });
    res.json(author);
  }

  async create(req: _Request, res: _Response) {
    // opcional: construir nombreCompleto si no viene
    const body = { ...req.body };
    if (!body.nombreCompleto) {
      const parts = [body.nombres, body.apaterno, body.amaterno].filter(Boolean);
      body.nombreCompleto = parts.join(" ");
    }

    const created = await AuthorModel.create(body);
    res.status(201).json(created);
  }

  async update(req: _Request, res: _Response) {
    const body = { ...req.body };
    if (body.nombres || body.apaterno || body.amaterno) {
      // si actualizaron partes del nombre y no mandaron nombreCompleto, lo recalculamos
      if (!("nombreCompleto" in body)) {
        const current = await AuthorModel.findById(req.params.id).lean();
        if (current) {
          const nombres = body.nombres ?? current.nombres;
          const apaterno = body.apaterno ?? current.apaterno;
          const amaterno = body.amaterno ?? current.amaterno;
          body.nombreCompleto = [nombres, apaterno, amaterno].filter(Boolean).join(" ");
        }
      }
    }

    const updated = await AuthorModel.findByIdAndUpdate(req.params.id, body, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updated) return res.status(404).json({ message: "Author not found" });
    res.json(updated);
  }

  async remove(req: _Request, res: _Response) {
    const deleted = await AuthorModel.findByIdAndDelete(req.params.id).lean();
    if (!deleted) return res.status(404).json({ message: "Author not found" });
    res.status(204).send();
  }

  // "borrado lógico" / desactivar
  async setEstado(req: _Request, res: _Response) {
    const { id } = req.params;
    const { estado } = req.body ?? {};

    if (typeof estado !== "boolean") {
      return res.status(400).json({ message: "estado must be boolean" });
    }

    const updated = await AuthorModel.findByIdAndUpdate(
      id,
      { estado },
      { new: true, runValidators: true }
    ).lean();

    if (!updated) return res.status(404).json({ message: "Author not found" });
    res.json(updated);
  }
}
