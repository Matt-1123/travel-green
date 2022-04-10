import React, { Fragment, useContext, useState, useEffect } from "react";
import Spinner from "../layout/Spinner";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWalking, faBicycle, faCar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import TravelContext from "../../context/travel/travelContext";
import AlertContext from "../../context/alert/alertContext";

const TravelSummary = (props) => {
  const title = localStorage.getItem("title");
  const description = localStorage.getItem("description");
  const date = localStorage.getItem("date");
  const usedTravelType = localStorage.getItem("usedTravelType");

  const navigate = useNavigate();

  const travelContext = useContext(TravelContext);
  const { addTravel } = travelContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const { state } = useLocation();
  const { avoidedTravelType, selectedMake, selectedModel } = state;

  // Initialize loading state
  const [loading, setLoading] = useState(false);

  // Initialize state for Used & Avoided directions responses
  const [usedDistance, setUsedDistance] = useState(null);
  const [avoidedDistance, setAvoidedDistance] = useState(null);
  const [carbonPrevented, setCarbonPrevented] = useState(null);

  // Get Distances on Page Load
  useEffect(() => {
    const usedTravelType = localStorage.getItem("usedTravelType");
    const usedOrigin = localStorage.getItem("usedOrigin");
    const usedDestination = localStorage.getItem("usedDestination");
    const avoidedOrigin = localStorage.getItem("avoidedOrigin");
    const avoidedDestination = localStorage.getItem("avoidedDestination");

    // If missing info, redirect to home route with a danger alert.
    if (
      !usedOrigin ||
      !usedDestination ||
      !avoidedOrigin ||
      !avoidedDestination ||
      !usedTravelType ||
      !avoidedTravelType
    ) {
      setAlert(
        "Please fill out all fields of the Travel Action form.",
        "danger"
      );

      setTimeout(() => {
        setLoading(false);
        navigate(-1);
      }, 3000);
    }

    setLoading(true);

    const getDistance = async (origin, destination, mode) => {
      try {
        const res = await axios.get(
          `/api/google-maps/distance/${origin}/${destination}/${mode}`
        );

        // Get distance as a decimal.
        // Use parseFloat to convert from 'x mi' to x.
        console.log(res.data);
        const distance = parseFloat(res.data.routes[0].legs[0].distance.text);
        console.log(distance);
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

    // On unmount, reset state
    return () => {
      setUsedDistance(null);
      setAvoidedDistance(null);
      setCarbonPrevented(null);
    };
    // eslint-disable-next-line
  }, []);

  // After avoided distance is calculated, calculate CO2 emissions prevented using model id and distance
  useEffect(() => {
    const getCarbon = async (distance, modelId) => {
      try {
        const res = await axios.get(
          `/api/carbon-interface/carbon/${distance}/${modelId}`
        );
        setCarbonPrevented(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    if (avoidedDistance) {
      getCarbon(avoidedDistance, selectedModel.id);
    }
    // eslint-disable-next-line
  }, [avoidedDistance]);

  // Set loading to false when CO2 calculation is done
  useEffect(() => {
    if (carbonPrevented) {
      setLoading(false);
    }
  }, [carbonPrevented]);

  // Clear local storage of travel action items
  const clearLocalStorage = () => {
    localStorage.setItem("title", "");
    localStorage.setItem("description", "");
    localStorage.setItem("date", "");
    localStorage.setItem("usedTravelType", "");
    localStorage.setItem("usedOrigin", "");
    localStorage.setItem("usedDestination", "");
    localStorage.setItem("avoidedOrigin", "");
    localStorage.setItem("avoidedDestination", "");
  };

  // Cancel Action (clear local storage and redirect home)
  const handleCancel = () => {
    // Clear local storage of travel action items
    clearLocalStorage();

    // Redirect to home page
    navigate("/");
  };

  // Save action to db
  const handleSave = () => {
    const travelAction = {
      carbonPrevented,
      title,
      description,
      date,
      usedTravelType,
      usedDistance,
      avoidedTravelType,
      avoidedDistance,
    };

    // Save to database
    addTravel(travelAction);

    // Clear local storage of travel action items
    clearLocalStorage();

    // Redirect to home page
    navigate("/");
  };

  if (loading) return <Spinner />;

  return (
    <Fragment>
      <div className="container-narrow">
        <h1>Travel Action Summary</h1>
        <div className="container-narrow bg-dark">
          <p>Title: {title}</p>
          {description && <p>Description: {description}</p>}
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
        <div className="grid-3 my-2">
          <button onClick={() => navigate(-1)} className="btn btn-light">
            Edit
          </button>
          <button className="btn btn-light" onClick={handleCancel}>
            Cancel
          </button>
          <button className="btn btn-primary--dark" onClick={handleSave}>
            Save
          </button>
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
