
const initialState = {
  numbers: [
    { id: "zero", string: "0" }, 
    { id: "one", string: "1" }, 
    { id: "two", string: "2" }, 
    { id: "three", string: "3" }, 
    { id: "four", string: "4" }, 
    { id: "five", string: "5" }, 
    { id: "six", string: "6" }, 
    { id: "seven", string: "7" }, 
    { id: "eight", string: "8" }, 
    { id: "nine", string: "9" }
  ],
  operators: [
    { id: "add", string: "+" },
    { id: "subtract", string: "-" },
    { id: "multiply", string: "*" },
    { id: "divide", string: "/" },
  ],
}

const InputsReducer = (state=initialState, action) => {
  switch(action.type) {
    default:
      return state
  };
};

export default InputsReducer;
