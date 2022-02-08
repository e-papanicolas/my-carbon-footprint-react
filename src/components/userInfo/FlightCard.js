import "../../styles/UserInfo.css";

function FlightCard({ flight, onDeleteData }) {
  return (
    <div className="emission-card">
      <h4 className="card-header">{`${flight.departure} → ${flight.destination}`}</h4>
      <ul>
        <p>Date estimated: {flight.date.slice(0, 10)}</p>
        <p className="hide">Number of passengers: {flight.passengers}</p>
        <div>
          <p>Estimated carbon emission:</p>
          <p className="hide"> (per person)</p>
          <p>
            <strong>
              {" "}
              {(Math.round((flight.carbon_lb / flight.passengers) * 100) / 100)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              lbs
            </strong>
          </p>
        </div>
      </ul>
      <button
        onClick={() => onDeleteData("flight_histories", flight)}
        className="carbon-estimate-btn + hide"
      >
        Delete History
      </button>
    </div>
  );
}

export default FlightCard;
