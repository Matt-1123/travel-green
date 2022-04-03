import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWalking,
  faBicycle,
  faCar,
  faEllipsisH,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import dateConverter from "../../utils/dateConverter";
import TravelContext from "../../context/travel/travelContext";

const TravelAction = () => {
  const { state } = useLocation();
  const { id } = state;

  // Initialize loading state
  const [loading, setLoading] = useState(true);

  const travelContext = useContext(TravelContext);
  const { travelAction, getTravelAction } = travelContext;

  useEffect(() => {
    const getData = async (id) => {
      try {
        await getTravelAction(id);
      } catch (err) {
        console.error(err);
      }
    };

    getData(id);
    setLoading(false);
    // eslint-disable-next-line
  }, []);

  const handleDelete = () => {
    console.log("delete");
  };
  const handleSave = () => {
    console.log("Save");
  };

  if (loading) return <Spinner />;

  return (
    <Fragment>
      <div className="container-narrow">
        <div
          className="grid mb"
          style={{
            gridTemplateColumns: "42px 1fr",
          }}
        >
          <img src="" alt="" style={styles.avatar} />
          <div style={styles.meta}>
            <p className="font-sm">{travelAction.username}</p>
            <p className="font-sm">{dateConverter(travelAction.date)}</p>
          </div>
        </div>

        <h1>Travel Action Summary</h1>
        <div className="container-narrow bg-dark">
          <p>Title: {travelAction.title}</p>
          {travelAction.description && (
            <p>Description: {travelAction.description}</p>
          )}
          <p>Date: {travelAction.date}</p>
        </div>
        <div className="container-narrow bg-dark">
          CO2e prevented:{" "}
          <span className="font-lg text-primary">
            {travelAction.carbonPrevented} kg
          </span>
        </div>
        <div className="grid-2">
          <div className="card bg-dark" style={styles.mapCard}>
            <h3 className="px-1 mb-1">Travel Used</h3>
            <div className="grid-2" style={{ gridGap: 0 }}>
              <div style={styles.mapData}>
                <p className="font-lg" style={{ marginBottom: 0 }}>
                  {travelAction.usedDistance}
                </p>
                <p className="font-sm">mi</p>
              </div>
              <div style={styles.mapData}>
                <p className="font-lg" style={{ marginBottom: 0 }}>
                  <FontAwesomeIcon
                    icon={
                      travelAction.usedTravelType === "walking"
                        ? faWalking
                        : faBicycle
                    }
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
                  {travelAction.avoidedDistance}
                </p>
                <p className="font-sm">mi</p>
              </div>
              <div style={styles.mapData}>
                <p className="font-lg" style={{ marginBottom: 0 }}>
                  <FontAwesomeIcon
                    icon={
                      travelAction.avoidedTravelType === "driving"
                        ? faCar
                        : null
                    }
                    className="icon-warning"
                  />
                </p>
                <p className="font-sm">Travel Type</p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid-2 my-2">
          <button className="btn btn-light" onClick={handleDelete}>
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
  avatar: {
    height: "42px",
    width: "42px",
    border: "1px solid #fff",
    borderRadius: "50%",
  },
  meta: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
};

export default TravelAction;
