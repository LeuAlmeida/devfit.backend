import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlansController from './app/controllers/PlansController';
import EnrollmentsController from './app/controllers/EnrollmentsController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import AllHelpOrderController from './app/controllers/AllHelpOrderController';
import AnswerOrderController from './app/controllers/AnswerOrderController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get('/plans', PlansController.index);

routes.post('/students/:id/checkins', CheckinController.store);

routes.post('/students/:id/help-orders', HelpOrderController.store);
routes.get('/students/help-orders', AllHelpOrderController.index);
routes.get('/students/:id/help-orders', HelpOrderController.index);

routes.use(authMiddleware);

routes.get('/students/:id/checkins', CheckinController.index);

routes.put('/users', UserController.update);

routes.post('/students', StudentController.store);
routes.put('/students', StudentController.update);

routes.post('/plans', PlansController.store);
routes.put('/plans/:id', PlansController.update);
routes.delete('/plans/:id', PlansController.delete);

routes.post('/enrollments', EnrollmentsController.store);
routes.put('/enrollments/:id', EnrollmentsController.update);
routes.get('/enrollments', EnrollmentsController.index);
routes.delete('/enrollments/:id', EnrollmentsController.delete);

routes.post('/help-orders/:id/answer', AnswerOrderController.store);

export default routes;
