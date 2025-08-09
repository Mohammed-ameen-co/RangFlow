import { useTaskContext } from '../context/TaskContext';
import Column from './Column';
import { DndContext } from '@dnd-kit/core';

const Board = () => {
  const { tasks, setTasks, open } = useTaskContext();

  const todoTasks = tasks.filter(task => task.category === "Todo");
  const inProgressTasks = tasks.filter(task => task.category === "InProgress");
  const doneTasks = tasks.filter(task => task.category === "Done");

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id;
    const newCategory = over.id;

    //catagory change hui to udate karo
    setTasks(prev =>
      prev.map(t =>
        t.id === taskId ? { ...t, category: newCategory } : t
      )
    );
  };

  return (
    <main
      className={`pt-16 transition-all duration-500 ease-in-out
        ${open ? "ml-60" : "ml-16"}
        h-[calc(100vh-4rem)] overflow-auto p-4`}
    >
      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full max-w-full">
          <Column id="Todo" title="Todo" tasks={todoTasks} />
          <Column id="InProgress" title="In Progress" tasks={inProgressTasks} />
          <Column id="Done" title="Done" tasks={doneTasks} />
        </div>
      </DndContext>
    </main>
  );
};

export default Board;

