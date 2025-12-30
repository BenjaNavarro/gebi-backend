import { Router } from 'express';
import { ClientController } from '../../../interfaces/controllers/client.controller.ts';
import { _Request, _Response } from '../ExpressServer.ts';

export function buildClientRouter(): Router {
    const router = Router();
    const controller = new ClientController();

    router.get('/', (req: _Request, res: _Response) => controller.list(req, res));
    router.get('/:id', (req: _Request, res: _Response) => controller.getById(req, res));
    router.post('/', (req: _Request, res: _Response) => controller.create(req, res));
    router.put('/:id', (req: _Request, res: _Response) => controller.update(req, res));
    router.delete('/:id', (req: _Request, res: _Response) => controller.remove(req, res));
    router.patch('/:id/estado', (req: _Request, res: _Response) => controller.setEstado(req, res));
    
    return router;
}