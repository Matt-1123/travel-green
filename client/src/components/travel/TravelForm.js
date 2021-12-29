import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const TravelForm = () => {
  const [travel, setTravel] = useState({
    title: "",
    description: "",
    date: null,
    usedTravelType: "walking",
    usedOrigin: "",
    usedDestination: "",
    avoidedTravelType: "vehicle",
    avoidedOrigin: "",
    avoidedDestination: "",
    impact: null,
  });

  const onChange = (e) =>
    setTravel({ ...travel, [e.target.name]: e.target.value });

  // Places Autocomplete: Used Origin
  const handleUsedOriginSelect = async (value) =>
    setTravel({ ...travel, usedOrigin: value });
  const handleUsedOriginChange = (value) =>
    setTravel({ ...travel, usedOrigin: value });

  // Places Autocomplete: Used Destination
  const handleUsedDestinationSelect = async (value) =>
    setTravel({ ...travel, usedDestination: value });
  const handleUsedDestinationChange = (value) =>
    setTravel({ ...travel, usedDestination: value });

  // Places Autocomplete: Avoided Origin
  const handleAvoidedOriginSelect = async (value) =>
    setTravel({ ...travel, avoidedOrigin: value });
  const handleAvoidedOriginChange = (value) =>
    setTravel({ ...travel, avoidedOrigin: value });

  // Places Autocomplete: Avoided Destination
  const handleAvoidedDestinationSelect = async (value) =>
    setTravel({ ...travel, avoidedDestination: value });
  const handleAvoidedDestinationChange = (value) =>
    setTravel({ ...travel, avoidedDestination: value });

  // Auto fill avoided origin when checked
  const sameOrigin = () => {
    if (document.getElementById("same-origin").checked) {
      setTravel({
        ...travel,
        avoidedOrigin: travel.usedOrigin,
      });
    }
  };

  // Auto fill avoided destination when checked
  const sameDestination = () => {
    if (document.getElementById("same-destination").checked) {
      setTravel({
        ...travel,
        avoidedDestination: travel.usedDestination,
      });
    }
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

      {/* TRAVEL USED */}
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
          <PlacesAutocomplete
            value={travel.usedOrigin}
            onChange={handleUsedOriginChange}
            onSelect={handleUsedOriginSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <input {...getInputProps({ placeholder: "Type address" })} />

                <div>
                  {loading ? <div>Loading...</div> : null}

                  {suggestions.map((suggestion) => {
                    const style = {
                      backgroundColor: suggestion.active ? "#003699" : "#fff",
                      color: suggestion.active ? "#fff" : "#000",
                    };

                    return (
                      <div {...getSuggestionItemProps(suggestion, { style })}>
                        {suggestion.description}
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
          <PlacesAutocomplete
            value={travel.usedDestination}
            onChange={handleUsedDestinationChange}
            onSelect={handleUsedDestinationSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <input {...getInputProps({ placeholder: "Type address" })} />

                <div>
                  {loading ? <div>Loading...</div> : null}

                  {suggestions.map((suggestion) => {
                    const style = {
                      backgroundColor: suggestion.active ? "#003699" : "#fff",
                      color: suggestion.active ? "#fff" : "#000",
                    };

                    return (
                      <div {...getSuggestionItemProps(suggestion, { style })}>
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </div>
      </div>

      {/* TRAVEL AVOIDED */}
      <div className="card">
        <h2 className="text-left">Travel Avoided</h2>
        <div className="form-group">
          <label>Travel type</label>
          <select name="usedTravelType" onChange={onChange}>
            <option value="vehicle">Vehicle</option>
            <option value="transit" disabled>
              Transit (coming soon)
            </option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="avoidedOrigin">Origin</label>
          <PlacesAutocomplete
            value={travel.avoidedOrigin}
            onChange={handleAvoidedOriginChange}
            onSelect={handleAvoidedOriginSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <input {...getInputProps({ placeholder: "Type address" })} />

                <div>
                  {loading ? <div>Loading...</div> : null}

                  {suggestions.map((suggestion) => {
                    const style = {
                      backgroundColor: suggestion.active ? "#003699" : "#fff",
                      color: suggestion.active ? "#fff" : "#000",
                    };

                    return (
                      <div {...getSuggestionItemProps(suggestion, { style })}>
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
          <input
            class="m"
            type="checkbox"
            name="same-origin"
            id="same-origin"
            onChange={sameOrigin}
          ></input>
          <label class="m" for="same-origin">
            Same origin as travel used
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="avoidedDestination">Destination</label>
          <PlacesAutocomplete
            value={travel.avoidedDestination}
            onChange={handleAvoidedDestinationChange}
            onSelect={handleAvoidedDestinationSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <input {...getInputProps({ placeholder: "Type address" })} />

                <div>
                  {loading ? <div>Loading...</div> : null}

                  {suggestions.map((suggestion) => {
                    const style = {
                      backgroundColor: suggestion.active ? "#003699" : "#fff",
                      color: suggestion.active ? "#fff" : "#000",
                    };

                    return (
                      <div {...getSuggestionItemProps(suggestion, { style })}>
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
          <input
            class="m"
            type="checkbox"
            name="same-destination"
            id="same-destination"
            onChange={sameDestination}
          ></input>
          <label class="m" for="same-destination">
            Same destination as travel used
          </label>
        </div>
      </div>

      <div>
        <input
          type="submit"
          value="Calculate Impact"
          className="btn btn-primary btn-block"
        />
      </div>
    </form>
  );
};

export default TravelForm;
