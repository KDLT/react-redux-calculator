import {
  TOGGLE_SOLVE_STATE,
  RECORD_RECENT,
  LIST_CURRENT_NUMBER,
  RESET_CURRENT_NUMBER,
  POP_CURRENT
} from "../actions/LogicActions";

const initialState = {
  isSolved: false,
  currentNumber: [],
  recentInput: ""
}

const LogicReducer = (state = initialState, action) => {
  switch(action.type) {
    case TOGGLE_SOLVE_STATE:
      return { ...state, isSolved: !state.isSolved }
    case LIST_CURRENT_NUMBER:
      return { ...state,
        currentNumber: state.currentNumber.concat(action.payload)
      }
    case RECORD_RECENT:
      return { ...state, recentInput: action.payload}
    case POP_CURRENT:
      let numArray = state.currentNumber;
      return { ...state, currentNumber: numArray.slice(0, numArray.length - 1)}
    case RESET_CURRENT_NUMBER:
      return {...state,
        currentNumber: []
      }
    default:
      return state;
  }
}

export default LogicReducer;
