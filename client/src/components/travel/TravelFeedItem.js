import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWalking,
  faBicycle,
  faEllipsisH,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import TravelContext from "../../context/travel/travelContext";

const TravelFeedItem = ({ action }) => {
  const travelContext = useContext(TravelContext);
  const [options, setOptions] = useState(false);

  const {
    user,
    title,
    description,
    date,
    carbonPrevented,
    usedTravelType,
    usedDistance,
    avoidedTravelType,
    avoidedDistance,
  } = action;

  const handleOptions = () => {
    console.log("options clicked");
    setOptions(!options);
  };

  return (
    <div className="card bg-dark" style={{ position: "relative" }}>
      <div
        style={{
          display: options ? "block" : "none",
          position: "absolute",
          top: "1rem",
          right: "3rem",
        }}
      >
        <button style={{ marginRight: "10px" }}>
          <FontAwesomeIcon icon={faEdit} style={{ color: "#999" }} />
        </button>
        <Link to="/" style={{ marginRight: "10px" }}>
          <FontAwesomeIcon icon={faTrash} style={{ color: "#dc3545" }} />
        </Link>
      </div>
      <div className="grid mb" style={styles.topWrapper}>
        <img src="" alt="" style={styles.avatar} />
        <div style={styles.meta}>
          <p className="font-sm">{user.name}</p>
          <p className="font-sm">{date}</p>
        </div>
        <button style={{ height: "1rem" }} onClick={handleOptions}>
          <FontAwesomeIcon
            icon={faEllipsisH}
            style={{ color: "#555", justifySelf: "end" }}
          />
        </button>
      </div>
      <div className="flex" style={{ alignItems: "center" }}>
        {/* <img src="" alt="" className="mr-1" style={styles.icon} /> */}
        {usedTravelType === "walking" ? (
          <FontAwesomeIcon icon={faWalking} className="icon-primary" />
        ) : (
          <FontAwesomeIcon icon={faBicycle} className="icon-primary" />
        )}
        <h3 className="font-md ml-1"> {title}</h3>
      </div>
      <div style={styles.stats}>
        <div className="text-primary">
          <p className="font-sm">CO2e Prevented:</p>
          <p className="font-lg" style={{ lineHeight: "1" }}>
            {carbonPrevented} kg
          </p>
        </div>
        <div>
          <p className="font-sm">Travel Used</p>
          <p className="font-md">
            {`${usedDistance} mi, `}
            {`${usedTravelType[0].toUpperCase()}${usedTravelType.slice(1)}`}
          </p>
        </div>
      </div>
    </div>
  );
};

TravelFeedItem.propTypes = {
  action: PropTypes.object.isRequired,
};

const styles = {
  topWrapper: {
    gridTemplateColumns: "42px 1fr auto",
  },
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
  icon: {
    height: "1rem",
    width: "1rem",
    border: "1px solid #fff",
  },
  stats: {
    display: "inline-flex",
    flexWrap: "wrap",
    gap: "2rem",
  },
};

export default TravelFeedItem;
