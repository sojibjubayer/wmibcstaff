import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCheck,
  FaEdit,
  FaPlus,
  FaRedo,
  FaSave,
  FaSpinner,
  FaTimes,
  FaTrash,
} from "react-icons/fa";

const API_URL = "https://wmibcstaff-server.vercel.app/api/todos";

const TODO_STATUSES = [
  "Pending",
  "In Progress",
  "On Hold",
  "Completed",
  "Cancelled",
];

const FILTERS = ["All", ...TODO_STATUSES];

const statusStyles = {
  Pending: {
    card: "border-slate-200 bg-white",
    badge: "bg-slate-100 text-slate-700 ring-slate-200",
    active: "bg-slate-900 text-white ring-slate-900",
  },
  "In Progress": {
    card: "border-blue-100 bg-blue-50/45",
    badge: "bg-blue-100 text-blue-700 ring-blue-200",
    active: "bg-blue-600 text-white ring-blue-600",
  },
  "On Hold": {
    card: "border-amber-100 bg-amber-50/45",
    badge: "bg-amber-100 text-amber-700 ring-amber-200",
    active: "bg-amber-500 text-white ring-amber-500",
  },
  Completed: {
    card: "border-emerald-100 bg-emerald-50/45",
    badge: "bg-emerald-100 text-emerald-700 ring-emerald-200",
    active: "bg-emerald-600 text-white ring-emerald-600",
  },
  Cancelled: {
    card: "border-red-100 bg-red-50/45",
    badge: "bg-red-100 text-red-700 ring-red-200",
    active: "bg-red-600 text-white ring-red-600",
  },
};

const getTodoId = (todo) => todo?._id || todo?.id;
const getTodoText = (todo) => todo?.text || todo?.todo || todo?.title || "";

const Todo = () => {
  const navigate = useNavigate();

  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const userName = user?.name || user?.userName || user?.fullName || "User";

  const logoutAndRedirect = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  }, [navigate]);

  useEffect(() => {
    if (!token) {
      logoutAndRedirect();
    }
  }, [token, logoutAndRedirect]);

  const headers = useMemo(
    () => ({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }),
    [token],
  );

  const handleUnauthorized = (response) => {
    if (response.status === 401 || response.status === 403) {
      logoutAndRedirect();
      return true;
    }

    return false;
  };

  const fetchTodos = useCallback(async () => {
    if (!token) return;

    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL, { headers });

      if (handleUnauthorized(response)) return;

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to load todos");
      }

      setTodos(Array.isArray(data) ? data : data?.todos || []);
    } catch (fetchError) {
      console.error("Todo fetch error:", fetchError);
      setError(fetchError.message || "Failed to load todos");
    } finally {
      setLoading(false);
    }
  }, [token, headers]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const stats = useMemo(() => {
    return TODO_STATUSES.reduce(
      (result, status) => ({
        ...result,
        [status]: todos.filter((todo) => todo.status === status).length,
      }),
      { All: todos.length },
    );
  }, [todos]);

  const filteredTodos = useMemo(() => {
    if (filter === "All") return todos;
    return todos.filter((todo) => todo.status === filter);
  }, [todos, filter]);

  const addTodo = async (event) => {
    event.preventDefault();

    if (!token) {
      logoutAndRedirect();
      return;
    }

    const trimmedText = text.trim();

    if (!trimmedText) {
      setError("Please write todo text.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const response = await fetch(API_URL, {
        method: "POST",
        headers,
        body: JSON.stringify({
          text: trimmedText,
          status: "Pending",
        }),
      });

      if (handleUnauthorized(response)) return;

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to add todo");
      }

      setText("");

      const createdTodo = data?.todo || data;
      setTodos((currentTodos) => [createdTodo, ...currentTodos]);
    } catch (addError) {
      console.error("Todo add error:", addError);
      setError(addError.message || "Failed to add todo");
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (todo) => {
    setEditId(getTodoId(todo));
    setEditText(getTodoText(todo));
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditText("");
  };

  const updateTodoText = async (todo) => {
    if (!token) {
      logoutAndRedirect();
      return;
    }

    const todoId = getTodoId(todo);
    const trimmedText = editText.trim();

    if (!trimmedText) {
      setError("Todo text cannot be empty.");
      return;
    }

    try {
      setUpdatingId(todoId);
      setError("");

      const response = await fetch(`${API_URL}/${todoId}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({
          text: trimmedText,
          status: todo.status || "Pending",
        }),
      });

      if (handleUnauthorized(response)) return;

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to update todo");
      }

      const updatedTodo = data?.todo || {
        ...todo,
        text: trimmedText,
      };

      setTodos((currentTodos) =>
        currentTodos.map((item) =>
          getTodoId(item) === todoId ? updatedTodo : item,
        ),
      );

      cancelEdit();
    } catch (updateError) {
      console.error("Todo update error:", updateError);
      setError(updateError.message || "Failed to update todo");
    } finally {
      setUpdatingId(null);
    }
  };

  const changeStatus = async (todo, nextStatus) => {
    if (!token) {
      logoutAndRedirect();
      return;
    }

    const todoId = getTodoId(todo);
    const previousTodos = todos;

    if (todo.status === nextStatus) return;

    setTodos((currentTodos) =>
      currentTodos.map((item) =>
        getTodoId(item) === todoId ? { ...item, status: nextStatus } : item,
      ),
    );

    try {
      setUpdatingId(todoId);
      setError("");

      const response = await fetch(`${API_URL}/${todoId}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({
          status: nextStatus,
        }),
      });

      if (handleUnauthorized(response)) return;

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to change status");
      }

      const updatedTodo = data?.todo;

      if (updatedTodo) {
        setTodos((currentTodos) =>
          currentTodos.map((item) =>
            getTodoId(item) === todoId ? updatedTodo : item,
          ),
        );
      }
    } catch (statusError) {
      console.error("Todo status error:", statusError);
      setTodos(previousTodos);
      setError(statusError.message || "Failed to change status");
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteTodo = async (todo) => {
    if (!token) {
      logoutAndRedirect();
      return;
    }

    const todoId = getTodoId(todo);
    const confirmDelete = window.confirm("Delete this todo?");

    if (!confirmDelete) return;

    try {
      setDeletingId(todoId);
      setError("");

      const response = await fetch(`${API_URL}/${todoId}`, {
        method: "DELETE",
        headers,
      });

      if (handleUnauthorized(response)) return;

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to delete todo");
      }

      setTodos((currentTodos) =>
        currentTodos.filter((item) => getTodoId(item) !== todoId),
      );

      if (editId === todoId) {
        cancelEdit();
      }
    } catch (deleteError) {
      console.error("Todo delete error:", deleteError);
      setError(deleteError.message || "Failed to delete todo");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="mb-5 overflow-hidden rounded-3xl bg-linear-to-r from-slate-950 via-indigo-800 to-pink-600 p-5 text-white shadow-xl shadow-indigo-100 sm:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-black uppercase tracking-wide ring-1 ring-white/20">
                Personal Task Board
              </p>
              <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                ToDo
              </h1>
              <p className="mt-2 max-w-2xl text-sm font-semibold text-white/80">
                Add tasks, update status quickly, and see only your own
                logged-in todos.
              </p>
            </div>

            <div className="rounded-2xl bg-white/15 px-4 py-3 ring-1 ring-white/20">
              <p className="mt-1 max-w-60 truncate text-base font-black">
                {userName}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-5 rounded-3xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
          <form onSubmit={addTodo} className="grid gap-3 md:grid-cols-[1fr_auto]">
            <input
              type="text"
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Write todo..."
              className="min-h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-900 outline-none transition focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-100"
            />

            <button
              type="submit"
              disabled={saving}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-pink-600 px-6 py-3 text-sm font-black text-white shadow-lg shadow-pink-100 transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? <FaSpinner className="animate-spin" /> : <FaPlus />}
              Add Todo
            </button>
          </form>

          {error && (
            <div className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700 ring-1 ring-red-100">
              {error}
            </div>
          )}
        </section>

        <section className="mb-5 rounded-3xl border border-slate-100 bg-white p-3 shadow-sm sm:p-4">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {FILTERS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-black transition sm:text-sm ${
                  filter === item
                    ? "bg-slate-950 text-white"
                    : "bg-slate-50 text-slate-700 ring-1 ring-slate-100 hover:bg-slate-100"
                }`}
              >
                {item}
                <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5">
                  {stats[item] || 0}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          {loading ? (
            <div className="rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-100">
              <FaSpinner className="mx-auto mb-3 animate-spin text-2xl text-pink-600" />
              <p className="text-sm font-black text-slate-500">
                Loading todos...
              </p>
            </div>
          ) : filteredTodos.length === 0 ? (
            <div className="rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-100">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-50 text-pink-600">
                <FaCheck />
              </div>
              <h2 className="text-lg font-black text-slate-900">
                No todos found
              </h2>
              <p className="mt-1 text-sm font-semibold text-slate-500">
                Add a todo above or change the filter.
              </p>
            </div>
          ) : (
            filteredTodos.map((todo) => {
              const todoId = getTodoId(todo);
              const todoText = getTodoText(todo);
              const todoStatus = todo.status || "Pending";
              const currentStyle =
                statusStyles[todoStatus] || statusStyles.Pending;
              const isEditing = editId === todoId;
              const isBusy = updatingId === todoId || deletingId === todoId;

              return (
                <article
                  key={todoId}
                  className={`rounded-3xl border p-4 shadow-sm transition ${currentStyle.card}`}
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-black ring-1 ${currentStyle.badge}`}
                        >
                          {todoStatus}
                        </span>

                        {isBusy && (
                          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-black text-slate-500 ring-1 ring-slate-100">
                            <FaSpinner className="animate-spin" />
                            Updating
                          </span>
                        )}
                      </div>

                      {isEditing ? (
                        <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
                          <input
                            value={editText}
                            onChange={(event) =>
                              setEditText(event.target.value)
                            }
                            className="min-h-11 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-900 outline-none transition focus:border-pink-400 focus:ring-4 focus:ring-pink-100"
                          />

                          <button
                            type="button"
                            onClick={() => updateTodoText(todo)}
                            disabled={updatingId === todoId}
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-black text-white transition hover:bg-emerald-700 disabled:opacity-60"
                          >
                            {updatingId === todoId ? (
                              <FaSpinner className="animate-spin" />
                            ) : (
                              <FaSave />
                            )}
                            Save
                          </button>

                          <button
                            type="button"
                            onClick={cancelEdit}
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-200"
                          >
                            <FaTimes />
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <p
                          className={`wrap-break-word text-base font-black leading-7 sm:text-lg ${
                            todoStatus === "Completed"
                              ? "text-slate-500 line-through"
                              : "text-slate-900"
                          }`}
                        >
                          {todoText}
                        </p>
                      )}
                    </div>

                    {!isEditing && (
                      <div className="flex shrink-0 gap-2">
                        <button
                          type="button"
                          onClick={() => startEdit(todo)}
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-blue-50 px-4 py-2.5 text-sm font-black text-blue-700 transition hover:bg-blue-100 lg:flex-none"
                        >
                          <FaEdit />
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteTodo(todo)}
                          disabled={deletingId === todoId}
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-red-50 px-4 py-2.5 text-sm font-black text-red-700 transition hover:bg-red-100 disabled:opacity-60 lg:flex-none"
                        >
                          {deletingId === todoId ? (
                            <FaSpinner className="animate-spin" />
                          ) : (
                            <FaTrash />
                          )}
                          Delete
                        </button>
                      </div>
                    )}
                  </div>

                  {!isEditing && (
                    <div className="mt-4 border-t border-slate-100 pt-4">
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <p className="text-xs font-black uppercase tracking-wide text-slate-400">
                          Change Status
                        </p>

                        <button
                          type="button"
                          onClick={fetchTodos}
                          className="inline-flex items-center gap-1 text-xs font-black text-slate-400 transition hover:text-slate-700"
                        >
                          <FaRedo />
                          Refresh
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-5">
                        {TODO_STATUSES.map((statusItem) => {
                          const isActive = todoStatus === statusItem;

                          return (
                            <button
                              key={statusItem}
                              type="button"
                              onClick={() => changeStatus(todo, statusItem)}
                              disabled={isBusy || isActive}
                              className={`rounded-2xl px-3 py-2.5 text-xs font-black ring-1 transition ${
                                isActive
                                  ? statusStyles[statusItem].active
                                  : "bg-white text-slate-600 ring-slate-100 hover:bg-slate-50"
                              } disabled:cursor-not-allowed disabled:opacity-80`}
                            >
                              {statusItem}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </article>
              );
            })
          )}
        </section>
      </div>
    </main>
  );
};

export default Todo;