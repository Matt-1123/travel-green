import React, { Fragment } from "react";

const TravelAction = () => {
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

export default TravelAction;
