import mongoose from 'mongoose';
import { Activity } from '../models/activity.js';
import { LeaderboardEntry } from '../models/leaderboard.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

const userIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

const teamIds = [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()];

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    await User.insertMany([
      {
        _id: userIds[0],
        displayName: 'Jordan Rivera',
        email: 'jordan.rivera@example.com',
        fitnessLevel: 'advanced',
        weeklyGoalMinutes: 300,
      },
      {
        _id: userIds[1],
        displayName: 'Priya Shah',
        email: 'priya.shah@example.com',
        fitnessLevel: 'intermediate',
        weeklyGoalMinutes: 240,
      },
      {
        _id: userIds[2],
        displayName: 'Marcus Chen',
        email: 'marcus.chen@example.com',
        fitnessLevel: 'beginner',
        weeklyGoalMinutes: 180,
      },
    ]);

    await Team.insertMany([
      {
        _id: teamIds[0],
        name: 'Cardio Crew',
        motto: 'Every minute moves the team forward.',
        memberIds: [userIds[0], userIds[1]],
        weeklyGoalMinutes: 600,
      },
      {
        _id: teamIds[1],
        name: 'Strength Squad',
        motto: 'Build strong habits together.',
        memberIds: [userIds[2]],
        weeklyGoalMinutes: 360,
      },
    ]);

    await Activity.insertMany([
      {
        userId: userIds[0],
        teamId: teamIds[0],
        activityType: 'Trail run',
        durationMinutes: 52,
        caloriesBurned: 610,
        activityDate: new Date('2026-09-12T13:30:00.000Z'),
        notes: 'Hill intervals at the park loop.',
      },
      {
        userId: userIds[1],
        teamId: teamIds[0],
        activityType: 'Spin class',
        durationMinutes: 45,
        caloriesBurned: 480,
        activityDate: new Date('2026-09-11T22:00:00.000Z'),
        notes: 'High cadence endurance session.',
      },
      {
        userId: userIds[2],
        teamId: teamIds[1],
        activityType: 'Strength circuit',
        durationMinutes: 38,
        caloriesBurned: 320,
        activityDate: new Date('2026-09-10T18:15:00.000Z'),
        notes: 'Intro full-body dumbbell workout.',
      },
    ]);

    await LeaderboardEntry.insertMany([
      {
        userId: userIds[0],
        teamId: teamIds[0],
        rank: 1,
        points: 1240,
        weeklyMinutes: 286,
      },
      {
        userId: userIds[1],
        teamId: teamIds[0],
        rank: 2,
        points: 1095,
        weeklyMinutes: 241,
      },
      {
        userId: userIds[2],
        teamId: teamIds[1],
        rank: 3,
        points: 830,
        weeklyMinutes: 176,
      },
    ]);

    await Workout.insertMany([
      {
        title: 'Morning Mobility Reset',
        focusArea: 'Flexibility',
        difficulty: 'beginner',
        durationMinutes: 20,
        exercises: ['Cat-cow stretch', 'World greatest stretch', 'Glute bridges'],
      },
      {
        title: 'Lunchtime Power Circuit',
        focusArea: 'Strength',
        difficulty: 'intermediate',
        durationMinutes: 35,
        exercises: ['Goblet squats', 'Push-ups', 'Renegade rows', 'Plank taps'],
      },
      {
        title: 'Endurance Builder',
        focusArea: 'Cardio',
        difficulty: 'advanced',
        durationMinutes: 50,
        exercises: ['Tempo run', 'Hill repeats', 'Cooldown jog'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
