import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Requirement from '../models/Requirement.js';
import Quote from '../models/Quote.js';
import Connection from '../models/Connection.js';
import Notification from '../models/Notification.js';
import mockData from '../data/mockData.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      User.deleteMany(),
      Requirement.deleteMany(),
      Quote.deleteMany(),
      Connection.deleteMany(),
      Notification.deleteMany()
    ]);
    console.log('Cleared existing data');

    // Insert mock data
    await Promise.all([
      User.insertMany(mockData.users),
      Requirement.insertMany(mockData.requirements),
      Quote.insertMany(mockData.quotes),
      Connection.insertMany(mockData.connections),
      Notification.insertMany(mockData.notifications)
    ]);
    console.log('Inserted mock data successfully');

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();