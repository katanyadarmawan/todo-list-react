import { useEffect, useState } from "react";
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
      setLists([...lists, { todo: todo, status: "Progess" }]);
    }
    setTodo("");
    setIndex(null);
  };

  useEffect(() => {
    console.log(lists);
  }, [lists]);

  const editTodo = (data) => {
    setIndex(lists.findIndex((e) => e === data));
    setTempTodo(data);
    setIsUpdate(true);
  };

  const updateTodo = (index) => {
    lists[index] = tempTodo;
    setIsUpdate(false);
    setIndex(null);
  };

  const handleChangeTodo = (data) => {
    setTempTodo((prev) => ({
      ...prev,
      todo: data.target.value,
    }));
  };
  const handleChangeStatus = (data) => {
    setTempTodo((prev) => ({ ...prev, status: data.target.value }));
  };
  const deleteTodo = (data) => {
    setLists((prev) => prev.filter((e) => e != data));
  };

  return (
    <>
      <div className="input flex gap-3 mb-5">
        <input
          type="text"
          className="border-b-1 outline-0"
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
          <table className="border-collapse  border-gray-400 ...">
            <thead>
              <tr>
                <th className=" border-gray-300 w-50">Todo</th>
                <th className=" border-gray-300 w-50">Status</th>
                <th className=" border-gray-300 w-50">Action</th>
              </tr>
            </thead>
            <tbody>
              {lists.map((e, i) => (
                <tr key={i}>
                  <td className="border border-gray-300 ">
                    {isUpdate && index === i ? (
                      <input
                        type="text"
                        className="border-b-1 outline-0"
                        value={tempTodo.todo}
                        onChange={handleChangeTodo}
                      />
                    ) : (
                      e.todo
                    )}
                  </td>
                  <td className="border border-gray-300 ">
                    <div>
                      {isUpdate && index === i ? (
                        <select
                          className="bg-gray-50 border-b-1 outline-0"
                          value={tempTodo.status}
                          onChange={handleChangeStatus}
                        >
                          <option
                            value="Progress"
                            selected={e.status === tempTodo.status}
                          >
                            Progress
                          </option>
                          <option
                            value="Cancel"
                            selected={e.status === tempTodo.status}
                          >
                            Cancel
                          </option>
                          <option
                            value="Done"
                            selected={e.status === tempTodo.status}
                          >
                            Done
                          </option>
                        </select>
                      ) : (
                        e.status
                      )}
                    </div>
                  </td>
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
