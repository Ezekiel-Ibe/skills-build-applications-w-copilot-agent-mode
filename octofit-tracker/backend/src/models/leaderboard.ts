import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    rank: { type: Number, required: true, min: 1 },
    points: { type: Number, required: true, min: 0 },
    weeklyMinutes: { type: Number, required: true, min: 0 },
  },
  { collection: 'leaderboard', timestamps: true },
);

export const LeaderboardEntry = model('LeaderboardEntry', leaderboardSchema);