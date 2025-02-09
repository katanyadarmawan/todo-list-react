import { useState } from "react";
import "./App.css";

function App() {
  const [lists, setLists] = useState([]);
  const [todo, setTodo] = useState("");
  const [tempTodo, setTempTodo] = useState({});
  const [index, setIndex] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  const addTodo = () => {
    if (todo === "") return;
    if (index != null) {
      lists[index] = todo;
    } else {
      const newData = [...lists, { todo: todo, status: false }];
      setLists(newData);
    }
    setTodo("");
    setIndex(null);
  };

  const editTodo = (data) => {
    const newEditData = lists.findIndex((e) => e === data);
    setIndex(newEditData);
    setTempTodo(data);
    setIsUpdate(true);
  };

  const updateTodo = (index) => {
    lists[index] = tempTodo;
    setIsUpdate(false);
    setIndex(null);
  };

  const handleChangeTodo = (data) => {
    setTempTodo((prev) => ({ ...prev, todo: data.target.value }));
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
          Add
        </button>
      </div>
      <div className="header mb-5">
        <h1 className="text-3xl font-bold underline">
          Todo List With React JS
        </h1>
      </div>
      <div className="list mb-5">
        <ul className="list-disc">
          <table className="border-collapse border border-gray-400 ...">
            <thead>
              <tr>
                <th className="border border-gray-300 w-50">Todo</th>
                <th className="border border-gray-300 w-50">Status</th>
                <th className="border border-gray-300 w-50">Action</th>
              </tr>
            </thead>
            <tbody>
              {lists.map((e, i) => (
                <tr key={i}>
                  <td className="border border-gray-300 ">
                    {isUpdate && index === i ? (
                      <input
                        type="text"
                        className="border-b-2 outline-0"
                        value={tempTodo.todo}
                        onChange={handleChangeTodo}
                      />
                    ) : (
                      e.todo
                    )}
                  </td>
                  <td className="border border-gray-300 ">{e.status}</td>
                  <td className="border border-gray-300 p-2">
                    <div className="action">
                      {isUpdate && index === i ? (
                        <button
                          className="rounded-md w-15 bg-yellow-500 text-white cursor-pointer mr-2"
                          onClick={() => updateTodo(i)}
                        >
                          Update
                        </button>
                      ) : (
                        <button
                          className="rounded-md w-15 bg-yellow-500 text-white cursor-pointer mr-2"
                          onClick={() => editTodo(e)}
                        >
                          Edit
                        </button>
                      )}
                      <button
                        className="rounded-md w-15 bg-red-500 text-white cursor-pointer"
                        onClick={() => deleteTodo(e)}
                      >
                        Delete
                      </button>
                    </div>
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
