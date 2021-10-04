import React, { useState } from "react";
import { connect } from "react-redux";
import { updateTodo } from "../redux/action/actions";
import ModalTodo from "./ModalTodo";
import "./MainScreen.css";

function MainScreen({ dataTodo }) {
  const [trigger, setTrigger] = useState(false);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [todoId, setTodoId] = useState("");
  const [modalFunction, setModalFunction] = useState("add");

  const toggle = () => setTrigger(!trigger);
  const handleClick = (e, todo) => {
    setTodoId(e.target.id);
    setTitle(todo.title);
    setDescription(todo.description);
    setTrigger(true);
    setModalFunction("modalDetail");
  };

  const handleNew = () => {
    setModalFunction("add");
    setTrigger(true);
  };

  console.log(dataTodo);

  return (
    <div>
      <div className="container">
        <h1>Your To Do List</h1>
        <button onClick={handleNew} className="btn btn-primary">
          Add New Todo
        </button>
        {dataTodo.length > 0 &&
          dataTodo.map((todo) => (
            <ul>
              <li
                className={`todo-list${todo.status && "-active"}`}
                key={todo.id}
                onClick={(e) => handleClick(e, todo)}
                id={todo.id}
              >
                {todo.title}
              </li>
            </ul>
          ))}
      </div>

      <ModalTodo
        modalFunction={modalFunction}
        trigger={trigger}
        toggle={toggle}
        id={todoId}
        description={description}
        title={title}
      />
    </div>
  );
}

const stateProps = (initialState) => {
  return {
    dataTodo: initialState.todos,
  };
};

const dispatchProps = (dispatch) => {
  return {
    editTodo: (data) => dispatch(updateTodo(data)),
  };
};

export default connect(stateProps, dispatchProps)(MainScreen);
