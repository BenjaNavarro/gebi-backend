import { Router } from 'express';
import { StateController } from '../../../interfaces/controllers/state.controller.ts';
import { _Request, _Response } from '../ExpressServer.ts';

export function buildStateRouter(): Router {
    const router = Router();
    const controller = new StateController();

    router.get('/', (req: _Request, res: _Response) => controller.list(req, res));
    router.get('/:id', (req: _Request, res: _Response) => controller.getById(req, res));
    
    return router;
}