import mongoose from 'mongoose';
import { seedApplications } from './application.seed';

const MONGODB_URI = process.env.MONGO_URI || 'mongodb+srv://rifat:Rifat22@cluster0.wtthqfo.mongodb.net';

async function seed() {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Run the seed function
        await seedApplications();

        // Close the connection
        await mongoose.connection.close();
        console.log('Database connection closed');
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

// Run the seed function
seed();