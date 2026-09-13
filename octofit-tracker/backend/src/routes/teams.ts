import { Router } from 'express';
import { Team } from '../models/team.js';

const teamsRouter = Router();

teamsRouter.get('/', async (_request, response) => {
  const teams = await Team.find().sort({ name: 1 }).lean();

  response.json({ data: teams, resource: 'teams' });
});

export default teamsRouter;