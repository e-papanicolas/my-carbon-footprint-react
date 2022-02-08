import "../../styles/UserInfo.css";

function VehicleCard({ vehicle, onDeleteData }) {
  return (
    <div className="emission-card">
      <h4 className="card-header">
        {vehicle.vehicle_year} {vehicle.vehicle_make} {vehicle.vehicle_model}
      </h4>
      <ul>
        <p>Date estimated: {vehicle.date.slice(0, 10)}</p>

        <p className="hide">
          Trip: {vehicle.distance_value} {vehicle.distance_unit}
        </p>

        <div>
          <p>Estimated carbon emission:</p>
          <p>
            <strong>{vehicle.carbon_lb} lbs</strong>
          </p>
        </div>
      </ul>
      <button
        onClick={() => onDeleteData("vehicle_histories", vehicle)}
        className="carbon-estimate-btn + hide"
      >
        Delete History
      </button>
    </div>
  );
}

export default VehicleCard;