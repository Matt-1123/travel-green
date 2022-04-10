import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dateConverter from "../../utils/dateConverter";
import {
  faWalking,
  faBicycle,
  faEllipsisH,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const TravelFeedItem = ({ action }) => {
  const navigate = useNavigate();

  const [options, setOptions] = useState(false);

  const {
    _id,
    username,
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
    setOptions(!options);
  };

  // Navigate to TravelAction component on title click
  const handleTitleLink = (e) => {
    e.preventDefault();

    navigate(`/travel-action/${_id}`, {
      state: { id: _id },
    });
  };

  return (
    <div className="card bg-dark feed-item">
      <div
        className="grid mb"
        style={{
          gridTemplateColumns: options ? "42px 1fr auto auto" : "42px 1fr auto",
        }}
      >
        <img src="" alt="" style={styles.avatar} />
        <div style={styles.meta}>
          <p className="font-sm">{username}</p>
          <p className="font-sm">{dateConverter(date)}</p>
        </div>
        <div
          style={{
            display: options ? "inline-block" : "none",
          }}
        >
          <button style={{ marginRight: "10px" }}>
            <FontAwesomeIcon icon={faEdit} style={{ color: "#999" }} />
          </button>
          <Link to="/" style={{ marginRight: "10px" }}>
            <FontAwesomeIcon icon={faTrash} style={{ color: "#dc3545" }} />
          </Link>
        </div>
        <button style={{ height: "1rem" }} onClick={handleOptions}>
          <FontAwesomeIcon
            icon={faEllipsisH}
            style={{ color: "#555", justifySelf: "end" }}
          />
        </button>
      </div>
      <div
        className="flex"
        style={{ alignItems: "center", marginBottom: ".25em" }}
      >
        {(() => {
          switch (usedTravelType) {
            case "Walking":
              return (
                <FontAwesomeIcon icon={faWalking} className="icon-primary" />
              );
            case "Bicycling":
              return (
                <FontAwesomeIcon icon={faBicycle} className="icon-primary" />
              );
            default:
              return null;
          }
        })()}

        <h3
          onClick={handleTitleLink}
          className="font-md ml-1 title"
          style={{ cursor: "pointer" }}
        >
          {title}
        </h3>
      </div>
      {description && (
        <p className="font-sm" style={{ marginBottom: ".5em" }}>
          {description}
        </p>
      )}
      <div style={styles.stats}>
        <div className="text-primary mr">
          <p className="font-sm">
            CO<sub>2</sub>e Prevented:
          </p>
          <p className="font-lg" style={{ lineHeight: "1", marginBottom: "0" }}>
            {carbonPrevented} kg
          </p>
        </div>
        <div className="mr">
          <p className="font-sm">Travel Used</p>
          <p className="font-md">
            {`${usedDistance} mi, `}
            {`${usedTravelType[0].toUpperCase()}${usedTravelType.slice(1)}`}
          </p>
        </div>
        <div className="mr">
          <p className="font-sm">Travel Avoided</p>
          <p className="font-md">
            {`${avoidedDistance} mi, `}
            {`${avoidedTravelType[0].toUpperCase()}${avoidedTravelType.slice(
              1
            )}`}
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
    gap: "1rem",
  },
};

export default TravelFeedItem;
