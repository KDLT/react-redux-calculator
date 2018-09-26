import React, { Component } from "react";

const Keys = (props) => {
  let numbersRender = props.buttons.numbers.map((i, key) => (
    <button id={i.id}
      onClick={props.handleClick}
      key={key}
      data-payload={i.string}
      className={"number"}>
      {i.string}
    </button>
  ));

  let operationsRender = props.buttons.operators.map((i, key) => (
    <button id={i.id}
      onClick={props.handleClick}
      key={key}
      data-payload={i.string}
      className={"operator"}>
      {i.html}
    </button>
  ));

  let functionsRender = props.buttons.functions.map((i, key) => (
    <button id={i.id}
      onClick={props.handleClick}
      key={key}
      data-payload={i.string}
      className={"functions"}>
      {i.string}
    </button>
  ));
  return(
    <div id="keypad">
      {numbersRender}
      {operationsRender}
      {functionsRender}
    </div>
  );
};

export default Keys
