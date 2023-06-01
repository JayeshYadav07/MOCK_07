const express = require("express");
const OrderRoutes = express.Router();
const { OrderModel } = require("../models/OrderModel");

OrderRoutes.post("/orders", async (req, res) => {
    const { user, restaurant, items, totalPrice, deliveryAddress } = req.body;
    try {
        const order = new OrderModel({
            user,
            restaurant,
            items,
            totalPrice,
            deliveryAddress,
            status: "placed",
        });
        await order.save();
        res.status(201).send({ msg: "Order placed successfully.", order });
    } catch (error) {
        res.status(500).send({
            msg: "Something went wrong.",
            error: error.message,
        });
    }
});
OrderRoutes.get("/orders/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const Order = await OrderModel.findById(id);
        res.status(201).send({ Order: Order });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});
OrderRoutes.patch("/orders/:id", async (req, res) => {
    const id = req.params.id;
    const status = req.body.status;
    try {
        const Order = await OrderModel.findByIdAndUpdate(id, {
            status: status,
        });
        res.status(200).send({ message: "Status updated successfully!" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

module.exports = { OrderRoutes };
