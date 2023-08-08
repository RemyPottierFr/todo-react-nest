import "./TodoItem.css";

function TodoItem({ todo, checkTodo, deleteTodo }) {
  return (
    <li className="item">
      <div>
        <input
          type="checkbox"
          title="mark as done"
          onChange={({ target: { checked } }) => checkTodo(todo.id, checked)}
          defaultChecked={todo.done}
        />
        <button title="delete the todo" onClick={() => deleteTodo(todo.id)}>
          🗑️
        </button>
      </div>
      <span className={todo.done ? "done" : ""}>{todo.value}</span>
    </li>
  );
}

export default TodoItem;
