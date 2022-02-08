import "../../styles/UserInfo.css";

function ShippingCard({ shipment, onDeleteData }) {
    return (
      <div className="emission-card">
        <h4 className="card-header">{shipment.date.slice(0, 10)}</h4>
        <ul>
          <p className="hide">Weight: {shipment.weight} lbs</p>
          <p>Distance: {shipment.distance} mi</p>
          <p className="hide">Shipment method: {shipment.method}</p>
          <div>
            <p>Estimated carbon emission: </p>
            <p>
              <strong>
                {" "}
                {(Math.round(shipment.carbon_lb * 100) / 100)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                lbs
              </strong>
            </p>
          </div>
        </ul>
        <button
          onClick={() => onDeleteData("shipping_histories", shipment)}
          className="carbon-estimate-btn + hide"
        >
          Delete History
        </button>
      </div>
    );
  }
  
  export default ShippingCard;
  