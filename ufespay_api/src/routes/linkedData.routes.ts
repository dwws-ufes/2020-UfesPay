import { Router } from 'express';
import { container } from 'tsyringe';
import LinkedDataController from '../controllers/LinkedDataController';

const linkedDataController = container.resolve(LinkedDataController);

const ldroutes = Router();

ldroutes.get('/person/:name', (req,res) => linkedDataController.index(req,res));

export default ldroutes;