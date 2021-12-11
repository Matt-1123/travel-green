import React, { useContext } from "react";
import PropTypes from "prop-types";
import TravelContext from "../../context/travel/travelContext";

const TravelFeedItem = ({ action }) => {
  const travelContext = useContext(TravelContext);

  const { title, description, date } = action;

  return (
    <div className="card bg-light">
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

export default TravelFeedItem;
