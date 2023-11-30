const express = require('express');
const orderMiddleware = require('../middlewares/require-role');
const authMiddleware = require('../middlewares/require-auth');
const OrderModel = require('../models/Order');

module.exports = function(app) {
  const orderRouter = express.Router();

  const checkAuthAndRole = [authMiddleware, orderMiddleware(['RESTAURANT'])];

  orderRouter.get('/orders/:userId', checkAuthAndRole, async (req, res) => {
    try {
      const userOrders = await OrderModel.find({
        userId: req.params.userId,
        status: 'PROCESSED'
      });
      res.status(200).json(userOrders);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  orderRouter.patch('/orders/:userId/:orderId', checkAuthAndRole, async (req, res) => {
    try {
      const updatedOrder = await OrderModel.findOneAndUpdate(
        {
          _id: req.params.orderId,
          userId: req.params.userId
        },
        { status: 'CANCELED' },
        { new: true, runValidators: true }
      );

      if (!updatedOrder) {
        return res.status(404).json({ message: 'Order not found.' });
      }

      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  app.use('/user', orderRouter);
};
