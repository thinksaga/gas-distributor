import mongoose from 'mongoose'

const deliverySchema = new mongoose.Schema({
    deliveryDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    estimatedDeliveryDate: {
        type: Date,
        required: false,
    },
    actualDeliveryDate: {
        type: Date,
        required: false,
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'assigned', 'out_for_delivery', 'delivered', 'cancelled', 'failed'],
        default: 'pending',
    },
    deliveryAddress: {
        street: {
            type: String,
            required: true,
            trim: true,
        },
        city: {
            type: String,
            required: true,
            trim: true,
        },
        state: {
            type: String,
            required: false,
            trim: true,
        },
        pincode: {
            type: String,
            required: false,
            trim: true,
        },
        coordinates: {
            latitude: Number,
            longitude: Number
        }
    },
    requestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Request',
        required: true
    },
    outletId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Outlet',
        required: true
    },
    deliveryPersonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Consumer',
        required: false
    },
    trackingNotes: [{
        status: String,
        note: String,
        timestamp: {
            type: Date,
            default: Date.now
        }
    }],
    deliveryProof: {
        signature: String,
        photo: String,
        remarks: String
    },
    priority: {
        type: String,
        enum: ['low', 'normal', 'high', 'urgent'],
        default: 'normal'
    }
}, {timestamps: true});

// Add indexes for better query performance
deliverySchema.index({ status: 1, deliveryDate: 1 });
deliverySchema.index({ requestId: 1 });
deliverySchema.index({ deliveryPersonId: 1 });

const Delivery = mongoose.model('Delivery', deliverySchema);
export default Delivery;