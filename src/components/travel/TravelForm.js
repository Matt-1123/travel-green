import React, { useState } from "react";

const TravelForm = () => {
  const [travel, setTravel] = useState({
    step: 1,
    title: "",
    description: "",
    date: null,
    usedTravelType: null,
    usedOrigin: "",
    usedDestination: "",
    avoidedTravelType: null,
    avoidedOrigin: "",
    avoidedDestination: "",
  });

  const {
    step,
    title,
    description,
    date,
    usedTravelType,
    usedOrigin,
    usedDestination,
    avoidedTravelType,
    avoidedOrigin,
    avoidedDestination,
  } = travel;

  // Proceed to next step
  const nextStep = () => setTravel({ ...travel, step: step + 1 });

  // Go back to previous step
  const prevStep = () => setTravel({ ...travel, step: step - 1 });

  const onChange = (e) =>
    setTravel({ ...travel, [e.target.name]: e.target.value });

  // switch (step) {
  //   case 1:
  //     return <TravelDetails />;
  // }

  return (
    <form>
      <h2 className="text-primary">Travel Details</h2>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={title}
        onChange={onChange}
      />
      <input
        type="text"
        name="description"
        placeholder="(Optional) Describe your green travel"
        value={description}
        onChange={onChange}
      />
      <input type="date" name="date" value={date} onChange={onChange} />

      <div>
        <input
          type="submit"
          value="Submit"
          className="btn btn-primary btn-block"
        />
      </div>
    </form>
  );
};

export default TravelForm;
