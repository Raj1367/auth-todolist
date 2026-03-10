import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { IoMdDoneAll } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { useUserStore } from "../Zustand/UserStore";

interface todoListType {
  id: string;
  text: string;
  isCompleted: boolean;
  isEdit: boolean;
  date: string;
}

const Todolist = () => {
  // states
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState<todoListType[]>([]);
  const [editTodoList, setEditTodoList] = useState<todoListType | null>(null);

  // user state
  const { user, isAuthenticated } = useUserStore();

  const isAdmin = user?.role.toLowerCase() === "admin";

  useEffect(() => {
    const savedTodo = localStorage.getItem("todoList");
    if (savedTodo) {
      setTodoList(JSON.parse(savedTodo));
    }
  }, []);

  const handleAdd = () => {
    if (!isAdmin) {
      alert("Only admins can add tasks.");
      return;
    }

    const newTodo = {
      id: uuid(),
      text: todo,
      date: new Date().toLocaleString(),
      isCompleted: false,
      isEdit: false,
    };
    setTodoList((prev) => {
      const updatedList = [{ ...newTodo }, ...prev];
      localStorage.setItem("todoList", JSON.stringify(updatedList));
      return updatedList;
    });
    setTodo("");
  };

  const handleCompleted = (id: string) => {
    if (!isAdmin) {
      alert("Only admins can mark tasks as completed.");
      return;
    }

    setTodoList((prev) => {
      const updatedList = prev.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      );
      localStorage.setItem("todoList", JSON.stringify(updatedList));
      return updatedList;
    });
  };

  const handleDelete = (id: string) => {
    if (!isAdmin) {
      alert("Only admins can delete tasks.");
      return;
    }

    setTodoList((prev) => {
      const updatedList = prev.filter((item) => item.id !== id);
      localStorage.setItem("todoList", JSON.stringify(updatedList));
      return updatedList;
    });
  };

  const handleEdit = (item: todoListType) => {
    if (!isAdmin) {
      alert("Only admins can edit tasks.");
      return;
    }
    setEditTodoList(item);
  };

  const handleSaveEdit = () => {
    if (!isAdmin) {
      alert("Only admins can save edits.");
      return;
    }

    setTodoList((prev) => {
      const updatedList = prev.map((item) =>
        item.id === editTodoList?.id
          ? {
              ...item,
              text: editTodoList.text,
              date: new Date().toLocaleString(),
            }
          : item
      );
      localStorage.setItem("todoList", JSON.stringify(updatedList));
      return updatedList;
    });
    setEditTodoList(null);
  };

  return (
    <div className="flex justify-center items-center h-[70vh]">
      <div className="container max-w-[1000px]">
        <div className="bg-sky-200 rounded-md mx-4 py-3 shadow-md">
          {isAuthenticated ? (
            <>
              <div className="flex justify-center items-center gap-4 p-4">
                <input
                  type="text"
                  className="w-full h-10 rounded-md shadow-md px-2 capitalize"
                  placeholder="Enter Task..."
                  value={todo}
                  onChange={(e) => setTodo(e.target.value)}
                />
                <button
                  onClick={handleAdd}
                  className={`bg-yellow-200 px-4 py-2 shadow-md rounded-md font-semibold text-[18px] ${
                    isAdmin ? "text-gray-500" : "text-gray-300 cursor-not-allowed"
                  }`}
                  disabled={!isAdmin}
                >
                  Add
                </button>
              </div>
              {todoList.map((item) =>
                editTodoList?.id === item.id ? (
                  <div
                    key={item.id}
                    className="bg-pink-200 mx-4 shadow-md rounded-md flex px-4 py-5 my-2 gap-4"
                  >
                    <input
                      type="text"
                      value={editTodoList.text}
                      onChange={(e) =>
                        setEditTodoList({ ...editTodoList, text: e.target.value })
                      }
                      className="w-full h-8 rounded-md shadow-md px-2 capitalize"
                    />
                    <button
                      onClick={handleSaveEdit}
                      className="bg-green-200 px-3 py-1 shadow-md rounded-md font-semibold text-gray-500"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditTodoList(null)}
                      className="bg-yellow-200 px-3 py-1 shadow-md rounded-md font-semibold text-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div
                    className="bg-pink-200 mx-4 shadow-md rounded-md flex justify-between px-4 py-1 my-2"
                    key={item.id}
                  >
                    <div className="p-2">
                      <h3
                        className={`${
                          item.isCompleted
                            ? "font-semibold text-lg text-gray-400 line-through "
                            : "font-semibold text-lg text-gray-500"
                        }`}
                      >
                        {item.text}
                      </h3>
                      <span className="text-gray-400 text-xs">{item.date}</span>
                    </div>
                    <div className="flex gap-4 justify-center items-center">
                      <button
                        onClick={() => handleCompleted(item.id)}
                        className={`bg-green-200 h-10 w-10 rounded-full hover:scale-105 flex justify-center items-center shadow-md ${
                          isAdmin ? "text-gray-500" : "text-gray-300 cursor-not-allowed"
                        }`}
                        disabled={!isAdmin}
                      >
                        <IoMdDoneAll size={20} />
                      </button>
                      <button
                        onClick={() => handleEdit(item)}
                        disabled={!isAdmin || item.isCompleted}
                        className={`${
                          item.isCompleted
                            ? "bg-gray-200 cursor-not-allowed text-gray-400 h-10 w-10 rounded-full flex justify-center items-center shadow-md"
                            : isAdmin
                            ? "bg-blue-200 h-10 w-10 rounded-full hover:scale-105  flex justify-center items-center shadow-md text-gray-500"
                            : "bg-gray-200 cursor-not-allowed text-gray-300"
                        }`}
                      >
                        <MdEdit size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className={`bg-yellow-200 h-10 w-10 rounded-full hover:scale-105 flex justify-center items-center shadow-md ${
                          isAdmin ? "text-gray-500" : "text-gray-300 cursor-not-allowed hover:scale-105"
                        }`}
                        disabled={!isAdmin}
                      >
                        <MdDeleteForever size={20} />
                      </button>
                    </div>
                  </div>
                )
              )}
            </>
          ) : (
            <div className="text-center py-5 font-semibold text-gray-500">
              Please log in to manage the Todo list.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Todolist;
