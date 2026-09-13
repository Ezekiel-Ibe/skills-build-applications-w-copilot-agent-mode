import { Router } from 'express';
import { User } from '../models/user.js';

const usersRouter = Router();

usersRouter.get('/', async (_request, response) => {
  const users = await User.find().sort({ displayName: 1 }).lean();

  response.json({ data: users, resource: 'users' });
});

export default usersRouter;