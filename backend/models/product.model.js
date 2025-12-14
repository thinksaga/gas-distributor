import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 100
    },
    type: {
        type: String,
        required: true,
        enum: ['Domestic', 'Commercial'],
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 1
    },
    weight: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxLength: 500
    },
    image: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Product = mongoose.model('Product', productSchema);
export default Product;