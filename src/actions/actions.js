import { ADD_TODO, REMOVE_TODO, UPDATE_SEARCH_TERM } from "./types";
export const addTodo = (text) => ({
  type: ADD_TODO,
  payload: { text }
});
export const removeTodo = (id) => ({
  type: REMOVE_TODO,
  payload: { id }
});
export const updateSearchTerm = (term) => ({
  type: UPDATE_SEARCH_TERM,
  payload: { term }
});
