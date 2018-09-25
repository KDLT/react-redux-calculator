export const NUMBER_KEY = "NUMBER_KEY";
export const OPERATOR_KEY = "OPERATOR_KEY";
export const DECIMAL_KEY = "DECIMAL_KEY";
export const RECORD_NUM_LENGTH = "RECORD_NUM_LENGTH";
export const DEL_KEY = "DEL_KEY";
export const CLEAR_ALL = "CLEAR_ALL";
export const CLEAR_ANS = "CLEAR_ANS";
export const EQUAL_KEY = "EQUAL_KEY";
export const RECORD_LAST_ANS = "RECORD_LAST_ANS";
export const RECORD_LAST_KEY = "RECORD_LAST_KEY";
export const UNDO = "UNDO";
export const RESET_WITH_ANS = "RESET_WITH_ANS";
export const ADD_LEAD_ZERO = "ADD_LEAD_ZERO";
export const BLANK_ALL = "BLANK_ALL";

export const numberKeyAction = (number) => ({
  type: NUMBER_KEY,
  key: number
})

export const concatNumberDisplay = (payload) => (dispatch, getState) => {
  if (getState().keys.logic.recentKey == "Enter") {
    // if you just solved a problem, and input a number next
    dispatch(clearAllAction()); // clear everything, start from scratch
  };
  if (getState().keys.display.ans == "0") {
    // bura muna nung zero sa ans kapag kakabukas lang ng calcu
    dispatch(clearAnsAction());
  };
  if (getState().keys.logic.currentNumber[0] == "0") {
    // kung "0" ang unang digit ta's number ulit ang kasunod, bura muna
    if (getState().keys.logic.currentNumber.length == 1) {
      dispatch(delKeyAction());
    }
  };
  dispatch(recordLastInput(payload));
  dispatch(numberKeyAction(payload));
}

export const operatorKeyAction = (operator) => ({
  type: OPERATOR_KEY,
  key: operator
})

export const recordNumLength = () => ({
  type: RECORD_NUM_LENGTH
})

export const concatOperatorDisplay = (payload) => (dispatch, getState) => {
  // check if recent input is an operator
  let currentProblem = getState().keys.logic.currentProblem;
  // recentInput are limited to things that appeared on screen
  let recentInput = currentProblem[currentProblem.length - 1];
  // recentKey includes all actions that happen
  let recentKey = getState().keys.logic.recentKey;
  let operatorArray = ["+", "-", "*", "/"];
  let allowedPrecedingOperators = ["+", "/", "*"];

  if (["Enter", "Escape"].includes(recentKey)) {
    // if you just solved a problem, then input an operator next,
    let newAns = getState().keys.logic.recentAns
    // first clear everything then prepend the recently calculated ans
    dispatch(clearAllAction());
    dispatch(numberKeyAction(newAns));
  };

    // if recentInput is indeed an operator
  if (operatorArray.includes(recentInput)) {
      // allow payload to be concatenated if +- or /- or *-
    if (payload == "-" && allowedPrecedingOperators.includes(recentInput)) {
      // do nothing, this will allow +- /- *-
    } else { // burahin 'yung nauna kapag wala sa mga combination
      dispatch(delKeyAction());
    };
  }
  else {
    // if recent input is NOT an operator, normally concatenate the operator
    dispatch(recordNumLength());
  };
  dispatch(recordLastInput(payload));
  dispatch(operatorKeyAction(payload));
};
export const pointKeyAction = () => ({
  type: DECIMAL_KEY,
  key: "."
})

export const addLeadingZero = () => (dispatch, getState) => {
  // if (getState().keys.display.ans == "0") {
  //   console.log("may zero na sa ans");
  //   dispatch()
  // }
  dispatch(concatNumberDisplay("0"));
}

export const concatDecimalDisplay = () => (dispatch, getState) => {

  if (getState().keys.logic.recentKey == "Enter") {
    // first clear everything if a fresh ans is displayed
    dispatch(clearAllAction());
  }; // then do the usual

  if (getState().keys.logic.currentNumber.length == 0) {
    // executes when decimal point is the first entry in currentNumber
    dispatch(addLeadingZero());
    dispatch(recordLastInput("."));
    dispatch(pointKeyAction());
  }
  else {
    // kung wala pang decimal point sa current number, g lang
    if (!getState().keys.logic.currentNumber.includes(".")) {
      dispatch(recordLastInput("."));
      dispatch(pointKeyAction());
    }
    else {
      console.log("currentNumber already has a decimal point")
    }
  }
}

export const equalKeyAction = () => ({
  type: EQUAL_KEY,
  key: "Enter"
})

export const recordLastAns = () => ({
  type: RECORD_LAST_ANS
})

export const concatEqualDisplay = () => (dispatch, getState) => {
  dispatch(equalKeyAction());
  dispatch(recordLastInput("Enter"));
  dispatch(recordLastAns());
}

export const delKeyAction = () => ({
  type: DEL_KEY,
  key: "Backspace"
})

export const recordLastInput = (key) => ({
  type: RECORD_LAST_KEY,
  key: key
})

// clear all, ans becomes "0"
export const clearAllAction = () => ({
  type: CLEAR_ALL,
  key: "Escape"
})
// clear ans, ans becomes ""
export const clearAnsAction = () => ({
  type: CLEAR_ANS
})

// NOT YET USED
export const cancelLastAction = () => ({
  type: UNDO
})

// NOT YET USED
export const blankAllAction = () => (dispatch) => {
  dispatch(clearAllAction());
  dispatch(clearAnsAction());
}
