import {
  NUMBER_KEY,
  OPERATOR_KEY,
  RECORD_NUM_LENGTH,
  DECIMAL_KEY,
  DEL_KEY,
  DELETE_IN_PROBLEM,
  DELETE_IN_ANS,
  CLEAR_ALL,
  CLEAR_ANS,
  EQUAL_KEY,
  RECORD_LAST_ANS,
  RECORD_LAST_KEY,
  UNDO,
  RESET_WITH_ANS,
  ADD_LEAD_ZERO,
  BLANK_ALL,
} from "../actions/KeyActions";

export const initialState = {
  display: {
    problem: "",
    ans: "0",
  },
  logic: {
    numLengths: [],
    currentProblem: [],
    currentNumber: [],
    currentAnsArr: [],
    recentKey: "",
    recentAns: ""
  }
}

const KeyReducer = (state = initialState, action) => {
  switch(action.type) {
    case NUMBER_KEY:
      let commaAns = insertCommas(state.logic.currentNumber);
      return {...state,
        display : {
          problem: state.display.problem.concat(action.key),
          ans: commaAns
        }
      }
    case OPERATOR_KEY:
      return {...state,
        display: {
          problem: state.display.problem.concat(action.key),
          ans: ""
        },
        logic: {
          ...state.logic,
          currentNumber: []
        }
      }
    case RECORD_NUM_LENGTH:
      let currentNumLength = state.logic.currentNumber.length;
      return {...state,
        logic: {
          ...state.logic,
          numLengths: state.logic.numLengths.concat(currentNumLength),
        }
      }
    case DECIMAL_KEY:
      return { ...state,
        display: {
          ...state.display,
          problem: state.display.problem.concat(action.key),
          ans: state.display.ans.concat(action.key)
        }
      }
    case EQUAL_KEY:
      // console.log("evaluate: ", state.display.problem);
      currentNumLength = state.logic.currentNumber.length;
      let ans = eval(state.display.problem).toString();
      let ansArray = numStrToArray(ans);
      let ansWithCommas = insertCommas(ansArray);
      return {...state,
        display : {
          ...state.display,
          // problem: state.display.problem.concat("=").concat(ans),
          ans: ansWithCommas
        },
        logic: {
          ...state.logic,
          currentAnsArr: ansArray,
          numLengths: state.logic.numLengths.concat(currentNumLength)
        }
      }
    case RECORD_LAST_ANS:
      ans = removeCommas(state.display.ans);
      return {...state,
        logic: {
          ...state.logic,
          // recentAns: ansArr
          recentAns: ans
        }
      }
    case DELETE_IN_PROBLEM:
      let currentProblemArray = state.logic.currentProblem
      return {...state, 
        logic: {
          ...state.logic,
          currentProblem: currentProblemArray.slice(0, currentProblemArray.length - 1)
        }
      }
    case DELETE_IN_ANS:
      let currentAns = state.logic.currentAnsArr;
    return { ...state,
      logic: {
        ...state.logic,
        currentAnsArr: currentAns.slice(0, currentAns.length - 1)
      }
    }
    case DEL_KEY:
      let problemStr = state.display.problem;
      let newProblemStr = ""; let newAns = "0";
      let problemArr = state.logic.currentProblem;
      let numLengthsArr = state.logic.numLengths;
      let currentNumArr = state.logic.currentNumber;
      let lastNumLength = numLengthsArr[numLengthsArr.length - 1];
      // kung naubusan na ng dinedelete, i-set na current number 'yung nauna
      if (currentNumArr.length == 0) {
        // gamit ang numLengths, kunin 'yung length ng huling entry
        for (let i = 0; i <= lastNumLength; i++) {
          // loop through the problem array, starting from the end, hence unshift
          currentNumArr.unshift(problemArr[problemArr.length - 1 - i])
        }
      };
      // habang more than 1 character pa ang natitira sa problem string
      if (state.display.problem.length > 1) {
        console.log("hindi nga blanko");
        newProblemStr = problemStr.slice(0, problemStr.length - 1);
        newAns = state.display.ans.slice(0, state.display.ans.length - 1);
      } // kung isang character na lang natitira ta's binura pa,
      // i-zero na agad ang newAns
      else { newAns = "0"; };
      return {...state,
        display: {
          problem: newProblemStr,
          ans: newAns
        },
        logic: {
          ...state.logic,
          numLengths: numLengthsArr,
          currentProblem: problemArr.slice(0, problemArr.length - 1),
          currentNumber: currentNumArr.slice(0, currentNumArr.length - 1),
          recentKey: action.key
        }
      }
    case RECORD_LAST_KEY:
      // check if ENTER, DO NOT ADD it to problem array and number array
      const concatCallback = (arrayToConcatenate, actionKey) => {
        if (actionKey === "Enter") {
          return arrayToConcatenate
        }
        else {
          return arrayToConcatenate.concat(actionKey)
        }
      };
      return {...state,
        logic: {
          ...state.logic,
          currentNumber: concatCallback(state.logic.currentNumber, action.key),
          currentProblem: concatCallback(state.logic.currentProblem, action.key),
          recentKey: action.key
        }
      }
    case CLEAR_ALL:
      return {...state,
        display : {
          ...state.display,
          problem: "",
          ans: "0"
        },
        logic: {
          ...state.logic,
          currentNumber: [],
          currentProblem: [],
          numLengths: [],
          recentKey: action.key
        }
      }
    case CLEAR_ANS:
      return {...state,
        display: {
          ...state.display,
          ans: ""
        }
      }
    case BLANK_ALL:
      return {...state,
        display: {
          ans: "",
          problem: ""
        }
      }
    default:
      return state;
  }
}

export default KeyReducer;

// helper function for attaching commas:
const insertCommas = (numberArray) => {
  let isNegative = false;
  let hasDecimal = false;
  let wholeNumPart = []; let decimalPart = []; let decimalIndex = 0;
  if (numberArray[0] == "-") {
    isNegative = true;
    numberArray = numberArray.slice(1);
  };
  if (numberArray.includes(".")) {
    hasDecimal = true;
    decimalIndex = numberArray.indexOf(".");
  };
  // console.log("numberArray: ", numberArray);
  // check if number has decimal point
  if (!hasDecimal) {
    wholeNumPart = numberArray;
  } else { // break it up in the whole number part and decimal part
    wholeNumPart = numberArray.slice(0, decimalIndex);
    decimalPart = numberArray.slice(decimalIndex + 1);
  }
  let commaAns = [];
  let numberLength = wholeNumPart.length;
  let currentMaxIndex = numberLength - 1;
  let commaCounter = 0;
  for (let i = currentMaxIndex; i >= 0; i--) {
    commaCounter++;
    // console.log("commaCounter: ", commaCounter, " i: ", i);
    commaAns.unshift(wholeNumPart[i]);
    if (numberLength % 3 == 0) {
      // numberLength is a multiple of 3, do the following
      if (commaCounter % 3 == 0) {
        if (i == 0) { // at index = 0, DO NOT unshift a comma
          // console.log("i = 0, do nothing,")
        }
        else { // other indices, safe to unshift a comma
          commaAns.unshift(",");
        }
      }
    }
    else { // numberLength is NOT a multiple of 3,
      if (commaCounter % 3 == 0) { // just unshift a comma every three digits
        commaAns.unshift(",");
      }
    }
  };
  commaAns = commaAns.join("");
  // console.log("decimalPart: ", decimalPart);
  if (decimalPart.length > 0) {
    let decimalStr = decimalPart.join("");
    console.log("decimalStr: ", decimalStr);
    commaAns = commaAns.concat(".").concat(decimalStr);
  };
  if (isNegative) commaAns = "-" + commaAns;
  return commaAns; // a string
}

// removes commas
const removeCommas = (ansStr) => {
  let ansStrWithCommas = ansStr;
  let ansArr = [];
  for (let i in ansStrWithCommas) {
    ansArr.push(ansStrWithCommas[i])
  }
  ansArr = ansArr.filter(digit => (digit !== ","));
  return ansArr.join("");
}

// converts number string to an array
const numStrToArray = (numberStr) => {
  let numberArray = [];
  let numStrLength = numberStr.length;
  for (let i = 0; i < numStrLength; i++) {
    if (numberStr[i] !== ",") {
      numberArray.push(numberStr[i])
    }
  };
  return numberArray
};
