import mongoose from "mongoose";

const gasstockSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        required: true,
        enum: ["All", "Pending", "Approved", "Delivered", "Cancelled", "In Progress"],
        default: 'available',
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Consumer',
        required: true
    },
}, { timestamps: true });

const Gasstock = mongoose.model('Gasstock', gasstockSchema);
export default Gasstock;