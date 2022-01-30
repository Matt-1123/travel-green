import React, { Fragment, useContext } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWalking,
  faBicycle,
  faCar,
  faEllipsisH,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import TravelContext from "../../context/travel/travelContext";

const TravelSummary = () => {
  const travelContext = useContext(TravelContext);

  return (
    <Fragment>
      <div className="container-narrow bg-dark">
        CO2e prevented: <span className="font-lg text-primary">15 kg</span>
      </div>
      <div className="grid-2">
        <div className="card bg-dark" style={styles.mapCard}>
          <h3 className="px-1">Travel Used</h3>
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
