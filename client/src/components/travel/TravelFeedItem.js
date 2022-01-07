import React, { useContext } from "react";
import PropTypes from "prop-types";
import TravelContext from "../../context/travel/travelContext";

const TravelFeedItem = ({ action }) => {
  const travelContext = useContext(TravelContext);

  const { user, title, description, date } = action;

  return (
    <div className="card bg-dark">
      <div className="flex mb">
        <img src="" alt="" class="mr-1" style={styles.avatar} />
        <div style={styles.meta}>
          <p class="small">{user.name}</p>
          <p class="small">{date}</p>
        </div>
      </div>
      <h3 className="text-primary text-left">{title}</h3>
      <ul className="list">
        {description && (
          <li>
            <p>{description}</p>
          </li>
        )}
        <li>
          <p>{date}</p>
        </li>
      </ul>
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
};

export default TravelFeedItem;
