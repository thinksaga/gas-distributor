import Product from '../models/product.model.js';
import { AppError } from '../middleware/errorHandler.js';

class ProductService {
    // Get all products with pagination and filtering
    async getAllProducts(options = {}) {
        const { page = 1, limit = 10, search, minPrice, maxPrice, weight } = options;

        const query = {};

        // Search by name
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        // Filter by price range
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        // Filter by weight
        if (weight) {
            query.weight = weight;
        }

        const skip = (page - 1) * limit;

        // Execute query with pagination
        const [products, total] = await Promise.all([
            Product.find(query)
                .select('name price weight description image')
                .limit(Number(limit))
                .skip(skip)
                .lean(),
            Product.countDocuments(query)
        ]);

        return {
            products,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        };
    }

    // Get product by ID
    async getProductById(id) {
        const product = await Product.findById(id).lean();

        if (!product) {
            throw new AppError('Product not found', 404);
        }

        return product;
    }

    // Create new product
    async createProduct(productData) {
        const product = await Product.create(productData);
        return product;
    }

    // Update product
    async updateProduct(id, updateData) {
        const product = await Product.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).lean();

        if (!product) {
            throw new AppError('Product not found', 404);
        }

        return product;
    }

    // Delete product
    async deleteProduct(id) {
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            throw new AppError('Product not found', 404);
        }

        return { message: 'Product deleted successfully' };
    }
}

export default new ProductService();
