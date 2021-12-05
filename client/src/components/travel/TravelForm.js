import React, { useState } from "react";

const TravelForm = () => {
  const [travel, setTravel] = useState({
    title: "",
    description: "",
    date: null,
    usedTravelType: null,
    usedOrigin: "",
    usedDestination: "",
    avoidedTravelType: null,
    avoidedOrigin: "",
    avoidedDestination: "",
  });

  const {
    title,
    description,
    date,
    usedTravelType,
    usedOrigin,
    usedDestination,
    avoidedTravelType,
    avoidedOrigin,
    avoidedDestination,
  } = travel;

  const onChange = (e) =>
    setTravel({ ...travel, [e.target.name]: e.target.value });

  return (
    <form className="form-container">
      <h2 className="text-primary">Travel Action</h2>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          name="description"
          placeholder="(Optional) Describe your green travel"
          value={description}
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          value={date}
          onChange={onChange}
        />
      </div>

      <div className="card">
        <h2 className="text-left">Travel Used</h2>
        <div className="form-group">
          <label>Travel type</label>
          <select name="usedTravelType" onChange={onChange}>
            <option value="bicycling">Bicycling</option>
            <option value="walking">Walking</option>
            <option value="transit" disabled>
              Transit (coming soon)
            </option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="usedOrigin">Origin</label>
          <input type="text" id="usedOrigin" placeholder="Enter a location" />
        </div>
        <div className="form-group">
          <label htmlFor="usedDestination">Destination</label>
          <input
            type="text"
            id="usedDestination"
            placeholder="Enter a location"
          />
        </div>
      </div>

      <div>
        <input
          type="submit"
          value="Submit"
          className="btn btn-primary btn-block"
        />
      </div>
    </form>
  );
};

export default TravelForm;
