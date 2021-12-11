import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import GoogleMapReact from "google-map-react";

const TravelForm = ({ travel, setTravel, onChange, nextStep }) => {
  // const handlePlacesChange = ({travel.usedOrigin}) =>
  //   setTravel({ ...travel, travel.usedOrigin });

  // const handleSelect = ({travel.usedOrigin}) => {
  //   geocodeByAddress(travel.usedOrigin)
  //     .then((results) => getLatLng(results[0]))
  //     .then((latLng) => console.log("Success", latLng))
  //     .catch((error) => console.error("Error", error));
  // };

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
          value={travel.title}
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
          value={travel.description}
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          value={travel.date}
          onChange={onChange}
        />
      </div>

      <div className="card">
        <h2 className="text-left">Travel Used</h2>
        <div className="form-group">
          <label>Travel type</label>
          <select name="usedTravelType" onChange={onChange}>
            <option value="walking">Walking</option>
            <option value="bicycling">Bicycling</option>
            <option value="transit" disabled>
              Transit (coming soon)
            </option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="usedOrigin">Origin</label>
          {/* <input
            type="text"
            id="usedOrigin"
            placeholder="Enter a location"
            onChange={onChange}
          /> */}
          <PlacesAutocomplete
            name="usedOrigin"
            value={travel.usedOrigin}
            onChange={onChange}
            // onSelect={handleSelect}
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
          value="Calculate Impact"
          className="btn btn-primary btn-block"
          // onClick={(e) => {
          //   e.preventDefault();
          //   setStep({ step: step + 1 })
          // }}
        />
      </div>
    </form>
  );
};

export default TravelForm;
