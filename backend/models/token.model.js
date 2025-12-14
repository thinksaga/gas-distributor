import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
    requestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Request',
        required: true,
    },
    requestDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'approved', 'rejected', 'active', 'expired', 'used'],
        default: 'pending',
    },
    expireDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    pickUpDate: {
        type: Date,
        required: false,
        default: null,
    },
}, {timestamps: true});

const Token = mongoose.model('Token', tokenSchema);
export default Token;