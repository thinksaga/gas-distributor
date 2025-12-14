import mongoose from "mongoose";

const fulfillmentSchema = new mongoose.Schema({
    requestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Request',
        required: true
    },
    deliveryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Delivery',
        required: true
    },
    tokenId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Token',
        required: false
    },
    fulfillmentDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'fulfilled', 'cancelled'],
        default: 'pending'
    },
    quantityFulfilled: {
        type: Number,
        required: true,
        min: 1
    },
    verifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Consumer',
        required: false
    },
    remarks: {
        type: String,
        trim: true
    }
}, {timestamps: true});

// Add indexes
fulfillmentSchema.index({ requestId: 1 });
fulfillmentSchema.index({ deliveryId: 1 });

const Fulfillment = mongoose.model('Fulfillment', fulfillmentSchema);
export default Fulfillment;