type Filter = "all" | "completed" | "active";

type TaskFilterProps = {
  currentFilter: Filter;
  onFilterChange: (filter: Filter) => void;
};

export const TaskFilter = ({
  currentFilter,
  onFilterChange,
}: TaskFilterProps) => {
  return (
    <div className="flex justify-center gap-3 mt-4">
      <button
        onClick={() => onFilterChange("all")}
        className={`px-4 py-2 rounded-full transition-colors duration-200 text-sm font-medium shadow border" ${
          currentFilter === "all"
            ? "bg-blue-600 text-white border-transparent"
            : "bg-white text-blue-600 border-blue-600 hover:bg-blue-50"
        }`}
      >
        Todas
      </button>
      <button
        onClick={() => onFilterChange("completed")}
        className={`px-4 py-2 rounded-full transition-colors duration-200 text-sm font-medium shadow border" ${
          currentFilter === "completed"
            ? "bg-blue-600 text-white border-transparent"
            : "bg-white text-blue-600 border-blue-600 hover:bg-blue-50"
        }`}
      >
        Completadas
      </button>
      <button
        onClick={() => onFilterChange("active")}
        className={`px-4 py-2 rounded-full transition-colors duration-200 text-sm font-medium shadow border" ${
          currentFilter === "active"
            ? "bg-blue-600 text-white border-transparent"
            : "bg-white text-blue-600 border-blue-600 hover:bg-blue-50"
        }`}
      >
        Activas
      </button>
    </div>
  );
};
