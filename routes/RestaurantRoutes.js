const express = require("express");
const { RestaurantModel } = require("../models/RestaurantModel");
const RestaurantRoutes = express.Router();

RestaurantRoutes.post("/restaurants", async (req, res) => {
    const { name, address, menu } = req.body;
    try {
        const newRestaurant = new RestaurantModel({ name, address, menu });
        await newRestaurant.save();
        res.status(201).send({
            message: "Restaurant created successfully",
            data: newRestaurant,
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

RestaurantRoutes.get("/restaurants", async (req, res) => {
    try {
        const Restaurants = await RestaurantModel.find({});
        res.status(200).send({ Restaurants: Restaurants });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

RestaurantRoutes.get("/restaurants/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const Restaurant = await RestaurantModel.findById(id);
        res.status(200).send({ Restaurant: Restaurant });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

RestaurantRoutes.get("/restaurants/:id/menu", async (req, res) => {
    const { id } = req.params;
    try {
        const Restaurant = await RestaurantModel.findById(id);
        res.status(200).send({ Menu: Restaurant.menu });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

RestaurantRoutes.delete(
    "/restaurants/:restaurantId/menu/:menuId",
    async (req, res) => {
        const { restaurantId, menuId } = req.params;
        try {
            const Restaurant = await RestaurantModel.findById(restaurantId);
            const newMenu = Restaurant.menu.filter((item) => {
                return item._id.toString() !== menuId.toString();
            });
            await RestaurantModel.findByIdAndUpdate(restaurantId, {
                menu: newMenu,
            });
            res.status(200).send({ message: "Menu deleted successfully" });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
);

RestaurantRoutes.post("/restaurants/:restaurantId/menu", async (req, res) => {
    const { restaurantId } = req.params;
    const data = req.body.data;
    try {
        const Restaurant = await RestaurantModel.findById(restaurantId);
        const newMenu = Restaurant.menu;
        newMenu.push(data);

        await RestaurantModel.findByIdAndUpdate(restaurantId, {
            menu: newMenu,
        });
        
        res.status(201).send({ message: "New menu item added successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

module.exports = { RestaurantRoutes };
