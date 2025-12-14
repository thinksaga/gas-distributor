import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
    gasType: {
        type: String,
        required: false, // Made optional since we now use productId
        enum: ['LPG', 'CNG', 'Propane', 'PNG', 'Commercial_LPG'],
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: false // Optional for backward compatibility
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity must be a positive number"],
        max: [10, "Quantity must be less than or equal to 10"]
    },
    requestDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'approved', 'rejected', 'delivered', 'cancelled'],
        default: 'pending',
    },
    approval: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
    consumerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Consumer',
        required: true
    },
    tokenId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Token',
        required: false
    },
    outletId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Outlet',
        required: false
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Consumer',
        required: false
    },
    requestCode: {
        type: String,
        required: false
    }
}, { timestamps: true });

const Request = mongoose.model('Request', requestSchema);
export default Request;