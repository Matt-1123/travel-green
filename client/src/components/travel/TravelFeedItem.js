import React, { useContext } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWalking, faBicycle } from "@fortawesome/free-solid-svg-icons";
import TravelContext from "../../context/travel/travelContext";

const TravelFeedItem = ({ action }) => {
  const travelContext = useContext(TravelContext);

  const { user, title, description, date, usedTravelType } = action;

  return (
    <div className="card bg-dark">
      <div className="flex mb">
        <img src="" alt="" className="mr-1" style={styles.avatar} />
        <div style={styles.meta}>
          <p className="font-sm">{user.name}</p>
          <p className="font-sm">{date}</p>
        </div>
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
};

export default TravelFeedItem;
