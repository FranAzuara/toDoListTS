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
      console.log(e.target.value);
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
    <div className="min-h-screen flex flex-col items-center justify-start py-10 px-4">
      <div className="w-full max-w-xl">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 p-6 items-center text-center"
        >
          <h1 className="mb-5 text-2xl font-bold">LISTA DE TAREAS</h1>
          <div className="flex items-center justify-center flex-col gap-2 mb-4 w-full">
            <label htmlFor="title">Titulo</label>
            <input
              className="border p-2 rounded border-white w-full"
              placeholder="Titulo de la tarea"
              id="title"
              type="text"
              value={text}
              onChange={handleInputChange}
            />
            <span className="text-red-500 text-sm mt-1">{nameError}</span>
          </div>
          <div className="flex items-center justify-center flex-col gap-2 w-full">
            <label htmlFor="description">Descripción</label>
            <input
              className="border p-2 rounded border-white w-full"
              placeholder="Descripción de la tarea"
              id="description"
              type="text"
              value={description}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <button
              className="text-white bg-blue-600 hover:bg-blue-700 p-2 rounded mt-4"
              type="submit"
            >
              Crear
            </button>
          </div>
        </form>
      </div>
      <div className="w-full max-w-xl mt-6">
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
