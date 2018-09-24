export const TOGGLE_SOLVE_STATE = "TOGGLE_SOLVE_STATE";
export const RECORD_RECENT = "RECORD_RECENT";
export const LIST_CURRENT_NUMBER = "LIST_CURRENT_NUMBER";
export const RESET_CURRENT_NUMBER = "RESET_CURRENT_NUMBER";
export const POP_CURRENT = "POP_CURRENT";

export const toggleIsSolved = () => ({
  type: TOGGLE_SOLVE_STATE
})

export const recordRecentInput = (key) => ({
  type: RECORD_RECENT,
  payload: key
})

export const listCurrentNumber = (number) => ({
  type: LIST_CURRENT_NUMBER,
  payload: number
})

export const resetCurrentNumber= () => ({
  type: RESET_CURRENT_NUMBER
})

export const popCurrentNumber = () => ({
  type: POP_CURRENT
})
