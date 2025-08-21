// src/components/Column.jsx

import TaskCard from '../components/TaskCard';
import { useDroppable } from '@dnd-kit/core';

const Column = ({ id, title, tasks }) => {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      className="p-4 rounded-lg shadow-md flex flex-col bg-gray-200 border-2 overflow-y-auto border-gray-300 h-full" 
    >
      <h2 className="font-bold text-xl mb-4 text-gray-800 uppercase tracking-wide">
        {title}
      </h2>
      <div className="flex flex-col gap-4 p-2 bg-white rounded-lg flex-1 overflow-y-auto">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))
        ) : (
          <p className="text-gray-500 text-sm text-center py-4">No tasks in this column.</p>
        )}
      </div>
    </div>
  );
};

export default Column;