import { useState } from "react";
import "./App.css";

function App() {
  const [lists, setLists] = useState([]);
  const [todo, setTodo] = useState("");
  const [index, setIndex] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const addTodo = () => {
    if (todo === "") return;
    if (index != null) {
      lists[index] = todo;
    } else {
      const newData = [...lists, todo];
      setLists(newData);
    }
    setTodo("");
    setIsEdit(false);
  };

  const editTodo = (data) => {
    const newEditData = lists.findIndex((e) => e === data);
    setIndex(newEditData);
    setTodo(data);
    setIsEdit(true);
  };

  const deleteTodo = (data) => {
    setLists((prev) => prev.filter((e) => e != data));
  };

  return (
    <>
      <div className="input flex gap-3 mb-5">
        <input
          type="text"
          className="border-b-2 outline-0"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button
          className="rounded-md w-15 bg-green-500 text-white cursor-pointer"
          type="button"
          onClick={addTodo}
        >
          {isEdit ? "Edit" : "Add"}
        </button>
      </div>
      <div className="header mb-5">
        <h1 className="text-3xl font-bold underline">
          Todo List With React JS
        </h1>
      </div>
      <div className="list mb-5">
        <ul className="list-disc">
          <table class="border-collapse border border-gray-400 ...">
            <thead>
              <tr>
                <th class="border border-gray-300 w-50">Todo</th>
                <th class="border border-gray-300 ">Action</th>
              </tr>
            </thead>
            <tbody>
              {lists.map((e, i) => (
                <tr>
                  <td class="border border-gray-300 ">{e}</td>
                  <td class="border border-gray-300 p-2">
                    <button
                      className="rounded-md w-15 bg-yellow-500 text-white cursor-pointer"
                      onClick={() => editTodo(e)}
                    >
                      Edit
                    </button>{" "}
                    <button
                      className="rounded-md w-15 bg-red-500 text-white cursor-pointer"
                      onClick={() => deleteTodo(e)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ul>
      </div>
    </>
  );
}

export default App;
