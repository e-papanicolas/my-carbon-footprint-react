import "../../../styles/EmissionPage.css";

function VehicleResults({ vehicleData, onSaveVehicleData, setVehicleResults }) {
  return (
    <div className="emission-popup">
      <div>
        <h2>Carbon Estimate:</h2>

        <h4>Date:</h4>
        <p>{vehicleData.date.slice(0, 10)}</p>

        <h4>Distance:</h4>
        <p>
          {vehicleData.distance_value} {vehicleData.distance_unit}
        </p>

        <h4>Vehicle:</h4>
        <p>
          {vehicleData.vehicle_year} {vehicleData.vehicle_make}{" "}
          {vehicleData.vehicle_model}
        </p>

        <h4>Carbon Estimate (lbs): </h4>
        <p>{vehicleData.carbon_lb}</p>
        <div>
          <button onClick={() => onSaveVehicleData(vehicleData)}>
            Save to History
          </button>
          <button onClick={() => setVehicleResults({ ...vehicleData, id: "" })}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default VehicleResults;
