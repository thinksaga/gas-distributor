import productService from '../services/product.service.js';
import { catchAsync } from '../middleware/errorHandler.js';

export const getAllProducts = catchAsync(async (req, res) => {
    const { page, limit, search, minPrice, maxPrice, weight } = req.query;

    const result = await productService.getAllProducts({
        page,
        limit,
        search,
        minPrice,
        maxPrice,
        weight
    });

    res.status(200).json({
        success: true,
        data: result.products,
        pagination: result.pagination
    });
});

export const getProductById = catchAsync(async (req, res) => {
    const product = await productService.getProductById(req.params.id);

    res.status(200).json({
        success: true,
        data: product
    });
});

export const createProduct = catchAsync(async (req, res) => {
    const product = await productService.createProduct(req.body);

    res.status(201).json({
        success: true,
        message: 'Product created successfully',
        data: product
    });
});

export const updateProduct = catchAsync(async (req, res) => {
    const product = await productService.updateProduct(req.params.id, req.body);

    res.status(200).json({
        success: true,
        message: 'Product updated successfully',
        data: product
    });
});

export const deleteProduct = catchAsync(async (req, res) => {
    await productService.deleteProduct(req.params.id);

    res.status(200).json({
        success: true,
        message: 'Product deleted successfully'
    });
});
