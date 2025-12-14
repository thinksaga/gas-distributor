import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Consumer',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 200
    },
    message: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 1000
    },
    type: {
        type: String,
        required: true,
        enum: ['request_status', 'payment', 'delivery', 'system', 'general'],
        default: 'general'
    },
    isRead: {
        type: Boolean,
        default: false
    },
    relatedRequestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Request',
        required: false
    }
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;