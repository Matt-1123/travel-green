import React, { useState } from "react";
import TravelForm from "./TravelForm";
import TravelSummary from "./TravelSummary";

const TravelAction = () => {
  const [travel, setTravel] = useState({
    step: 1,
    title: "",
    description: "",
    date: null,
    usedOrigin: "",
    usedDestination: "",
    avoidedOrigin: "",
    avoidedDestination: "",
    impact: null,
  });

  const {
    step,
    title,
    description,
    date,
    usedOrigin,
    usedDestination,
    avoidedOrigin,
    avoidedDestination,
    impact,
  } = travel;

  // Proceed to the Next Step
  const nextStep = () =>
    this.setState({
      ...travel,
      step: step + 1,
    });

  const onChange = (e) =>
    setTravel({ ...travel, [e.target.name]: e.target.value });

  switch (step) {
    case 1:
      return (
        <TravelForm
          travel={travel}
          setTravel={setTravel}
          onChange={onChange}
          nextStep={nextStep}
        />
      );
    case 2:
      return <TravelSummary />;
    default:
      console.log("Error - no condition for this step number");
  }
};

export default TravelAction;
