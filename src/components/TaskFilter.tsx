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
    <div className="flex justify-center gap-2">
      <button
        className={currentFilter === "all" ? "font-bold underline" : ""}
        onClick={() => onFilterChange("all")}
      >
        Todas
      </button>
      <button
        className={currentFilter === "completed" ? "font-bold underline" : ""}
        onClick={() => onFilterChange("completed")}
      >
        Completadas
      </button>
      <button
        className={currentFilter === "active" ? "font-bold underline" : ""}
        onClick={() => onFilterChange("active")}
      >
        Pendientes
      </button>
    </div>
  );
};
