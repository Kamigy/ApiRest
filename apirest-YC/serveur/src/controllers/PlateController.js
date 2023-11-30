const { Router } = require("express");
const requireRoles = require("../middlewares/require-role");
const requireAuth = require("../middlewares/require-auth");
const Plate = require("../models/Plate");

/**
 * @param {Express.Application} app
 * @param {Router} router
 */
module.exports = function (app, router) {
  router.get(
    "/user/:id/plates",
    [requireAuth, requireRoles(["RESTAURANT"])],
    async (req, res) => {
        try {
            res.send(await Plate.find({ userId: req.params.id }));
        } catch (e) {
            res.status(400).send(e);
        }
    }
  );

  router.get(
    "/user/:userId/plate/:plateId",
    [requireAuth, requireRoles(["RESTAURANT"])],
    async (req, res) => {
        try {
            res.status(200).send(await Plate.findOne({ _id: req.params.plateId , userId: req.params.userId }));
        } catch (e) {
            res.status(400).send(e);
        }
    }
  );

  router.post("/user/:id/plate", [requireAuth, requireRoles(["RESTAURANT"])], async (req, res) => {
    try {       
      const plate = await Plate.create({
        name: req.body.newPlate?.name,
        image: req.body.newPlate?.image,
        price: req.body.newPlate?.price,
        userId: req.params.id,
      });

      res.status(201).send(plate);
    } catch (e) {
      res.status(400).send(e);
    }
  });

  router.patch("/user/:userId/plate/:plateId", async (req, res) => {
    try {
      const plate = await Plate.findOneAndUpdate(
        { _id: req.params.plateId, userId: req.params.userId },
        req.body.newPlate,
        { new: true, runValidators: true }
      );

      res.status(200).send(plate);
    } catch (e) {
      res.status(400).send(e);
    }
  });
};
