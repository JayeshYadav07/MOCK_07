const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/UserModel");
const UserRoutes = express.Router();
require("dotenv").config();

UserRoutes.post("/register", async (req, res) => {
    const { name, email, password, address } = req.body;
    try {
        const newPassword = bcrypt.hashSync(password, 10);
        const user = new UserModel({
            name,
            email,
            password: newPassword,
            address,
        });
        await user.save();
        res.status(201).send({ message: "User created successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

UserRoutes.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.status(200).send({
            token: token,
            message: "Logged in successfully",
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

UserRoutes.patch("/user/:id/reset", async (req, res) => {
    const id = req.params.id;
    let { password, newPassword } = req.body;
    const user = await UserModel.findById(id);
    if (!user) {
        return res.status(404).send({ message: "Invalid Id!" });
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
        return res.status(401).send({ message: "Incorrect Password!" });
    }
    newPassword = bcrypt.hashSync(newPassword, 10);
    const payload = await UserModel.findByIdAndUpdate(id, {
        password: newPassword,
    });
    res.status(200).send(payload);
});

module.exports = { UserRoutes };
