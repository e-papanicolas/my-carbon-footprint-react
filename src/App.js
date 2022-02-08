import './App.css';
import { useState, useEffect } from "react"
import { useNavigate, Route, Routes} from "react-router-dom";

import SignInSide from './components/SignInSide';
import SignUp from './components/SignUp';
import About from './components/About';
import NavBar from './components/NavBar';
import Estimate from './components/estimates/Estimate';
import UserInfo from "./components/userInfo/UserInfo";


function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const [shippingHistory, setShippingHistory] = useState([]);
  const [flightHistory, setFlightHistory] = useState([]);
  const [vehicleHistory, setVehicleHistory] = useState([]);
  const [electricityHistory, setElectricityHistory] = useState([]);

  function handleSignin(user) {
    setCurrentUser(user);
    setLoggedIn(true);
  }

  function handleLogOut() {
    fetch("/signout", {
      method: "DELETE",
    }).then(() => {
      navigate("/")
      setLoggedIn(false)
    });
  }


  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((user) => {
          setCurrentUser(user);
          console.log(user);
          setFlightHistory(user.flight_histories)
          setVehicleHistory(user.vehicle_histories)
          setElectricityHistory(user.electricity_histories)
          setShippingHistory(user.shipping_histories)
          setLoggedIn(true);
        });
      }
      else {
        response.json().then((error) => console.log(error))
      }
    });
  }, [loggedIn]);




  function handleDeleteData(location, item) {
    fetch(`/${location}/${item.id}`, {
      method: "DELETE",
    });

    let update;
    switch (location) {
      case "shipping_histories":
        update = shippingHistory.filter((shipping) => shipping.id !== item.id);
        setShippingHistory(update);
        break;
      case "flight_histories":
        update = flightHistory.filter((flight) => flight.id !== item.id);
        setFlightHistory(update);
        break;
      case "electricity_histories":
        update = electricityHistory.filter(
          (electricity) => electricity.id !== item.id
        );
        setElectricityHistory(update);
        break;
      case "vehicle_histories":
        update = vehicleHistory.filter((vehicle) => vehicle.id !== item.id);
        setVehicleHistory(update);
        break;
      default:
        console.log("deleted!!");
    }
  }

  function handleShippingSaveData(shipment) {
    fetch(`/shipping_histories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: shipment.date,
        weight: shipment.weight,
        distance: shipment.distance,
        method: shipment.method,
        carbon_lb: shipment.carbon_lb,
        user_id: currentUser.id,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => setShippingHistory([...shippingHistory, data]));
  }

  function handleFlightSaveData(flight) {
    fetch(`/flight_histories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: flight.date,
        passengers: flight.passengers,
        departure: flight.departure,
        destination: flight.destination,
        carbon_lb: flight.carbon_lb,
        user_id: currentUser.id,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => setFlightHistory([...flightHistory, data]));
  }

  function handleVehicleSaveData(vehicle) {
    fetch(`/vehicle_histories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: vehicle.date,
        distance_value: vehicle.distance_value,
        vehicle_make: vehicle.vehicle_make,
        vehicle_model: vehicle.vehicle_model,
        vehicle_year: vehicle.vehicle_year,
        carbon_lb: vehicle.carbon_lb,
        user_id: currentUser.id,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => setVehicleHistory([...vehicleHistory, data]));
  }

  function handleElectricitySaveData(electricity) {
    fetch(`/electricity_histories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: electricity.date,
        country: electricity.country,
        state: electricity.state,
        electricity_value: electricity.electricity_value,
        carbon_lb: electricity.carbon_lb,
        user_id: currentUser.id,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => setElectricityHistory([...electricityHistory, data]));
  }




  if(loggedIn === false) {
    return (
      <div>
        <Routes>
          <Route 
            path="/signup" 
            element={<SignUp setCurrentUser={setCurrentUser}/>}
          />

          <Route 
            exact path="/"
            element={<SignInSide onSignin={handleSignin}/>}
          />
        </Routes>
      </div>
    )
  }

  return (
    <div className="App">
      <div className="background"></div>
      <NavBar
        handleLogOut={handleLogOut}
        user={currentUser}
      />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route
          path="/user"
          element={
            <UserInfo
              user={currentUser}
              onDeleteData={handleDeleteData}
              flightHistory={flightHistory}
              shippingHistory={shippingHistory}
              vehicleHistory={vehicleHistory}
              electricityHistory={electricityHistory}
              onSaveVehicleData={handleVehicleSaveData}
              onSaveShippingData={handleShippingSaveData}
              onSaveFlightData={handleFlightSaveData}
              onSaveElectricityData={handleElectricitySaveData}
            />
          }
        />

        <Route
          path="/"
          element={
            <Estimate
              onSaveVehicleData={handleVehicleSaveData}
              onSaveShippingData={handleShippingSaveData}
              onSaveFlightData={handleFlightSaveData}
              onSaveElectricityData={handleElectricitySaveData}
              onDeleteData={handleDeleteData}
              flightHistory={flightHistory}
              electricityHistory={electricityHistory}
              vehicleHistory={vehicleHistory}
              shippingHistory={shippingHistory}
            />
          }
        />
        {/* <Route
          path="/"
          component={() => (
            <Homepage
              user={user}
              loggedIn={loggedIn}
              setUser={setUser}
              setLoggedIn={setLoggedIn}
              flightHistory={flightHistory}
              shippingHistory={shippingHistory}
              vehicleHistory={vehicleHistory}
              electricityHistory={electricityHistory}
            />
          )}
        /> */}
      </Routes> 
    </div>
  );

}

export default App;