import React from "react";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./styles.css";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import TodoList from "./components/TodoList";
const store = createStore(rootReducer);
const App = () => {
  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
};
export default App;
