import { Router } from 'express'
import { testController } from '../controllers/test-controller';

const testRouter =  Router();

testRouter.get('/rooms', testController.getRooms);
testRouter.get('/users', testController.getUsers);

export { testRouter };