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
      {i.string}
    </button>
  ));
  return(
    <div id="keypad">
      {numbersRender}
      {operationsRender}
      <button id="equals"
        className={"operator"}
        onClick={props.handleClick}>
        =
      </button>
      <button id="clear"
        className={"operator"}
        onClick={props.handleClick}>
        AC
      </button>
      <button id="decimal"
        className={"operator"}
        onClick={props.handleClick}>
        .
      </button>
    </div>
  );
};

export default Keys
