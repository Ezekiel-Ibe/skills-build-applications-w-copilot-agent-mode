import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    displayName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true, unique: true },
    fitnessLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    weeklyGoalMinutes: { type: Number, required: true, min: 1 },
  },
  { collection: 'users', timestamps: true },
);

export const User = model('User', userSchema);