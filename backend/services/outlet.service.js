import Outlet from '../models/outlet.model.js';
import { AppError } from '../middleware/errorHandler.js';

class OutletService {
    // Get all outlets with filtering
    async getAllOutlets(adminId, options = {}) {
        const { city, status } = options;

        const query = { adminId };

        if (city) {
            query.city = city;
        }

        if (status) {
            query['stock.status'] = status;
        }

        const outlets = await Outlet.find(query)
            .select('name location city stock')
            .lean();

        return outlets;
    }

    // Get outlet by ID
    async getOutletById(id, adminId) {
        const outlet = await Outlet.findOne({ _id: id, adminId }).lean();

        if (!outlet) {
            throw new AppError('Outlet not found', 404);
        }

        return outlet;
    }

    // Create new outlet
    async createOutlet(outletData) {
        const outlet = await Outlet.create(outletData);
        return outlet;
    }

    // Update outlet
    async updateOutlet(id, adminId, updateData) {
        const outlet = await Outlet.findOneAndUpdate(
            { _id: id, adminId },
            updateData,
            { new: true, runValidators: true }
        ).lean();

        if (!outlet) {
            throw new AppError('Outlet not found', 404);
        }

        return outlet;
    }

    // Delete outlet
    async deleteOutlet(id, adminId) {
        const outlet = await Outlet.findOneAndDelete({ _id: id, adminId });

        if (!outlet) {
            throw new AppError('Outlet not found', 404);
        }

        return { message: 'Outlet deleted successfully' };
    }

    // Get outlets by city
    async getOutletsByCity(city) {
        const outlets = await Outlet.find({ city })
            .select('name location stock')
            .lean();

        return outlets;
    }
}

export default new OutletService();
