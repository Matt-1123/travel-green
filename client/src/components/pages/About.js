import React from "react";

const About = () => {
  return (
    <div>
      <h1>About</h1>
      <hr />
      <p className="my-1">
        Project Earth Health is a platform where you can calculate and log
        environmentally-friendly actions. Currently you can log a Travel Action,
        which calculates the amount of CO2 emissions you prevent by walking or
        bicycling instead of using a vehicle.
      </p>
      <h2>Future Updates/Additions</h2>
      <hr />
      <ul>
        <li class="ml-1 my" style={{ listStyleType: "circle" }}>
          Transit will be added soon as a Travel Action option.
        </li>
        <li class="ml-1 my" style={{ listStyleType: "circle" }}>
          New action types will be added after Travel Action is complete. The
          next Action Type will be a Diet Action, in which users will be able to
          calculate the impacts of changes in their diet, such as decreasing
          their weekly beef consumption.
        </li>
      </ul>
    </div>
  );
};

export default About;
