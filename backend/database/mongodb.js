import mongoose from "mongoose";
import {DB_URI, SUPERADMIN_USERNAME, SUPERADMIN_PASSWORD, SUPERADMIN_EMAIL, ADMIN_USERNAME, ADMIN_PASSWORD, ADMIN_EMAIL} from "../config/env.js";
import logger from "../utils/logger.js";
import Consumer from "../models/consumer.model.js";
import bcrypt from 'bcryptjs';

if(!DB_URI){
    logger.error('DB_URI not defined in environment variables');
    throw new Error('Please define the DB_URI in the .env.local file');
}

const connectToDatabase = async ()=>{
    try {
        await mongoose.connect(DB_URI);
        logger.info('Connected to the database successfully');
        // After connecting, ensure initial admin and superadmin users exist
        try {
            await seedInitialUsers();
        } catch (err) {
            logger.error('Error while seeding initial users', { error: err.message });
        }
    } catch (error) {
        logger.error('Error connecting to the database', { error: error.message, stack: error.stack });
        process.exit(1)
    }
}

const seedInitialUsers = async () => {
    // Defaults (development-safe)
    const saUsername = SUPERADMIN_USERNAME || 'superadmin';
    const saPassword = SUPERADMIN_PASSWORD || 'SuperP@ssw0rd!';
    const saEmail = SUPERADMIN_EMAIL || 'superadmin@local.dev';

    const adminUsername = ADMIN_USERNAME || 'admin';
    const adminPassword = ADMIN_PASSWORD || 'AdminP@ssw0rd!';
    const adminEmail = ADMIN_EMAIL || 'admin@local.dev';

    // Ensure superadmin exists
    const existingSA = await Consumer.findOne({ role: 'superadmin' });
    if (!existingSA) {
        // avoid username/email collisions
        let conflict = await Consumer.findOne({ $or: [{ username: saUsername }, { email: saEmail }] });
        if (conflict) {
            logger.warn('Superadmin defaults conflict with existing user; skipping superadmin creation', { username: saUsername, email: saEmail });
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(saPassword, salt);
            const sa = await Consumer.create({
                firstname: 'Super',
                lastname: 'Admin',
                username: saUsername,
                email: saEmail,
                password: hashed,
                contactNumber: '0000000000',
                street: 'Localhost',
                city: 'Local',
                role: 'superadmin'
            });
            logger.info('Seeded superadmin user', { username: sa.username, email: sa.email });
        }
    } else {
        logger.info('Superadmin already exists, skipping seeding', { username: existingSA.username });
    }

    // Ensure admin exists
    const existingAdmin = await Consumer.findOne({ role: 'admin' });
    if (!existingAdmin) {
        let conflict = await Consumer.findOne({ $or: [{ username: adminUsername }, { email: adminEmail }] });
        if (conflict) {
            logger.warn('Admin defaults conflict with existing user; skipping admin creation', { username: adminUsername, email: adminEmail });
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(adminPassword, salt);
            const ad = await Consumer.create({
                firstname: 'Default',
                lastname: 'Admin',
                username: adminUsername,
                email: adminEmail,
                password: hashed,
                contactNumber: '0000000000',
                street: 'Localhost',
                city: 'Local',
                role: 'admin'
            });
            logger.info('Seeded admin user', { username: ad.username, email: ad.email });
        }
    } else {
        logger.info('Admin already exists, skipping seeding', { username: existingAdmin.username });
    }
}

export default connectToDatabase