
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
    { id: "add", string: "+", html: "\u002b" },
    { id: "subtract", string: "-", html: "\u2212" },
    { id: "multiply", string: "*", html: "\u00d7" },
    { id: "divide", string: "/", html: "\u00f7" },
  ],
  functions: [
    { id: "all-clear", string: "AC" },
    { id: "del", string: "DEL"  },
    { id: "answer", string: "Ans" },
    { id: "decimal", string: "." },
    { id: "equals", string: "=", html: "\u003d"},
    { id: "exp", string: "exp"},
  ]
}

const InputsReducer = (state=initialState, action) => {
  switch(action.type) {
    default:
      return state
  };
};

export default InputsReducer;
