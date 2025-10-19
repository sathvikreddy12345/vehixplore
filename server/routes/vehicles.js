const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle'); 

// Get all vehicles
router.get('/', async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.json(vehicles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get single vehicle
router.get('/:id', async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        res.json(vehicle);
    } catch (err) {
        res.status(404).json({ message: 'Vehicle not found' });
    }
});

// Add new vehicle
router.post('/', async (req, res) => {
    const vehicle = new Vehicle(req.body);
    try {
        const savedVehicle = await vehicle.save();
        res.status(201).json(savedVehicle);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
