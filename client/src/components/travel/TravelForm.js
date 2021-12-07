import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import GoogleMapReact from "google-map-react";

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

  console.log(process.env);

  const onChange = (e) =>
    setTravel({ ...travel, [e.target.name]: e.target.value });

  const handlePlacesChange = (usedOrigin) =>
    setTravel({ ...travel, usedOrigin });

  const handleSelect = (usedOrigin) => {
    geocodeByAddress(usedOrigin)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log("Success", latLng))
      .catch((error) => console.error("Error", error));
  };

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
          <input
            type="text"
            id="usedOrigin"
            placeholder="Enter a location"
            onChange={onChange}
          />
          <PlacesAutocomplete
            name="usedOrigin"
            value={usedOrigin}
            onChange={handlePlacesChange}
            onSelect={handleSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              // <div>
              //   <input type="text" placeholder="Enter a location" />
              // </div>

              <div>
                <input
                  {...getInputProps({
                    placeholder: "Search Places ...",
                    className: "location-search-input",
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active
                      ? "suggestion-item--active"
                      : "suggestion-item";
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: "#fafafa", cursor: "pointer" }
                      : { backgroundColor: "#ffffff", cursor: "pointer" };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
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
