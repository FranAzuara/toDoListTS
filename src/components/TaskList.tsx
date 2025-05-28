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
      <h2 className="mb-4 text-xl font-bold mb-4">Lista de Tareas</h2>
      <ul className="w-full max-w-md">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex flex-col gap-2 p-2 border-b rounded mb-2"
          >
            {editingId === task.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="border p-1 rounded w-full"
                />
                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="border p-1 rounded w-full"
                />
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={saveEdit}
                    className="text-green-600 hover:underline"
                  >
                    Guardar
                  </button>
                  <button onClick={cancelEdit}>Cancelar</button>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => onToggleComplete(task.id)}
                      className="mt-1"
                    />
                    <div>
                      <strong
                        className={
                          task.completed ? "line-through text-gray-400" : ""
                        }
                      >
                        {task.text}
                      </strong>
                      {task.description && (
                        <p className="text-sm">{task.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => startEditing(task)}
                      className="text-blue-500 hover:underline"
                    >
                      <i className="fa-regular fa-pen-to-square"></i>
                    </button>
                    <button
                      onClick={() => onDelete(task.id)}
                      className="text-red-500 hover:underline"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
