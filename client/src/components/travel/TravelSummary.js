import React, { Fragment, useState } from "react";
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

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const TravelSummary = (props) => {
  const { state } = useLocation();
  console.log(state);

  const [formData, setFormData] = useState({
    title: "Morning Walk",
    description: "Waked instead of taking the car this morning to work.",
    date: "January 1, 2022 at 8:00am",
    usedTravelType: "walking",
  });

  return (
    <Fragment>
      <h1>{state.title}</h1>
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
                <FontAwesomeIcon icon={faWalking} className="icon-primary" />
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
                {/* {usedTravelType === "driving" ? (
                  <FontAwesomeIcon icon={faWalking} className="icon-primary" />
                ) : null} */}
                <FontAwesomeIcon icon={faWalking} className="icon-primary" />
              </p>
              <p className="font-sm">Travel Type</p>
            </div>
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

export default TravelSummary;
