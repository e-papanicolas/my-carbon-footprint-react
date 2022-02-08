import React, { useState } from "react";
import { autocomplete } from "air-port-codes-node";
import Autocomplete from "@mui/material/Autocomplete";

function FlightForm({ handleFormSubmit, setFlightResults, flightResults }) {
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    passengers: 0,
  });

  const [airportData, setAirportData] = useState([]);

  const apca = autocomplete({
    key: "36048abe21",
    secret: "11f38cab1b305ca", // Your API Secret Key: use this if you are not connecting from a web server
    limit: 15,
  });

  function handleAirportSearch(e) {
    let term = e.target.value;
    apca.request(term);

    apca.onSuccess = (data) => {
      const allAirports = [];

      data.airports.map((airport) => {
        if (airport.children) {
          airport.children.forEach((airport) => allAirports.push(airport));
        } else {
          allAirports.push(airport);
        }
        return true;

      });

      setAirportData(allAirports);
  
    };

    apca.onError = (data) => {
      console.log("onError", data.message);
    };
  }

  function handleAirportSelect(e) {
    const code = e.target.value.split(" ").slice(-1).join("");

    setFormData({
      ...formData,
      [e.target.name]: code,
    });

    setAirportData([]);
  }

  function handleFormChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function onFormSubmit(e) {
    e.preventDefault();
    handleFormSubmit(formData);
    setFlightResults({ ...flightResults, id: "" });
  }

  return (
    <div className="emission-form-container">
      <form onSubmit={onFormSubmit} className="flight-search-container">
        <div className="flight-search">
          Origin Airport:{" "}
          <Autocomplete
            isOptionEqualToValue={(option, value) => option.id === value.id}
            sx={{
              display: "inline-block",
              "& input": {
                width: 220,
                bgcolor: "background.paper",
                border: "1px solid gray",
                borderRadius: "2px",
                color: (theme) =>
                  theme.palette.getContrastText(theme.palette.background.paper),
              },
            }}
            id="custom-input-demo"
            options={airportData.map(
              (airport) => `${airport.city}: ${airport.name} ${airport.iata}`
            )}
            renderInput={(params) => (
              <div ref={params.InputProps.ref} onChange={handleAirportSearch}>
                <input
                  type="text"
                  placeholder="Search City or Airport Code"
                  {...params.inputProps}
                  name="origin"
                  onSelect={handleAirportSelect}
                />
              </div>
            )}
          />
        </div>
        <div className="flight-search">
          Destination Airport:{" "}
          <Autocomplete
            isOptionEqualToValue={(option, value) => option.id === value.id}
            sx={{
              display: "inline-block",
              "& input": {
                width: 180,
                bgcolor: "background.paper",
                border: "1px solid gray",
                borderRadius: "2px",
                color: (theme) =>
                  theme.palette.getContrastText(theme.palette.background.paper),
              },
            }}
            id="custom-input-demo"
            options={airportData.map(
              (airport) => `${airport.city}: ${airport.name} ${airport.iata}`
            )}
            renderInput={(params) => (
              <div ref={params.InputProps.ref} onChange={handleAirportSearch}>
                <input
                  type="text"
                  placeholder="Search City or Airport Code"
                  {...params.inputProps}
                  name="destination"
                  onSelect={handleAirportSelect}
                />
              </div>
            )}
          />
        </div>
        <div className="form-input">
          <label>Number of Passengers: </label>
          <input
            type="text"
            placeholder="Ex: 3"
            name="passengers"
            onChange={handleFormChange}
          ></input>
        </div>
        <button type="submit">Get Carbon Estimate</button>
      </form>
    </div>
  );
}

export default FlightForm;
