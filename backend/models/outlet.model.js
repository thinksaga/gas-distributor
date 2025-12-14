import mongoose from "mongoose";

const outletSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 100
    },
    location: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 1000
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6
    },
    stockId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gasstock',
        // required: true  // Make optional for now
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Consumer',
        required: true
    },
}, { timestamps: true });

const Outlet = mongoose.model('Outlet', outletSchema);
export default Outlet;