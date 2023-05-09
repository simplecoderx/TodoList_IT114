import React, { useState } from "react";
import { connect } from "react-redux";
import { addTodo, removeTodo } from "../actions/actions";
import "./../css/style.css";

const TodoList = ({ todos, addTodo, removeTodo }) => {
  const [text, setText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [removeAlert, setRemoveAlert] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText("");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTodos = todos.slice(indexOfFirstItem, indexOfLastItem);
  const filteredTodos = currentTodos.filter((todo) =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRemove = (id) => {
    removeTodo(id);
    setRemoveAlert(true);
    setTimeout(() => setRemoveAlert(false), 3000);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container-fluid p-5 gif-background">
      <div className="mb-5">
        <h1 className="text-center">E-List</h1>
      </div>
      {/* <div><iframe src="https://giphy.com/embed/l4KihuqeuJEi9qLSM" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/animated-abstract-background-l4KihuqeuJEi9qLSM">via GIPHY</a></p></div> */}
      <figure className="text-center">
        <blockquote className="blockquote">
          <p>When life hands you tasks, hand yourself a to-do list.</p>
        </blockquote>
        <figcaption className="blockquote-footer">
          <cite title="Source Title">Anonymous</cite>
        </figcaption>
      </figure>
      {/* Show the alert if showAlert is true */}
      {showAlert && (
        <div className="alert alert-success w-50 mx-auto" role="alert">
          New task added successfully!
        </div>
      )}
      {removeAlert && (
        <div className="alert alert-success w-50 mx-auto" role="alert">
          Task removed successfully!
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3  w-50 mx-auto">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="form-control"
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="submit">
              Add
            </button>
          </div>
        </div>
      </form>
      <div className="input-group mb-3 w-50 mx-auto">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          className="form-control"
          placeholder="Search for a todo..."
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Mark</th>
            <th>Todo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTodos.map((todo) => (
            <tr key={todo.id}>
              <td>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id={`flexCheckDefault-${todo.id}`}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`flexCheckDefault-${todo.id}`}
                  ></label>
                </div>
              </td>
              <td>{todo.text}</td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleRemove(todo.id)}
                >
                  <i className="bi bi-trash fs-100"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <ul className="pagination">
          {Array.from(
            { length: Math.ceil(todos.length / itemsPerPage) },
            (_, index) => (
              <li
                key={index}
                className={`page-item${
                  index + 1 === currentPage ? " active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => ({
  todos: state.todos
});

export default connect(mapStateToProps, { addTodo, removeTodo })(TodoList);
