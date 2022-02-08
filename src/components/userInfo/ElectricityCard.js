import "../../styles/UserInfo.css";

function ElectricityCard({ electricity, onDeleteData }) {
  return (
    <div className="emission-card">
      <h4 className="card-header">{electricity.date.slice(0, 10)}</h4>
      <ul>
        <p className="hide">Country: {electricity.country}</p>
        <p className="hide">State: {electricity.state}</p>
        <p>Electricity used: {electricity.electricity_value} kWh</p>
        <div>
          <p>Estimated carbon emission: </p>
          <p>
            <strong>
              {(Math.round(electricity.carbon_lb * 100) / 100)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              lbs
            </strong>
          </p>
        </div>
      </ul>
      <button
        onClick={() => onDeleteData("electricity_histories", electricity)}
        className="carbon-estimate-btn + hide"
      >
        Delete History
      </button>
    </div>
  );
}

export default ElectricityCard;