import React from "react";

const Todo = () => {
  const [newTodo, setNewTodo] = React.useState("");
  const [todo, setTodo] = React.useState([]);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    saveInfo(page);
  }, [page]);

  const saveInfo = (page = 1) => {
    fetch(`http://localhost:8080/todos/?_page=${page}&_limit=3`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        text: newTodo,
        isCompleted: false,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        //   console.log(data);
        setTodo([...todo, data]);

        setNewTodo("");
      });
  };

  React.useEffect(() => {
    fetch("http://localhost:8080/todos/")
      .then((res) => res.json())
      .then((data) => {
        //   console.log(data);
        setTodo(data);
      });
  }, []);

  return (
    <div>
      Todos
      <div>
        <input
          value={newTodo}
          onChange={({ target }) => setNewTodo(target.value)}
        />
        <button onClick={saveInfo}>+</button>
        {todo.map((Todo) => (
          <div key={Todo.id}>{Todo.text}</div>
        ))}
      </div>
      <h3>Page:{page}</h3>
      <button onClick={() => (setPage(page + 1))}>NEXT</button>
    </div>
  );
};

export default Todo;
