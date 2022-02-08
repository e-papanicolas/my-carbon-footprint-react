import { useState } from "react";
import { states } from "./ElectricityFormState";

function ElectricityForm({
  handleFormSubmit,
  setElectricityResults,
  electricityResults,
}) {
  const [electricityData, setElectricityData] = useState({
    state: "",
    electricity_value: "",
  });

  function onFormSubmit(e) {
    e.preventDefault();
    handleFormSubmit(electricityData);
    setElectricityResults({ ...electricityResults, id: "" });
  }

  function handleElectricityDataChange(e) {
    setElectricityData({
      ...electricityData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="emission-form-container">
      <form onSubmit={onFormSubmit}>
        <div className="form-input">
          <label>Electricity used (kWh):</label>
          <input
            type="text"
            placeholder="Ex: 12.3"
            name="electricity_value"
            onChange={handleElectricityDataChange}
          ></input>
        </div>

        <div className="form-input">
          <label>State:</label>
          <select
            name="state"
            id="state"
            onChange={handleElectricityDataChange}
          >
            <option value="Select State">Select State</option>
            {states.map((state) => (
              <option key={state} value={state.toLowerCase()}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Get Carbon Estimate</button>
      </form>
    </div>
  );
}

export default ElectricityForm;
