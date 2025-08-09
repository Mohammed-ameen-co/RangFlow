import TaskCard from './TaskCard';
import { useDroppable } from '@dnd-kit/core';

const Column = ({ id, title, tasks }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className=" p-4 rounded shadow min-h-[200px] flex flex-col"
    >
      <h2 className="font-bold mb-4">{title}</h2>
      <div className="flex flex-col gap-4 overflow-y-auto max-w-full">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;
