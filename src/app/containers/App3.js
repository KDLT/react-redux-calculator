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
    this.handleNumberInput = this.handleNumberInput.bind(this);
    this.handleOperatorInput = this.handleOperatorInput.bind(this);
    this.handleEqualsInput = this.handleEqualsInput.bind(this);
    this.handleDecimalInput = this.handleDecimalInput.bind(this);
    this.handleClearAllInput = this.handleClearAllInput.bind(this);
  };

  handleClick(e) {
    let numberID = this.props.inputs.numbers_id;
    let buttonID = e.target.id;
    let buttonPayload = e.target.innerHTML;
    let buttonElement = document.getElementById(buttonID);
    // console.log("button ID: ", buttonID);
    if (numberID.includes(buttonID)) {
      // console.log("a number was clicked");
      this.handleNumberInput(buttonPayload);
    }
    else if (this.props.inputs.operators.includes(buttonID)) {
      // console.log("an operator was clicked");
      this.handleOperatorInput(buttonPayload);
    }
    else if (buttonID == "decimal") {
      // console.log("decimal point was clicked");
      this.handleDecimalInput();
    }
    else if (buttonID == "equals") {
      // console.log("equal sign was clicked");
      this.handleEqualsInput();
    }
    else if (buttonID == "clear") {
      // console.log("AC was clicked");
      this.handleClearAllInput();
    }
    buttonElement.blur();
  };

  handleKeyDown(e) { // keydown for everything else
    let keyString = e.key;
    // console.log("keyString on keydown: ", keyString)
    if (this.props.inputs.numbers_string.includes(keyString)) {
      // console.log("a number key was pressed");
      this.handleNumberInput(keyString);
    }
    else if (this.props.inputs.symbols.includes(keyString)) {
      // console.log("an operator key was pressed");
      this.handleOperatorInput(keyString);
    }
    else if (keyString == ".") {
      // console.log(". key was pressed");
      this.handleDecimalInput();
    }
    else if (keyString == "Enter") {
      // console.log("Enter key was pressed");
      this.handleEqualsInput();
    }
    else if (keyString == "Escape") {
      // console.log("Escape key was pressed");
      this.handleClearAllInput();
    }
    else if (keyString == "Backspace") {
      this.handleDelInput();
    }
  }

  handleNumberInput(numberInput) { // argument is the number string
    this.props.keyAction.concatNumberDisplay(numberInput);
  };

  handleOperatorInput(operatorInput) {
    this.props.keyAction.concatOperatorDisplay(operatorInput);
  }

  handleDecimalInput() {
    this.props.keyAction.concatDecimalDisplay(".");
  }

  handleEqualsInput() {
    this.props.keyAction.concatEqualDisplay();
  }

  handleClearAllInput() {
    this.props.keyAction.clearAllAction();
  };

  handleDelInput() {
    this.props.keyAction.delKeyAction();
  }

  componentDidMount() {
    console.log("component mounted!");
    console.log("entire props: ", this.props);
    document.addEventListener("keydown", this.handleKeyDown);
  };

  componentDidUpdate() {
    // console.log("App props: ",this.props);
    console.log("logic props: ",this.props.keys.logic);
    // console.log("display props: ",this.props.keys.display);
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
