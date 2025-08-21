// src/components/TaskCard.jsx

import { useNavigate } from "react-router-dom";
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

const TaskCard = ({ task }) => {
  const navigate = useNavigate();

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task._id,
    data: { category: task.category },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const isDone = task.category === "Done";

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`p-4 rounded-lg shadow-sm border border-gray-200 cursor-pointer transition-shadow duration-200 max-w-full break-words relative hover:shadow-md
        ${isDone ? "bg-green-100 opacity-60" : "bg-white"}
        ${isDragging ? "z-50" : ""} `} 
    >
      
      <div className={`${isDone ? 'line-through' : ''}`}>
        <h3 className="font-bold text-lg mb-1 text-gray-900 truncate">
          {task.taskname}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3 mb-2">
          {task.description}
        </p>
        
        <div className="border-t border-gray-200 mt-2 pt-2">
          <p className="text-sm text-gray-500 font-medium">
            **Due Date:**{" "}
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString()
              : "No due date"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;