import React, { Component } from "react";
// import { render } from "react-dom"

import Keys from "../components/Keys";
import Display from "../components/Display";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
  };

  handleClick(e) {
    let numberID = this.props.inputs.numbers_id;
    let buttonID = e.target.id;
    let buttonPayload = e.target.innerHTML;
    let buttonElement = document.getElementById(buttonID);
    // console.log("button ID: ", buttonID);
    if (numberID.includes(buttonID)) {
      // console.log("a number was clicked");
      this.props.keyAction.concatNumberDisplay(buttonPayload);
    }
    else if (this.props.inputs.operators.includes(buttonID)) {
      // console.log("an operator was clicked");
      this.props.keyAction.concatOperatorDisplay(buttonPayload);
    }
    else if (buttonID == "decimal") {
      // console.log("decimal point was clicked");
      this.props.keyAction.concatDecimalDisplay();
    }
    else if (buttonID == "equals") {
      // console.log("equal sign was clicked");
      this.props.keyAction.concatEqualDisplay();
    }
    else if (buttonID == "clear") {
      // console.log("AC was clicked");
      this.props.keyAction.clearAllAction();
    }
    buttonElement.blur();
  };

  handleKeyDown(e) { // keydown for everything else
    let keydownPayload = e.key;
    // console.log("keydownPayload on keydown: ", keydownPayload)
    if (this.props.inputs.numbers_string.includes(keydownPayload)) {
      // console.log("a number key was pressed");
      this.props.keyAction.concatNumberDisplay(keydownPayload);
    }
    else if (this.props.inputs.symbols.includes(keydownPayload)) {
      // console.log("an operator key was pressed");
      this.props.keyAction.concatOperatorDisplay(keydownPayload);
    }
    else if (keydownPayload == ".") {
      // console.log(". key was pressed");
      this.props.keyAction.concatDecimalDisplay();
    }
    else if (keydownPayload == "Enter") {
      // console.log("Enter key was pressed");
      this.props.keyAction.concatEqualDisplay();
    }
    else if (keydownPayload == "Escape") {
      // console.log("Escape key was pressed");
      this.props.keyAction.clearAllAction();
    }
    else if (keydownPayload == "Backspace") {
      this.props.keyAction.delKeyAction();
    }
  }
  componentDidMount() {
    console.log("component mounted!");
    console.log("entire props: ", this.props);
    document.addEventListener("keydown", this.handleKeyDown);
  };

  componentDidUpdate() {
    // console.log("App props: ",this.props);
    // console.log("logic props: ",this.props.keys.logic);
    // console.log("display props: ",this.props.keys.display);
    // console.log("keys props: ", this.props.keys);
  };

  render() {
    return(
      <div id="main-container">
        <div id="calculator">
          <Display display={this.props.keys.display}/>
          <Keys buttons={this.props.inputs}
            display={this.props.keys.display}
            handleClick={this.handleClick}/>
        </div>
      </div>
    );
  };
};

export default App;
