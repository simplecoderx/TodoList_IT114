import { ADD_TODO, REMOVE_TODO, UPDATE_SEARCH_TERM } from "../actions/types";
const initialState = {
  todos: [],
  searchTerm: ""
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, { id: Date.now(), text: action.payload.text }]
      };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id)
      };
    case UPDATE_SEARCH_TERM:
      return { ...state, searchTerm: action.payload.term };
    default:
      return state;
  }
};
export default rootReducer;
