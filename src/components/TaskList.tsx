import { useState } from "react";

type Task = {
  id: number;
  text: string;
  description?: string;
  completed: boolean;
};

type TaskListProps = {
  tasks: Task[];
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string, newDescription: string) => void;
  onToggleComplete: (id: number) => void;
};

export const TaskList = ({
  tasks,
  onDelete,
  onEdit,
  onToggleComplete,
}: TaskListProps) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");
  const [editDescription, setEditDescription] = useState<string>("");

  const startEditing = (task: Task) => {
    setEditingId(task.id);
    setEditText(task.text);
    setEditDescription(task.description || "");
  };

  const saveEdit = () => {
    if (editingId !== null) {
      onEdit(editingId, editText.trim(), editDescription.trim());
      setEditingId(null);
      setEditText("");
      setEditDescription("");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
    setEditDescription("");
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <h2 className="text-2xl font-bold text-blue-600 tracking-wide mb-6 border-b pb-2 w-full text-center">
        Lista de Tareas
      </h2>
      <ul className="w-full max-w-xl space-y-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="bg-white rounded-xl shadow flex flex-col gap-2 p-4"
          >
            {editingId === task.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="border border-gray-300 rounded text-black px-3 py-2 w-full"
                />
                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="border border-gray-300 rounded text-black px-3 py-2 w-full"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={saveEdit}
                    className="text-green-600 hover:underline"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="text-wihte-600 hover:underline"
                  >
                    Cancelar
                  </button>
                </div>
              </>
            ) : (
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggleComplete(task.id)}
                    className="mt-1 accent-blue-600"
                  />
                  <div>
                    <p
                      className={`font-semibold ${task.completed ? "line-through text-gray-400" : "text-gray-800"}`}
                    >
                      {task.text}
                    </p>
                    {task.description && (
                      <p className="text-sm text-gray-500">
                        {task.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-3 text-xl text-gray-500">
                  <button
                    onClick={() => startEditing(task)}
                    className="hover:text-blue-600"
                  >
                    <i className="fa-regular fa-pen-to-square"></i>
                  </button>
                  <button
                    onClick={() => onDelete(task.id)}
                    className="hover:text-red-600"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
