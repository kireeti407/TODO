import { useEffect, useState } from "react";
import "../style/todo.css";
import {
  Plus,
  XCircle,
  CheckCircle,
  Pencil,
  Undo2,
  Trash2,
  CheckSquare,
  XSquare,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

type Task = {
  task: string;
  _id: number;
  date: string;
  complete: boolean;
  email?: string;
};

export default function Todo() {
  const [task, setTask] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteTask, setDeleteTask] = useState<Task | null>(null);
  const [tododata, setTodo] = useState<Task[]>([]);
  const [editingTodo, setEditingTodo] = useState<number | null>(null);
  const [editedText, setEditedText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [notification, setNotification] = useState<{
    message: string;
    type: string;
  } | null>(null);

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const getUser = () => {
    const data = localStorage.getItem("user");
    return data ? JSON.parse(data) : null;
  };

  async function fetchData() {
    const res = await fetch(`${import.meta.env.VITE_API_URL}TODO/gettask`);
    const data = await res.json();
    const user = getUser();
    setTodo(data.data.filter((t: Task) => t.email === user.email));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const addTask = async () => {
    if (!task.trim()) return;

    const isDuplicate = tododata.some(
      (t) => t.task.toLowerCase().trim() === task.toLowerCase().trim()
    );

    if (isDuplicate) {
      showNotification("Task already exists!", "error");
      return;
    }
    const user = getUser();

    await fetch(`${import.meta.env.VITE_API_URL}TODO/addtask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task,
        date: new Date().toLocaleString(),
        id: Date.now(),
        complete: false,
        email: user.email,
      }),
    });

    setTask("");
    fetchData();
    showNotification("Task added successfully!", "success");
  };

  const updateTask = async (item: Task) => {
    await fetch(`${import.meta.env.VITE_API_URL}TODO/updatetask/${item._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...item, complete: !item.complete }),
    });

    const updatedTodo = tododata.map((t) =>
      t._id === item._id ? { ...t, complete: !item.complete } : t
    );
    setTodo(updatedTodo);
    if (!item.complete) {
      showNotification(`Task "${item.task}" is completed`, "success");
    } else {
      showNotification("Task updated successfully!", "success");
    }
  };

  const deleteTaskApi = async () => {
    if (!deleteTask) return;

    await fetch(
      `${import.meta.env.VITE_API_URL}TODO/deletetask/${deleteTask._id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );

    setConfirmOpen(false);
    setDeleteTask(null);
    fetchData();
    showNotification("Task deleted successfully!", "success");
  };

  const handleEdit = (item: Task) => {
    setEditingTodo(item._id);
    setEditedText(item.task);
  };

  const handleCancel = () => {
    setEditingTodo(null);
    setEditedText("");
  };

  const updateTaskText = async (item: Task) => {
    if (!editedText.trim()) return;

    const isDuplicate = tododata.some(
      (t) =>
        t.task.toLowerCase().trim() === editedText.toLowerCase().trim() &&
        t._id !== item._id
    );

    if (isDuplicate) {
      showNotification("Another task with this name already exists!", "error");
      return;
    }

    await fetch(
      `${import.meta.env.VITE_API_URL}TODO/updatetasktext/${item._id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: editedText, complete: false }),
      }
    );

    const updatedTodo = tododata.map((t) =>
      t._id === item._id ? { ...t, task: editedText, complete: false } : t
    );
    setTodo(updatedTodo);

    setEditingTodo(null);
    setEditedText("");
    showNotification("Task updated successfully!", "success");
  };

  const tasksPerPage = 5;
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tododata.slice(indexOfFirstTask, indexOfLastTask);



  return (
    <>
      <h1 className="todo-title">Your Tasks</h1>

      {/* ADD INPUT */}
      <div className="todo-input-box">
        <input
          type="text"
          placeholder="Enter your task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTask} className="btn-add">
          <Plus /> Add
        </button>
      </div>

      {/* DELETE POPUP */}
      {confirmOpen && (
        <div className="overlay">
          <div className="confirm-box">
            <p>Are you sure you want to delete?</p>
            <div className="confirm-buttons">
              <button
                className="btn-red"
                onClick={() => setConfirmOpen(false)}
              >
                <XCircle /> No
              </button>
              <button className="btn-green" onClick={deleteTaskApi}>
                <CheckCircle /> Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TASK LIST */}
      <div className="todo-list">
        {currentTasks.map((item, i) => (
          <div
            key={item._id}
            className={`todo-card ${item.complete ? "done" : ""}`}
          >
            <div className="card-top">
              <p className="todo-index">{indexOfFirstTask + i + 1}</p>

              {editingTodo === item._id ? (
                <input
                  type="text"
                  className="edit-input"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
              ) : (
                <p className="todo-text">
                  {item.task.charAt(0).toUpperCase() + item.task.slice(1)}
                </p>
              )}

              <p className="todo-date">{item.date}</p>
            </div>

            <div className="card-bottom">
              {editingTodo === item._id ? (
                <div className="todo-card-buttons">
                  <button
                    className="btn btn-save"
                    onClick={() => updateTaskText(item)}
                  >
                    <CheckSquare /> Save
                  </button>
                  <button className="btn btn-cancel" onClick={handleCancel}>
                    <XSquare /> Cancel
                  </button>
                </div>
              ) : (
                <>
                  <div className="todo-card-buttons">
                    <button
                      className="btn btn-edit"
                      onClick={() => handleEdit(item)}
                    >
                      <Pencil /> Edit
                    </button>

                    <button
                      className="btn btn-complete"
                      onClick={() => updateTask(item)}
                    >
                      {item.complete ? <Undo2 /> : <CheckCircle />}
                      {item.complete ? "Completed" : "Complete"}
                    </button>
                  </div>

                  <button
                    className="btn btn-delete"
                    onClick={() => {
                      setConfirmOpen(true);
                      setDeleteTask(item);
                    }}
                  >
                    <Trash2 /> Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      {tododata.length > tasksPerPage && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="page-btn"
          >
            <ArrowLeft /> Previous
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === Math.ceil(tododata.length / tasksPerPage)}
            className="page-btn"
          >
            Next <ArrowRight />
          </button>
        </div>
      )}

      {/* NOTIFICATION */}
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </>
  );
}
