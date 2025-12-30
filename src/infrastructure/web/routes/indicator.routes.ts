import { Router } from 'express';
import { _Request, _Response } from '../ExpressServer.ts';
import { IndicatorController } from '../../../interfaces/controllers/indicator.controller.ts';

export function buildIndicatorRouter(): Router {
    const router = Router();
    const controller = new IndicatorController();

    router.get('/', (req: _Request, res: _Response) => controller.list(req, res));
    router.get('/:id', (req: _Request, res: _Response) => controller.getById(req, res));
    
    return router;
}