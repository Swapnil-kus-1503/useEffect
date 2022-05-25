import React from 'react'
import axios from "axios";

const Todos = () => {
  const [todos, setTodos] = React.useState([]);

  const [page, setPage] = React.useState(1);

  const [totalCount, setTotalCount] = React.useState(0);

  const [limit, setLimit] = React.useState(5);

  React.useEffect(() => {
    const getTodo = async () => {
      let res = await axios.get(
        `http://localhost:8080/todos?_page=${page}&_limit=${limit}`
      );
      setTodos(res.data);
      setTotalCount(Number(res.headers["x-total-count"]));
    };
    getTodo();
  }, [page,limit]);
  return (
    <div>
      <h3>Page : {page}</h3>
      <button
        disabled={page <= 1}
        onClick={() => {
          if (page > 1) {
            setPage(page - 1);
          }
        }}
      >
        Prev
      </button>
      <select onClick={(e) => setLimit(Number(e.target.value))}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>
      <button
        disabled={page * limit >= totalCount}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>

      {todos.map((todo, index) => (
        <div key={todo.id}>
          {todo.id} {`:`} {todo.text}{" "}
        </div>
      ))}
    </div>
  )
}

export default Todos