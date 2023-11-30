const express = require('express');
const userAuth = require('../middlewares/require-auth');
const checkRoles = require('../middlewares/require-role');
const UserModel = require('../models/User');
const PasswordHash = require('../utils/hash');

module.exports = function (app) {
  const userRouter = express.Router();

  const adminRoleMiddleware = [userAuth, checkRoles(['ADMIN'])];
  const restaurantRoleMiddleware = [userAuth, checkRoles(['RESTAURANT'])];

  userRouter.get('/all-restaurants', adminRoleMiddleware, async (req, res) => {
    try {
      const users = await UserModel.find({ role: 'RESTAURANT' });
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  userRouter.get('/current', userAuth, async (req, res) => {
    try {
      res.status(200).json(req.user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  userRouter.post('/new-restaurant', adminRoleMiddleware, async (req, res) => {
    try {
      const { restaurantUser } = req.body;
      const hashedPassword = await PasswordHash.hash(restaurantUser.password);

      const newUser = new UserModel({
        ...restaurantUser,
        role: 'RESTAURANT',
        password: hashedPassword,
      });

      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  userRouter.delete('/:userId', adminRoleMiddleware, async (req, res) => {
    try {
      const deleteResult = await UserModel.deleteOne({ _id: req.params.userId });
      res.status(200).json(deleteResult);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  userRouter.patch('/:userId', restaurantRoleMiddleware, async (req, res) => {
    try {
      const updatedUser = await UserModel.findOneAndUpdate(
        { _id: req.params.userId },
        req.body.restaurantUser,
        { new: true, runValidators: true }
      );

      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  app.use('/users', userRouter);
};

