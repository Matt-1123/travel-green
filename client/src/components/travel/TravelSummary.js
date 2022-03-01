import React, { Fragment, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWalking, faBicycle, faCar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

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
  // const { state } = useLocation();

  // Initialize state for Used & Avoided directions responses
  const [usedDistance, setUsedDistance] = useState(null);
  const [avoidedDistance, setAvoidedDistance] = useState(null);
  const [carbonPrevented, setCarbonPrevented] = useState(null);

  // Get Distances on Page Load
  useEffect(() => {
    const getDistance = async (origin, destination, mode) => {
      try {
        const res = await axios.get(
          `/api/google-maps/distance/${origin}/${destination}/${mode}`
        );

        // Get distance as a decimal.
        // Use parseFloat to convert from 'x mi' to x.
        const distance = parseFloat(res.data.routes[0].legs[0].distance.text);

        return distance;
      } catch (err) {
        console.error(err);
      }
    };

    const usedDistanceSetter = async () => {
      const data = await getDistance(
        usedOrigin,
        usedDestination,
        usedTravelType
      );

      setUsedDistance(data);
    };

    const avoidedDistanceSetter = async () => {
      const data = await getDistance(
        avoidedOrigin,
        avoidedDestination,
        avoidedTravelType
      );

      setAvoidedDistance(data);
    };

    usedDistanceSetter();
    avoidedDistanceSetter();
  }, []);

  // After avoided distance is calculated, calculate CO2 emissions prevented using model id and distance
  useEffect(() => {
    const getCarbon = async (distance, modelId) => {
      try {
        const res = await axios.get(
          `/api/carbon-interface/carbon/${distance}/${modelId}`
        );
        setCarbonPrevented(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (avoidedDistance) {
      getCarbon(avoidedDistance, selectedModel.id);
    }
  }, [avoidedDistance]);

  return (
    <Fragment>
      <h1>Travel Action Summary</h1>
      <div className="container-narrow bg-dark">
        <p>Title: {title}</p>
        <p>Description: {description}</p>
        <p>Date: {date}</p>
      </div>
      <div className="container-narrow bg-dark">
        CO2e prevented:{" "}
        <span className="font-lg text-primary">{carbonPrevented} kg</span>
      </div>
      <div className="grid-2">
        <div className="card bg-dark" style={styles.mapCard}>
          <h3 className="px-1 mb-1">Travel Used</h3>
          <div className="grid-2" style={{ gridGap: 0 }}>
            <div style={styles.mapData}>
              <p className="font-lg" style={{ marginBottom: 0 }}>
                {usedDistance}
              </p>
              <p className="font-sm">mi</p>
            </div>
            <div style={styles.mapData}>
              <p className="font-lg" style={{ marginBottom: 0 }}>
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
          <h3 className="px-1 mb-1">Travel Avoided</h3>
          <div className="grid-2" style={{ gridGap: 0 }}>
            <div style={styles.mapData}>
              <p className="font-lg" style={{ marginBottom: 0 }}>
                {avoidedDistance}
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

export default TravelSummary;
