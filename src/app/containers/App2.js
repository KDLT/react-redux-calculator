import React, { Component } from "react";
// import { render } from "react-dom"

import Keys from "../components/Keys";
import Display from "../components/Display";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleNumberInput = this.handleNumberInput.bind(this);
    this.handleOperatorInput = this.handleOperatorInput.bind(this);
    this.handleEqualsInput = this.handleEqualsInput.bind(this);
    this.handleDecimalInput = this.handleDecimalInput.bind(this);
    this.handleClearAllInput = this.handleClearAllInput.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  };
  handleNumberInput(e, payload) { // undefined ang payload kapag click lang
    let ansStr = this.props.math.display.ans;
    let problem = this.props.math.display.problem;
    let numberPayload = payload; // payload kapag keyboard event
    if (!numberPayload) { // ito ang payload kapag click ang event
      numberPayload = e.target.dataset.payload;
      document.getElementById(e.target.id).blur(); // tanggal agad focus after iclick
    };
    if (this.props.logic.currentNumber.length == 1) {
      if (this.props.logic.recentInput == "0") {
        this.props.mathAction.cancelLastAction();
        this.props.logicAction.popCurrentNumber();
      }
    };
    if (numberPayload == "0" && ansStr == "0") {
      console.log("may leading zero na, no zero added")
    }
    else {
      if (ansStr == "0") {
        this.props.mathAction.clearAnsAction();
      };
      if (this.props.logic.isSolved) {
        this.props.logicAction.resetCurrentNumber();
        this.props.mathAction.clearAllAction();
        this.props.mathAction.clearAnsAction();
        this.props.logicAction.markUnsolved();
      };
      this.props.mathAction.keyAction(numberPayload);
      this.props.logicAction.listCurrentNumber(numberPayload);
      this.props.logicAction.recordRecentInput(numberPayload);
    }
  };

  handleDecimalInput(e) {
    let ansStr = this.props.math.display.ans;
    let recent = this.props.logic.recentInput;
    let symbolIsRecent = this.props.math.buttons.symbols.includes(recent);
    if (e.target.id) { // kung kinclick, hindi undefined ang e.target.id
      document.getElementById(e.target.id).blur();
    }
    if (this.props.logic.isSolved) {
      this.props.mathAction.blankAllAction();
      this.props.logicAction.markUnsolved();
      this.props.mathAction.addLeadingZero();
    }
    else if (!this.props.logic.isSolved && ansStr == "0") {
      this.props.mathAction.clearAnsAction();
      this.props.mathAction.addLeadingZero();
    }
    else if (!this.props.logic.isSolved && symbolIsRecent) {
      this.props.mathAction.addLeadingZero();
    };
    if (this.props.logic.currentNumber.includes(".")) {
      console.log("already contains decimal");
    }
    else {
      this.props.mathAction.keyAction(".");
      this.props.logicAction.listCurrentNumber(".");
    };
  };

  handleKeyPress(e) {
    let digitsArray = this.props.math.buttons.digits;
    // console.log("input from keypress ", e.key);
    if (digitsArray.includes(parseInt(e.key))) {
      this.handleNumberInput(e, e.key);
    }
    else if (e.key == ".") {
      this.handleDecimalInput(e);
    }
  };

  handleOperatorInput(e, key) {
    let ansStr = this.props.math.display.ans;
    let operatorPayload = e.target.dataset.payload;
    if (!this.props.math.buttons.symbols.includes(operatorPayload)) { // ito ang payload kapag keyDown ang event
      operatorPayload = key;
    };
    if (e.target.id) { // kung kinclick, hindi undefined ang e.target.id
      document.getElementById(e.target.id).blur();
    };
    // console.log("operatorPayload", operatorPayload);
    if (this.props.logic.isSolved) {
      this.props.logicAction.markUnsolved();
    };
    if (this.props.math.buttons.symbols.includes(this.props.logic.recentInput)) {
      this.props.mathAction.cancelLastAction();
    };
    if (this.props.logic.recentInput == "=") {
      this.props.mathAction.resetWithRecentAns();
    };
    if (ansStr == "0") {
      this.props.mathAction.clearAnsAction();
    };
    this.props.mathAction.keyAction(operatorPayload);
    this.props.mathAction.clearAnsAction();
    this.props.logicAction.resetCurrentNumber();
    this.props.logicAction.recordRecentInput(operatorPayload);
  };

  handleClearAllInput(e) {
    if (e.target.id) { // kung kinclick, hindi undefined ang e.target.id
      document.getElementById(e.target.id).blur();
    };
    this.props.mathAction.clearAllAction();
    this.props.logicAction.markUnsolved();
    this.props.logicAction.resetCurrentNumber();
  };

  handleEqualsInput(e, payload) { // undefined payload if clicked
    let ansElement = document.getElementById("ans")
    ansElement.focus();
    ansElement.click();
    // console.log("argument payload: ", payload)
    let equalsPayload = payload;
    let symbolsArray = this.props.math.buttons.symbols;
    if (!equalsPayload) { // kung undefined ang equalsPayload
      document.getElementById(e.target.id).blur();
      equalsPayload = "=";
    };
    // if the most recent input is an operator, disregard then solve
    if (symbolsArray.includes(this.props.logic.recentInput)) {
      this.props.mathAction.cancelLastAction();
    }
    this.props.logicAction.resetCurrentNumber();
    this.props.mathAction.equalAction();
    this.props.logicAction.markSolved();
    // console.log("equalsPayload: ", equalsPayload);
    this.props.logicAction.recordRecentInput(equalsPayload);
  };

  handleKeyDown(e) {
    let symbolsArray = this.props.math.buttons.symbols;
    // console.log("keydown input: ", e.key);
    if (symbolsArray.includes(e.key)) {
      // console.log("math operator detected on keydown with key: ", e.key);
      this.handleOperatorInput(e, e.key);
    }
    else if (e.key == "Escape") {
      this.handleClearAllInput(e);
    }
    else if (e.key == "Enter") {
      this.handleEqualsInput(e, "=");
    }
  };

  componentDidMount() {
    console.log("component mounted!")
    // keypress for numbers
    document.addEventListener("keypress", this.handleKeyPress);
    // keyDown for operators and escape key
    document.addEventListener("keydown", this.handleKeyDown);
  };

  componentDidUpdate() {
    // console.log("App props: ",this.props);
  };

  render() {
    return(
      <div id="main-container">
        <div id="calculator">
          <Display display={this.props.math.display}/>
          <Keys buttons={this.props.math.buttons}
            ans={this.props.math.display.ans}
            problem={this.props.math.display.problem}
            logic={this.props.logic}
            mathAction={this.props.mathAction}
            logicAction={this.props.logicAction}
            handleNumberInput={this.handleNumberInput}
            handleOperatorInput={this.handleOperatorInput}
            handleDecimalInput={this.handleDecimalInput}
            handleEqualsInput={this.handleEqualsInput}
            handleClearAllInput={this.handleClearAllInput}/>
        </div>
      </div>
    );
  };
};

export default App;
