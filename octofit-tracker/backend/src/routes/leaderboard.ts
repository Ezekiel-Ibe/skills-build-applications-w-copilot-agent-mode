import { Router } from 'express';
import { LeaderboardEntry } from '../models/leaderboard.js';

const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_request, response) => {
  const leaderboard = await LeaderboardEntry.find().sort({ rank: 1 }).lean();

  response.json({ data: leaderboard, resource: 'leaderboard' });
});

export default leaderboardRouter;