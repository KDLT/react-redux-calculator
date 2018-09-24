
const initialState = {
  numbers_id: ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"],
  numbers_string: ["0","1","2","3","4","5","6","7","8","9"],
  operators: ["add", "subtract", "multiply", "divide"],
  symbols: ["+", "-", "*", "/"]
}

const InputsReducer = (state=initialState, action) => {
  switch(action.type) {
    default:
      return state
  };
};

export default InputsReducer;
