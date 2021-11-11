import React from "react";

const About = () => {
  return (
    <div>
      <h1>About</h1>
      <p className="my-1">
        Travel Green Carbon Calculator is a web app that can be used to
        determine how many kilograms of carbon dioxide emissions you prevent by
        choosing greener travel options, such as walking or bicycling. Input
        your origin and destination for travel used and travel avoided, and the
        Google Maps API will calculate the distances. If your avoided travel
        mode is a vehicle, enter your vehicle's make and model, and the Carbon
        Interface API will calculate your prevented CO2 emissions based on the
        vehicle and distance.
      </p>
    </div>
  );
};

export default About;
