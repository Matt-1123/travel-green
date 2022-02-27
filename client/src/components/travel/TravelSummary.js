import React, { Fragment, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
} from "@react-google-maps/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWalking,
  faBicycle,
  faCar,
  faEllipsisH,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const center = {
  lat: -3.745,
  lng: -38.523,
};

const title = localStorage.getItem("title");
const description = localStorage.getItem("description");
const date = localStorage.getItem("date");
const usedTravelType = localStorage.getItem("usedTravelType");
const usedOrigin = localStorage.getItem("usedOrigin");
const usedDestination = localStorage.getItem("usedDestination");
const avoidedTravelType = localStorage.getItem("avoidedTravelType");
const selectedMake = JSON.parse(localStorage.getItem("selectedMake"));
const selectedModel = JSON.parse(localStorage.getItem("selectedModel"));
const avoidedOrigin = localStorage.getItem("avoidedOrigin");
const avoidedDestination = localStorage.getItem("avoidedDestination");

const TravelSummary = (props) => {
  const { state } = useLocation();

  console.log(`${selectedMake.name} ${selectedModel.displayName}`);

  return (
    <Fragment>
      <h1>Travel Action Summary</h1>
      <div className="container-narrow bg-dark">
        <p>Title: {title}</p>
        <p>Description: {description}</p>
        <p>Date: {date}</p>
      </div>
      <div className="container-narrow bg-dark">
        CO2e prevented: <span className="font-lg text-primary">15 kg</span>
      </div>
      <div className="grid-2">
        <div className="card bg-dark" style={styles.mapCard}>
          <h3 className="px-1">Travel Used</h3>
          <div className="my" style={styles.map}></div>
          {/* <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}> */}
          {/* <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
          > */}
          {/* Child components, such as markers, info windows, etc. */}
          {/* <>
              <DirectionsService
                // required
                options={{
                  destination: this.state.destination,
                  origin: this.state.origin,
                  travelMode: this.state.travelMode,
                }}
                // required
                callback={this.directionsCallback}
                // optional
                onLoad={(directionsService) => {
                  console.log(
                    "DirectionsService onLoad directionsService: ",
                    directionsService
                  );
                }}
                // optional
                onUnmount={(directionsService) => {
                  console.log(
                    "DirectionsService onUnmount directionsService: ",
                    directionsService
                  );
                }}
              />
            </> */}
          {/* </GoogleMap> */}
          {/* </LoadScript> */}
          <div className="grid-2" style={{ gridGap: 0 }}>
            <div style={styles.mapData}>
              <p className="font-lg" style={{ marginBottom: 0 }}>
                8
              </p>
              <p className="font-sm">mi</p>
            </div>
            <div style={styles.mapData}>
              <p className="font-lg" style={{ marginBottom: 0 }}>
                {/* {usedTravelType === "walking" ? (
                  <FontAwesomeIcon icon={faWalking} className="icon-primary" />
                ) : (
                  <FontAwesomeIcon icon={faBicycle} className="icon-primary" />
                )} */}
                <FontAwesomeIcon
                  icon={usedTravelType === "walking" ? faWalking : faBicycle}
                  className="icon-primary"
                />
              </p>
              <p className="font-sm">Travel Type</p>
            </div>
          </div>
        </div>
        <div className="card bg-dark" style={styles.mapCard}>
          <h3 className="px-1">Travel Avoided</h3>
          <div className="my" style={styles.map}></div>
          <div className="grid-2" style={{ gridGap: 0 }}>
            <div style={styles.mapData}>
              <p className="font-lg" style={{ marginBottom: 0 }}>
                8
              </p>
              <p className="font-sm">mi</p>
            </div>
            <div style={styles.mapData}>
              <p className="font-lg" style={{ marginBottom: 0 }}>
                <FontAwesomeIcon
                  icon={avoidedTravelType === "driving" ? faCar : null}
                  className="icon-warning"
                />
              </p>
              <p className="font-sm">Travel Type</p>
            </div>
          </div>
          <div>
            <p className="p-1">
              Vehicle: {selectedMake.name} {selectedModel.displayName}
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const styles = {
  map: {
    height: "200px",
    backgroundColor: "#ccc",
  },
  mapData: {
    textAlign: "center",
  },
  mapCard: {
    borderRadius: "20px",
    padding: "1rem 0",
  },
};

const containerStyle = {
  width: "400px",
  height: "400px",
};

export default TravelSummary;
