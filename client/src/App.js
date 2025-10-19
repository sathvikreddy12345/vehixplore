import React, { useEffect, useState } from 'react';
import { getVehicles } from './api/vehicleApi';
import './App.css';

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [compare, setCompare] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  // Mapping of vehicle names to specific images
  const vehicleImages = {
    "Honda Civic": "/images/car1.jpeg",
    "Toyota Corolla": "/images/car2.jpeg",
    "Yamaha R15": "/images/bike1.jpeg",
    "KTM Duke": "/images/bike2.jpeg",
    "KTM Duke 390": "/images/bike.jpeg",
    "Tata Truck": "/images/truck1.jpeg",
    "Ashok Leyland": "/images/truck2.jpeg",
    "Volvo Truck": "/images/truck.jpeg"
    // Add more vehicles as needed
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getVehicles();
      setVehicles(data);
    };
    fetchData();
  }, []);

  const getVehicleImage = (vehicle) => {
    return vehicleImages[vehicle.name] || "/images/default.jpg";
  };

  const toggleCompare = (vehicle) => {
    setCompare(prev => {
      if (prev.find(v => v._id === vehicle._id)) {
        return prev.filter(v => v._id !== vehicle._id);
      }
      if (prev.length < 2) {
        const newCompare = [...prev, vehicle];
        if (newCompare.length === 2) setShowPopup(true);
        return newCompare;
      }
      alert("You can compare only 2 vehicles at a time!");
      return prev;
    });
  };

  const closePopup = () => {
    setShowPopup(false);
    setCompare([]);
  };

  // Group vehicles by type
  const vehiclesByType = vehicles.reduce((acc, vehicle) => {
    if (!acc[vehicle.type]) acc[vehicle.type] = [];
    acc[vehicle.type].push(vehicle);
    return acc;
  }, {});

  return (
    <div className="App">
      <h1>Vehixplore</h1>

      {/* Loop through each type */}
      {Object.keys(vehiclesByType).map(type => (
        <div key={type}>
          <h2>{type.charAt(0).toUpperCase() + type.slice(1)}s</h2>
          <div className="vehicle-list">
            {vehiclesByType[type].map(vehicle => (
              <div key={vehicle._id} className="vehicle-card">
                <img src={getVehicleImage(vehicle)} alt={vehicle.name} />
                <h3>{vehicle.name}</h3>
                <p>Brand: {vehicle.brand}</p>
                <p>Price: ${vehicle.price}</p>
                <p>Features: {vehicle.features.join(', ')}</p>
                <button onClick={() => toggleCompare(vehicle)}>Compare</button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Popup Comparison */}
      {showPopup && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-btn" onClick={closePopup}>&times;</span>
            <h2>Vehicle Comparison</h2>
            <div className="comparison-table">
              <table>
                <thead>
                  <tr>
                    <th>Feature</th>
                    {compare.map(vehicle => (
                      <th key={vehicle._id}>{vehicle.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Image</td>
                    {compare.map(vehicle => (
                      <td key={vehicle._id}>
                        <img src={getVehicleImage(vehicle)} alt={vehicle.name} width="160" />
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td>Type</td>
                    {compare.map(vehicle => (
                      <td key={vehicle._id}>{vehicle.type}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Brand</td>
                    {compare.map(vehicle => (
                      <td key={vehicle._id}>{vehicle.brand}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Price</td>
                    {compare.map(vehicle => (
                      <td key={vehicle._id}>${vehicle.price}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Features</td>
                    {compare.map(vehicle => (
                      <td key={vehicle._id}>{vehicle.features.join(', ')}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
