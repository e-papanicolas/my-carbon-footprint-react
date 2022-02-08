import React, { useState, useEffect } from "react";

function VehicleForm({
  handleVehicleFormSubmit,
  setVehicleResults,
  vehicleResults,
}) {
  // set all states
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);

  const [vehicleFormData, setVehicleFormData] = useState({
    distance_value: 0,
    vehicle_model_id: "",
  });
  const [modelList, setModelList] = useState([]);

  // get all vehicle makes and sort
  useEffect(() => {
    let isAPISubscribed = true;
    fetch(`https://www.carboninterface.com/api/v1/vehicle_makes`, {
      method: "GET",
      headers: {
        Authorization: "Bearer 5VRMUOEjTcf6Yl04DbDVg",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (isAPISubscribed) {
          let vehicleMakes = [];
          for (let i = 0; i < data.length; i++) {
            vehicleMakes.push({
              name: data[i].data.attributes.name,
              id: data[i].data.id,
            });
          }

          let sorted = vehicleMakes.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });

          setMakes(sorted);
        }
      });
    return () => {
      isAPISubscribed = false;
    };
  }, []);

  // subsequent get req for all models based on selected make
  function handleModels(e) {
    const selectedIndex = e.target.selectedIndex;
    const make_id = e.target.childNodes[selectedIndex].getAttribute("id");
    fetch(
      `https://www.carboninterface.com/api/v1/vehicle_makes/${make_id}/vehicle_models`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer 5VRMUOEjTcf6Yl04DbDVg`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        let vehicleModels = [];
        for (let i = 0; i < data.length; i++) {
          vehicleModels.push({
            name: data[i].data.attributes.name,
            id: data[i].data.id,
            year: data[i].data.attributes.year,
          });
        }

        let names = vehicleModels.map((model) => model.name);
        const uniqueModels = [...new Set(names)];

        const groups = uniqueModels.map((name) => {
          let obj = {
            groupName: name,
            cars: [],
          };

          vehicleModels.forEach((model) => {
            if (model.name === obj.groupName) {
              obj.cars.push(model);
            }
          });

          return obj;
        });

        let sorted2 = groups.sort((a, b) => {
          if (a.groupName < b.groupName) {
            return -1;
          }
          if (a.groupName > b.groupName) {
            return 1;
          }
          return 0;
        });

        const optGroups = sorted2.map((modelGroup) => {
          return (
            <optgroup key={modelGroup.groupName} label={modelGroup.groupName}>
              {modelGroup.cars.map((car) => {
                return (
                  <option value={car.name} id={car.id} key={car.id}>
                    {car.year} {car.name}
                  </option>
                );
              })}
            </optgroup>
          );
        });
        let sorted = vehicleModels.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });

        setModels(optGroups);
        setModelList(sorted);
      });
  }

  // handles saving form changes to state
  function handleVehicleFormChange(e) {
    if (e.target.name === "vehicle_model_id") {
      const modelId = modelList[e.target.selectedIndex - 1].id;

      setVehicleFormData({
        ...vehicleFormData,
        vehicle_model_id: modelId,
      });
    } else {
      setVehicleFormData({
        ...vehicleFormData,
        [e.target.name]: e.target.value,
      });
    }
  }

  // handles form submission and sends it back up to app
  function onVehicleFormSubmit(e) {
    e.preventDefault();
    handleVehicleFormSubmit(vehicleFormData);
    setVehicleResults({ ...vehicleResults, id: "" });
  }

  return (
    <div className="emission-form-container">
      <form onSubmit={onVehicleFormSubmit}>
        <div className="form-input">
          <label>Distance (mi):</label>
          <input
            type="text"
            placeholder="Ex: 123"
            name="distance_value"
            onChange={handleVehicleFormChange}
          ></input>
        </div>
        <div className="form-input">
          <label>Vehicle Make:</label>
          <select name="vehicle_make" onChange={handleModels}>
            <option value="Select a Make">Select a Make</option>
            {makes.map((make) => {
              return (
                <option key={make.id} id={make.id} value={make.name}>
                  {make.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-input">
          <label>Vehicle Model:</label>
          <select name="vehicle_model_id" onChange={handleVehicleFormChange}>
            <option value="Select a Model">Select a Model</option>
            {models}
          </select>
        </div>

        <button type="submit">Get Carbon Estimate</button>
      </form>
    </div>
  );
}

export default VehicleForm;
