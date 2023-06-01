const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
    items: [
        {
            name: String,
            price: Number,
            quantity: Number,
        },
    ],
    totalPrice: Number,
    deliveryAddress: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String,
    },
    status: String,
});

const OrderModel = mongoose.model("Order", OrderSchema);

module.exports = { OrderModel };
