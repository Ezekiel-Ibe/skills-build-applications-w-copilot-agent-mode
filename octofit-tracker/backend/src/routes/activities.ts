import { Router } from 'express';
import { Activity } from '../models/activity.js';

const activitiesRouter = Router();

activitiesRouter.get('/', async (_request, response) => {
  const activities = await Activity.find().sort({ activityDate: -1 }).lean();

  response.json({ data: activities, resource: 'activities' });
});

export default activitiesRouter;