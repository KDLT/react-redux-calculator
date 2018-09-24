import React, { Component } from "react";

const Display = (props) => {
  // console.log("display props: ", props)
  return(
    <div id="display">
      <div id="problem">{props.display.problem}</div>
      <div id="ans">{props.display.ans}</div>
    </div>
  );
};

export default Display
