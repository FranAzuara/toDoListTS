import { useState } from "react";
import { TaskList } from "./components/TaskList";
import { TaskFilter } from "./components/TaskFilter";

type Task = {
  id: number;
  text: string;
  description: string;
  completed: boolean;
};

function App() {
  const [text, setText] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "completed" | "active">("all");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id === "title") {
      const maxLength = 50;
      if (value.length > maxLength) {
        alert(`El texto supera los ${maxLength} caracteres`);
        return;
      }
      setText(value);
    }

    if (id === "description") {
      setDescription(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;

    if (!text.trim()) {
      setNameError("Titulo es obligatorio");
      hasError = true;
    }
    if (hasError) return;

    const newTask = {
      id: Date.now(),
      text: text.trim(),
      description: description.trim(),
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);

    setText("");
    setDescription("");
    setNameError(null);
  };

  const handleToggleComplete = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-10 px-4">
      <div className="w-full max-w-xl">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4"
        >
          <h1 className="text-3xl font-bold text-center text-blue-700 mb-4">
            MiAgenda
          </h1>
          <div className="flex flex-col gap-1">
            <label htmlFor="title" className="text-sm font-medium">
              Título
            </label>
            <input
              className="border border-gray-300 rounded text-black px-3 py-2 w-full"
              placeholder="Título de la tarea"
              id="title"
              type="text"
              value={text}
              onChange={handleInputChange}
            />
            <span className="text-red-500 text-sm">{nameError}</span>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="description" className="text-sm font-medium">
              Descripción
            </label>
            <input
              className="border border-gray-300 rounded text-black px-3 py-2 w-full"
              placeholder="Descripción de la tarea"
              id="description"
              type="text"
              value={description}
              onChange={handleInputChange}
            />
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded mt-2"
            type="submit"
          >
            Añadir tarea
          </button>
        </form>
      </div>
      <div className="w-full max-w-xl mt-8">
        <TaskFilter currentFilter={filter} onFilterChange={setFilter} />
        <TaskList
          tasks={filteredTasks}
          onDelete={(id) =>
            setTasks((prev) => prev.filter((task) => task.id !== id))
          }
          onEdit={(id, newText, newDescription) =>
            setTasks((prev) =>
              prev.map((task) =>
                task.id === id
                  ? { ...task, text: newText, description: newDescription }
                  : task,
              ),
            )
          }
          onToggleComplete={handleToggleComplete}
        />
      </div>
    </div>
  );
}

export default App;
