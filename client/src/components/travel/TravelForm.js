import React, { useState, useEffect } from "react";
import axios from "axios";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import ComboBox from "react-responsive-combo-box";
import "react-responsive-combo-box/dist/index.css";

const TravelForm = () => {
  const [travel, setTravel] = useState({
    title: "",
    description: "",
    date: "",
    usedTravelType: "walking",
    usedOrigin: "",
    usedDestination: "",
    avoidedTravelType: "",
    avoidedOrigin: "",
    avoidedDestination: "",
  });

  const [vehicleMakes, setVehicleMakes] = useState([]);
  const [selectedMake, setSelectedMake] = useState({});

  // Store all the vehicle makes in state only when the avoided travel type is 'vehicle' and if vehicleMakes is an empty array. This will limit the API call for vehicle makes to one per session, and only if 'vehicle' is manually selected.
  useEffect(() => {
    const getVehicleMakes = async () => {
      try {
        const res = await axios.get("/api/carbon-interface/makes");
        let arr = [];
        res.data.forEach((make) => {
          arr.push({
            name: make.data.attributes.name,
            id: make.data.id,
          });
        });
        setVehicleMakes(arr);
      } catch (err) {
        console.error(err);
      }
    };

    if (vehicleMakes.length === 0 && travel.avoidedTravelType === "vehicle") {
      getVehicleMakes();
    }
  }, [travel]);

  useEffect(() => {
    // create array of options to add to vehicle makes dropdown
    let makeOptions = [];
    vehicleMakes.map((make) => {
      return makeOptions.push(
        <option key={make.id} value={make.id}>
          {make.name}
        </option>
      );
    });
  }, [vehicleMakes]);

  // When selectedMake is updated, get models data from GET /carbon-interface.
  // Then populate vehicle models dropdown
  useEffect(() => {
    console.log(`selected make id: ${selectedMake.id}`);

    const getVehicleModels = async (makeid) => {
      try {
        const res = await axios.get(`/api/carbon-interface/models/${makeid}`);
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    getVehicleModels(selectedMake.id);
  }, [selectedMake]);

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

  // On vehicle make change, set selectedMake to make object from Carbon Interface
  const handleSelectedMake = (makeName) => {
    const selectedMake = vehicleMakes.find((make) => make.name === makeName);
    setSelectedMake(selectedMake);
  };

  return (
    <form className="form-container bg-dark">
      <h2 className="text-primary font-lg">Travel Action</h2>
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
          <label htmlFor="avoidedTravelType">Travel type</label>
          <select name="avoidedTravelType" onChange={onChange}>
            <option value="">Select a travel type</option>
            <option value="vehicle">Vehicle</option>
            <option value="transit" disabled>
              Transit (coming soon)
            </option>
          </select>
        </div>

        <div className="grid-2">
          {/* Vehicle Makes Dropdown */}
          <div
            style={{
              display:
                travel.avoidedTravelType === "vehicle" ? "block" : "none",
            }}
            className="form-group"
          >
            <label htmlFor="vehicleMake">Vehicle Make</label>
            {/* <select name="vehicleMake">
              <option value="">Select a vehicle make</option>
              {vehicleMakes.map((make) => (
                <option key={make.id} value={make.id}>
                  {make.name}
                </option>
              ))}
            </select> */}
            <ComboBox
              options={vehicleMakes.map((make) => make.name)}
              enableAutocomplete
              onChange={(option) => handleSelectedMake(option)}
              onSelect={(option) => handleSelectedMake(option)}
            />
          </div>

          {/* Vehicle Models Dropdown */}
          <div
            style={{
              display: !selectedMake ? "none" : "block",
            }}
            className="form-group"
          >
            <label htmlFor="vehicleModel">Vehicle Model</label>
            <ComboBox
              options={[1, 2, 3]}
              enableAutocomplete
              onSelect={(option) => console.log("model selected")}
            />
          </div>
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
                <input
                  name="avoidedOrigin"
                  {...getInputProps({ placeholder: "Type address" })}
                />

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
            className="m"
            type="checkbox"
            name="same-origin"
            id="same-origin"
            onChange={sameOrigin}
          ></input>
          <label className="m" htmlFor="same-origin">
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
            className="m"
            type="checkbox"
            name="same-destination"
            id="same-destination"
            onChange={sameDestination}
          ></input>
          <label className="m" htmlFor="same-destination">
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
