import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import "./TodoContainer.css";

const fetchURL = "https://jsonplaceholder.typicode.com/todos";

const getFetchUrl = (urlToAdd) => new URL(urlToAdd, fetchURL);

function TodoContainer() {
  const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState("");

  const fetchData = async () => {
    const res = await fetch(fetchURL);
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createTodo = async (e) => {
    e.preventDefault();
    try {
      await fetch(fetchURL, {
        body: JSON.stringify({ value: todoValue, done: false }),
        method: "POST",
      });
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const checkTodo = async (id, done) => {
    try {
      await fetch(getFetchUrl(id), {
        body: JSON.stringify({ done }),
        method: "PATCH",
      });
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(getFetchUrl(id), { method: "DELETE" });
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Todo Container</h1>
      <form className="form" onSubmit={createTodo}>
        <input
          type="text"
          value={todoValue}
          onChange={({ target: { value } }) => setTodoValue(value)}
        />
        <button type="submit" onSubmit={createTodo}>
          ➕
        </button>
      </form>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            checkTodo={checkTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoContainer;
