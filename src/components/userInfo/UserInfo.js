import { useState } from "react";
import GrayColor from "./GrayColor";
import EditUserPopup from "./EditUserPopup";
import "../../styles/UserInfo.css";

function UserInfo({
  user,
  setUser,
  flightHistory,
  electricityHistory,
  shippingHistory,
  vehicleHistory,
}) {
  console.log(user);
  const [hideNewForm, setHideNewForm] = useState(true);

  const totalFlightCarbon = flightHistory.reduce(
    (count, flight) => (count += flight.carbon_lb / flight.passengers),
    0
  );

  const totalShippingCarbon = shippingHistory.reduce(
    (count, shipping) => (count += shipping.carbon_lb),
    0
  );

  const totalVehicleCarbon = vehicleHistory.reduce(
    (count, vehicle) => (count += vehicle.carbon_lb),
    0
  );

  const totalElectricCarbon = electricityHistory.reduce(
    (count, electricity) => (count += electricity.carbon_lb),
    0
  );

  const emissionHandler = (userInfo, total) => {
    return userInfo.length !== 0
      ? `${(Math.round(total * 100) / 100)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} lbs`
      : 0;
  };

  return (
    <div className="user-info">
      <div className="user-card-container">
        <div className="user-card">
          {hideNewForm ? (
            <>
              <br />
              <img src={user.image} alt="user" className="user-image" />
              <p>
                <strong>First Name:</strong> {user.first_name}
              </p>
              <p>
                <strong>Last Name:</strong> {user.last_name}
              </p>
              <p>
                <strong>Username:</strong> {user.username}
              </p>
              <br />
              <button
                onClick={() => setHideNewForm(!hideNewForm)}
                className="submit-button"
              >
                Edit Info
              </button>
            </>
          ) : (
            <>
              <EditUserPopup
                hideNewForm={hideNewForm}
                user={user}
                setUser={setUser}
                setHideNewForm={setHideNewForm}
              />
              <GrayColor
                setHideNewForm={setHideNewForm}
                hideNewForm={hideNewForm}
              />
            </>
          )}
        </div>
        <div className="carbon-emission-container">
          <div className="carbon-total">
            <h1>{user.first_name}'s total carbon emission</h1>
            <h1 className="total-user-emission">
              {(
                Math.round(
                  (totalFlightCarbon +
                    totalShippingCarbon +
                    totalVehicleCarbon +
                    totalElectricCarbon) *
                    100
                ) / 100
              )
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              lbs
            </h1>
          </div>

          <div className="carbon-breakdown-container">
            <div className="carbon-breakdown-title">
              <h2>Breakdown of carbon emission</h2>
            </div>
            <div className="carbon-breakdown-list">
              <div className="flight-carbon-result">
                <h2>Flight travel: </h2>
                <h1>{emissionHandler(flightHistory, totalFlightCarbon)}</h1>
              </div>
              <div className="vehicle-carbon-result">
                <h2>Automobile: </h2>
                <h1>{emissionHandler(vehicleHistory, totalVehicleCarbon)}</h1>
              </div>
              <div className="shipping-carbon-result">
                <h2>Shipping: </h2>
                <h1>{emissionHandler(shippingHistory, totalShippingCarbon)}</h1>
              </div>
              <div className="shipping-carbon-result">
                <h2>Electricity: </h2>
                <h1>
                  {emissionHandler(electricityHistory, totalElectricCarbon)}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <h1 style={{ marginBottom: "10px" }}>Carbon Estimate History</h1>
      <div className="results-container">
        <div className="results-column ">
          <h3>
            {flightHistory.length !== 0
              ? "Flight History"
              : "No saved flights yet"}
          </h3>
          <div className="card-container">
            {flightHistory.map((flight) => (
              <FlightCard
                key={flight.id}
                flight={flight}
                onDeleteData={onDeleteData}
              />
            ))}
          </div>
        </div>

        <div className="results-column ">
          <h3>
            {vehicleHistory.length !== 0
              ? "Automobile History"
              : "No saved vehicles yet"}
          </h3>
          <div className="card-container">
            {vehicleHistory.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onDeleteData={onDeleteData}
              />
            ))}
          </div>
        </div>

        <div className="results-column">
          <h3>
            {shippingHistory.length !== 0
              ? "Shipping History"
              : "No saved shipments yet"}
          </h3>
          <div className="card-container">
            {shippingHistory.map((shipment) => (
              <ShippingCard
                key={shipment.id}
                shipment={shipment}
                onDeleteData={onDeleteData}
              />
            ))}
          </div>
        </div>

        <div className="results-column">
          <h3>
            {electricityHistory.length !== 0
              ? "Electricity Usage History"
              : null}
          </h3>
          <div className="card-container">
            {electricityHistory.map((electricity) => (
              <ElectricityCard
                key={electricity.id}
                electricity={electricity}
                onDeleteData={onDeleteData}
              />
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default UserInfo;
