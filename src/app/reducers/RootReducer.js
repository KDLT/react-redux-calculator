import KeyReducer from "./KeyReducer";
import InputsReducer from "./InputsReducer";

import { combineReducers } from "redux";

const RootReducer = combineReducers({
  keys: KeyReducer,
  inputs: InputsReducer
})

export default RootReducer
