import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Consumer from './models/consumer.model.js';
import Product from './models/product.model.js';
import Outlet from './models/outlet.model.js';
import Gasstock from './models/gasstock.model.js';

// MongoDB connection for Docker
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/gasdb';

const seedDatabase = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB at', MONGO_URI);

        // Clear existing data (optional - comment out if you want to keep existing data)
        // await Consumer.deleteMany({});
        // await Product.deleteMany({});
        // await Outlet.deleteMany({});
        // await Gasstock.deleteMany({});
        // console.log('🗑️  Cleared existing data');

        // 1. Create Superadmin
        const superadminPassword = await bcrypt.hash('SuperAdmin@123', 10);
        const superadmin = await Consumer.findOneAndUpdate(
            { username: 'superadmin' },
            {
                $set: {
                    firstname: 'Super',
                    lastname: 'Admin',
                    username: 'superadmin',
                    email: 'superadmin@vayugas.com',
                    password: superadminPassword,
                    contactNumber: '9999999999',
                    street: 'VayuGas HQ',
                    city: 'Mumbai',
                    role: 'superadmin'
                }
            },
            { upsert: true, new: true }
        );
        console.log('✅ Superadmin created:', superadmin.username);

        // 2. Create Admin Users (Organizations) - Indian Cities
        const adminPassword = await bcrypt.hash('Admin@123', 10);
        const admins = [];

        const adminData = [
            { firstname: 'Delhi', lastname: 'Admin', username: 'admin_delhi', email: 'admin@delhi.vayugas.com', city: 'New Delhi', state: 'Delhi' },
            { firstname: 'Mumbai', lastname: 'Admin', username: 'admin_mumbai', email: 'admin@mumbai.vayugas.com', city: 'Mumbai', state: 'Maharashtra' },
            { firstname: 'Bangalore', lastname: 'Admin', username: 'admin_bangalore', email: 'admin@bangalore.vayugas.com', city: 'Bangalore', state: 'Karnataka' },
            { firstname: 'Chennai', lastname: 'Admin', username: 'admin_chennai', email: 'admin@chennai.vayugas.com', city: 'Chennai', state: 'Tamil Nadu' },
            { firstname: 'Kolkata', lastname: 'Admin', username: 'admin_kolkata', email: 'admin@kolkata.vayugas.com', city: 'Kolkata', state: 'West Bengal' },
            { firstname: 'Pune', lastname: 'Admin', username: 'admin_pune', email: 'admin@pune.vayugas.com', city: 'Pune', state: 'Maharashtra' },
            { firstname: 'Hyderabad', lastname: 'Admin', username: 'admin_hyderabad', email: 'admin@hyderabad.vayugas.com', city: 'Hyderabad', state: 'Telangana' },
            { firstname: 'Ahmedabad', lastname: 'Admin', username: 'admin_ahmedabad', email: 'admin@ahmedabad.vayugas.com', city: 'Ahmedabad', state: 'Gujarat' },
        ];

        for (const admin of adminData) {
            const createdAdmin = await Consumer.findOneAndUpdate(
                { username: admin.username },
                {
                    $set: {
                        ...admin,
                        password: adminPassword,
                        contactNumber: '8888888888',
                        street: `${admin.city} Office, ${admin.state}`,
                        role: 'admin'
                    }
                },
                { upsert: true, new: true }
            );
            admins.push(createdAdmin);
            console.log(`✅ Admin created: ${createdAdmin.username} (${createdAdmin.city})`);
        }

        // 3. Create Regular Users - Indian Context
        const userPassword = await bcrypt.hash('User@123', 10);
        const users = [];

        const userData = [
            { firstname: 'Rajesh', lastname: 'Kumar', username: 'rajesh_kumar', email: 'rajesh.kumar@example.com', city: 'New Delhi', state: 'Delhi', street: 'Connaught Place, Central Delhi', contact: '9876543210' },
            { firstname: 'Priya', lastname: 'Sharma', username: 'priya_sharma', email: 'priya.sharma@example.com', city: 'Mumbai', state: 'Maharashtra', street: 'Bandra West, Mumbai', contact: '9876543211' },
            { firstname: 'Amit', lastname: 'Patel', username: 'amit_patel', email: 'amit.patel@example.com', city: 'Ahmedabad', state: 'Gujarat', street: 'Navrangpura, Ahmedabad', contact: '9876543212' },
            { firstname: 'Sunita', lastname: 'Verma', username: 'sunita_verma', email: 'sunita.verma@example.com', city: 'Bangalore', state: 'Karnataka', street: 'Koramangala, Bangalore', contact: '9876543213' },
            { firstname: 'Vijay', lastname: 'Singh', username: 'vijay_singh', email: 'vijay.singh@example.com', city: 'Chennai', state: 'Tamil Nadu', street: 'T. Nagar, Chennai', contact: '9876543214' },
            { firstname: 'Meera', lastname: 'Nair', username: 'meera_nair', email: 'meera.nair@example.com', city: 'Kolkata', state: 'West Bengal', street: 'Salt Lake City, Kolkata', contact: '9876543215' },
            { firstname: 'Ravi', lastname: 'Reddy', username: 'ravi_reddy', email: 'ravi.reddy@example.com', city: 'Hyderabad', state: 'Telangana', street: 'Banjara Hills, Hyderabad', contact: '9876543216' },
            { firstname: 'Kavita', lastname: 'Joshi', username: 'kavita_joshi', email: 'kavita.joshi@example.com', city: 'Pune', state: 'Maharashtra', street: 'Koregaon Park, Pune', contact: '9876543217' },
            { firstname: 'Arun', lastname: 'Gupta', username: 'arun_gupta', email: 'arun.gupta@example.com', city: 'New Delhi', state: 'Delhi', street: 'Karol Bagh, Delhi', contact: '9876543218' },
            { firstname: 'Anjali', lastname: 'Mishra', username: 'anjali_mishra', email: 'anjali.mishra@example.com', city: 'Lucknow', state: 'Uttar Pradesh', street: 'Hazratganj, Lucknow', contact: '9876543219' },
        ];

        for (const user of userData) {
            const createdUser = await Consumer.findOneAndUpdate(
                { username: user.username },
                {
                    $set: {
                        firstname: user.firstname,
                        lastname: user.lastname,
                        username: user.username,
                        email: user.email,
                        password: userPassword,
                        contactNumber: user.contact,
                        street: user.street,
                        city: user.city,
                        role: 'user'
                    }
                },
                { upsert: true, new: true }
            );
            users.push(createdUser);
            console.log(`✅ User created: ${createdUser.username} (${createdUser.city})`);
        }

        // 4. Create Products - Indian Gas Cylinder Standards (Prices in INR)
        const products = [];
        const productData = [
            { name: '3 Kg Domestic LPG Cylinder', price: 350, weight: '3 Kg', description: 'Small domestic gas cylinder for basic cooking needs', image: '/images/cylinder-3kg.png', type: 'Domestic' },
            { name: '5 Kg Domestic LPG Cylinder', price: 550, weight: '5 Kg', description: 'Standard domestic gas cylinder for household use', image: '/images/cylinder-5kg.png', type: 'Domestic' },
            { name: '10 Kg Domestic LPG Cylinder', price: 850, weight: '10 Kg', description: 'Medium domestic gas cylinder for larger households', image: '/images/cylinder-10kg.png', type: 'Domestic' },
            { name: '14.2 Kg Domestic LPG Cylinder', price: 1050, weight: '14.2 Kg', description: 'Standard Indian domestic gas cylinder (Red cylinder)', image: '/images/cylinder-14kg.png', type: 'Domestic' },
            { name: '17 Kg Domestic LPG Cylinder', price: 1250, weight: '17 Kg', description: 'Large domestic gas cylinder for high consumption', image: '/images/cylinder-17kg.png', type: 'Domestic' },
            { name: '19 Kg Commercial LPG Cylinder', price: 1450, weight: '19 Kg', description: 'Commercial gas cylinder for restaurants and small businesses', image: '/images/cylinder-19kg.png', type: 'Commercial' },
            { name: '35 Kg Commercial LPG Cylinder', price: 2800, weight: '35 Kg', description: 'Large commercial gas cylinder for hotels and industries', image: '/images/cylinder-35kg.png', type: 'Commercial' },
            { name: '47.5 Kg Commercial LPG Cylinder', price: 3800, weight: '47.5 Kg', description: 'Industrial gas cylinder for large-scale operations', image: '/images/cylinder-47kg.png', type: 'Commercial' },
        ];

        for (const product of productData) {
            const createdProduct = await Product.findOneAndUpdate(
                { name: product.name },
                { $set: product },
                { upsert: true, new: true }
            );
            products.push(createdProduct);
            console.log(`✅ Product created: ${createdProduct.name}`);
        }

        // 5. Create Outlets for each Admin - Indian Locations
        const outlets = [];
        for (const admin of admins) {
            const outletData = [
                {
                    name: `${admin.city} Central Gas Agency`,
                    location: `Central ${admin.city}`,
                    city: admin.city,
                    state: admin.state,
                    adminId: admin._id,
                    stock: {
                        quantity: Math.floor(Math.random() * 2000) + 1500,
                        date: new Date().toISOString().split('T')[0],
                        status: 'Approved'
                    }
                },
                {
                    name: `${admin.city} East Gas Agency`,
                    location: `East ${admin.city}`,
                    city: admin.city,
                    state: admin.state,
                    adminId: admin._id,
                    stock: {
                        quantity: Math.floor(Math.random() * 1500) + 1000,
                        date: new Date().toISOString().split('T')[0],
                        status: 'Approved'
                    }
                },
                {
                    name: `${admin.city} West Gas Agency`,
                    location: `West ${admin.city}`,
                    city: admin.city,
                    state: admin.state,
                    adminId: admin._id,
                    stock: {
                        quantity: Math.floor(Math.random() * 1200) + 800,
                        date: new Date().toISOString().split('T')[0],
                        status: 'Pending'
                    }
                },
                {
                    name: `${admin.city} South Gas Agency`,
                    location: `South ${admin.city}`,
                    city: admin.city,
                    state: admin.state,
                    adminId: admin._id,
                    stock: {
                        quantity: Math.floor(Math.random() * 1000) + 600,
                        date: new Date().toISOString().split('T')[0],
                        status: 'Approved'
                    }
                },
            ];

            for (const outlet of outletData) {
                const createdOutlet = await Outlet.findOneAndUpdate(
                    { name: outlet.name },
                    { $set: outlet },
                    { upsert: true, new: true }
                );
                outlets.push(createdOutlet);
                console.log(`✅ Outlet created: ${createdOutlet.name} (${createdOutlet.city}, ${createdOutlet.state})`);
            }
        }

        console.log('\n🎉 Database seeded successfully with Indian data!');
        console.log('\n📊 Summary:');
        console.log(`   - Superadmins: 1`);
        console.log(`   - Regional Admins: ${admins.length} (Major Indian cities)`);
        console.log(`   - Users: ${users.length} (Indian consumers)`);
        console.log(`   - Products: ${products.length} (LPG cylinders in INR)`);
        console.log(`   - Outlets: ${outlets.length} (Gas agencies across cities)`);

        console.log('\n🔑 Test Credentials:');
        console.log('   Superadmin: superadmin / SuperAdmin@123');
        console.log('   Regional Admin: admin_delhi / Admin@123 (Delhi region)');
        console.log('   Consumer: rajesh_kumar / User@123 (Delhi consumer)');
        console.log('   Consumer: priya_sharma / User@123 (Mumbai consumer)');

        await mongoose.disconnect();
        console.log('\n✅ Disconnected from MongoDB');
        process.exit(0);
    } catch (err) {
        console.error('❌ Error seeding database:', err);
        process.exit(1);
    }
};

seedDatabase();
