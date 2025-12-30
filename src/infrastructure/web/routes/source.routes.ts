import { Router } from 'express';
import { _Request, _Response } from '../ExpressServer.ts';
import { SourceController } from '../../../interfaces/controllers/source.controller.ts';

export function buildSourceRouter(): Router {
    const router = Router();
    const controller = new SourceController();

    router.get('/', (req: _Request, res: _Response) => controller.list(req, res));
    router.get('/:id', (req: _Request, res: _Response) => controller.getById(req, res));

    return router;
}