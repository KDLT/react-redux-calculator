import React, { Component } from "react";

const Keys = (props) => {
  let numbersRender = props.buttons.numbers_string.map((num, key) => (
    <button id={props.buttons.numbers_id[num]}
      onClick={props.handleClick}
      key={key}
      data-payload={num}
      className={"number"}>
      {num}
    </button>
  ));

  let operationsRender = props.buttons.symbols.map((text, key) => (
    <button id={props.buttons.operators[key]}
      onClick={props.handleClick}
      key={key}
      data-payload={text}
      className={"operator"}>
      {text}
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
