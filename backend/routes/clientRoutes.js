const express = require("express");
const router = express.Router();

const Client = require("../models/Client");

// ADD NEW CLIENT (POST)
router.post("/", async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            company,
            status,
            address,
            notes
        } = req.body;

        const existingClient = await Client.findOne({ email });

        if (existingClient) {
            return res.status(400).json({
                message: "Client with this email already exists"
            });
        }

        const newClient = new Client({
            name,
            email,
            phone,
            company,
            status,
            address,
            notes
        });

        const savedClient = await newClient.save();

        res.status(201).json({
            message: "Client added successfully",
            client: savedClient
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
// UPDATE CLIENT (PUT)
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const updatedClient = await Client.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedClient) {
            return res.status(404).json({
                message: "Client not found"
            });
        }

        res.status(200).json({
            message: "Client updated successfully",
            client: updatedClient
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// GET ALL CLIENTS (GET)
router.get("/", async (req, res) => {
    try {
        const clients = await Client.find().sort({
            createdAt: -1
        });

        res.status(200).json({
            message: "Clients retrieved successfully",
            totalClients: clients.length,
            clients: clients
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
// DELETE CLIENT (DELETE)
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deletedClient = await Client.findByIdAndDelete(id);

        if (!deletedClient) {
            return res.status(404).json({
                message: "Client not found"
            });
        }

        res.status(200).json({
            message: "Client deleted successfully",
            client: deletedClient
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
// SEARCH CLIENTS
router.get("/search", async (req, res) => {
    try {
        const { keyword } = req.query;

        if (!keyword || !keyword.trim()) {
            return res.status(400).json({
                message: "Search keyword is required"
            });
        }

        const clients = await Client.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { email: { $regex: keyword, $options: "i" } },
                { company: { $regex: keyword, $options: "i" } }
            ]
        });

        res.status(200).json({
            message: "Search completed successfully",
            totalClients: clients.length,
            clients
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


module.exports = router;