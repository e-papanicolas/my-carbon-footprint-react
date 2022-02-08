import { useState } from "react";

function ShippingForm({
  handleFormSubmit,
  setShippingResults,
  shippingResults,
}) {
  const [shippingData, setShippingData] = useState({
    weight: 0,
    distance: 0,
    method: "",
  });

  function handleShippingDataChange(e) {
    setShippingData({
      ...shippingData,
      [e.target.name]: e.target.value,
    });
  }

  function onFormSubmit(e) {
    e.preventDefault();
    handleFormSubmit(shippingData);
    setShippingResults({ ...shippingResults, id: "" });
  }

  return (
    <div className="emission-form-container">
      <form onSubmit={onFormSubmit}>
        <div className="form-input">
          <label>Weight (lbs):</label>
          <input
            type="text"
            placeholder="Ex: 10.0"
            name="weight"
            onChange={handleShippingDataChange}
          ></input>
        </div>
        <div className="form-input">
          <label>Distance (mi):</label>
          <input
            type="text"
            placeholder="Ex: 250.0"
            name="distance"
            onChange={handleShippingDataChange}
          ></input>
        </div>
        <div className="form-input">
          <label>Shipping method:</label>
          <select
            name="method"
            id="transport_method"
            onChange={handleShippingDataChange}
          >
            <option value="select method">Select Method</option>
            <option value="plane">Plane</option>
            <option value="truck">Truck</option>
            <option value="train">Train</option>
            <option value="ship">Ship</option>
          </select>
        </div>
        <button type="submit">Get Carbon Estimate</button>
      </form>
    </div>
  );
}

export default ShippingForm;
