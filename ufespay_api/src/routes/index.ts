import { Router } from 'express';

import ensureAuth from '../middlewares/ensureAuth'

import UserController from '../controllers/UserController';
import SessionController from '../controllers/SessionController';
import TransactionController from '../controllers/TransactionController';
import CommentController from '../controllers/CommentController';

import { container } from 'tsyringe';

const userController = container.resolve(UserController);
const sessionController = container.resolve(SessionController);
const transactionController = container.resolve(TransactionController);
const commentController = container.resolve(CommentController);

const routes = Router();

routes.post('/sign-in', (req,res) => sessionController.signIn(req,res));
routes.delete('/sign-out', (req,res) => sessionController.signOut(req,res));

routes.post('/user', (req,res) => userController.create(req,res));
routes.delete('/user', ensureAuth, (req,res) => userController.delete(req,res));
routes.get('/user', ensureAuth, (req,res) => userController.index(req,res));
routes.put('/user', ensureAuth, (req,res) => userController.update(req,res));

routes.get('/users', ensureAuth, (req,res) => userController.list(req,res));

routes.get('/transaction', ensureAuth, (req,res) => transactionController.list(req,res));
routes.post('/transaction', ensureAuth, (req,res) => transactionController.create(req,res));

routes.put('/like', ensureAuth, (req,res) => transactionController.toggleLike(req,res));
routes.post('/comment', ensureAuth, (req,res) => commentController.create(req,res));
routes.delete('/comment', ensureAuth, (req,res) => commentController.delete(req,res));


export default routes;