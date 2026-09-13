import { Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    activityType: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    activityDate: { type: Date, required: true },
    notes: { type: String, required: true, trim: true },
  },
  { collection: 'activities', timestamps: true },
);

export const Activity = model('Activity', activitySchema);