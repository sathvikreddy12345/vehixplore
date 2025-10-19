const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['Car', 'Bike', 'Truck'], required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    features: [String],
    image: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);
