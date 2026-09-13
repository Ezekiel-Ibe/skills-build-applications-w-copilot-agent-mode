import { Schema, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    motto: { type: String, required: true, trim: true },
    memberIds: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    weeklyGoalMinutes: { type: Number, required: true, min: 1 },
  },
  { collection: 'teams', timestamps: true },
);

export const Team = model('Team', teamSchema);