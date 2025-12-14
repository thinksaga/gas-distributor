import RequestModel from "../models/request.model.js";
import Outlet from "../models/outlet.model.js";
import Gasstock from "../models/gasstock.model.js";
import { createNotification } from "./notification.controller.js";

export const changeStatus = async (req, res) => {
    try {
        const {id, status} = req.body

        const request = await RequestModel.findByIdAndUpdate(id, {status}, {new: true})
            .populate('consumerId', 'name email')
            .populate('productId', 'name');

        if (!request) {
            return res.status(404).json({success: false, message: "Request not found"})
        }

        // Create notification for the consumer
        let notificationTitle = '';
        let notificationMessage = '';

        switch(status) {
            case 'approved':
                notificationTitle = 'Request Approved';
                notificationMessage = `Your request for ${request.gasType || 'gas'} has been approved.`;
                break;
            case 'rejected':
                notificationTitle = 'Request Rejected';
                notificationMessage = `Your request for ${request.gasType || 'gas'} has been rejected.`;
                break;
            case 'delivered':
                notificationTitle = 'Gas Delivered';
                notificationMessage = `Your ${request.gasType || 'gas'} has been successfully delivered.`;
                break;
            case 'pending':
                notificationTitle = 'Request Processing';
                notificationMessage = `Your request for ${request.gasType || 'gas'} is being processed.`;
                break;
            default:
                notificationTitle = 'Request Status Updated';
                notificationMessage = `Your request status has been updated to ${status}.`;
        }

        await createNotification(
            request.consumerId._id || request.consumerId,
            notificationTitle,
            notificationMessage,
            'request_status',
            request._id
        );

        res.status(200).json({success: true, message: "Status updated"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const checkStatus = async (req, res) => {
    try {
        const id = req.params.id

        const outlet = await Outlet.findById(id)

        if (!outlet) {
            return res.status(404).json({message: "Outlet not found"})
        }

        const stock = await Gasstock.findById(outlet.stockId)


        res.status(200).json({success: true, data: {stock: stock, outlet: outlet}})

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}