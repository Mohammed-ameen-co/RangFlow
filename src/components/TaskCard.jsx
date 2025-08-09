import { useNavigate } from "react-router-dom";
import { useDraggable } from "@dnd-kit/core";
import { useState } from "react";

const TaskCard = ({ task }) => {
  const navigate = useNavigate();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const [dragging, setDragging] = useState(false);

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onMouseDown={() => setDragging(false)}
      onMouseMove={() => setDragging(true)}
      onMouseUp={() => {
        if (!dragging) {
          navigate(`/task/${task.id}`);
        }
        setDragging(false);
      }}
      className="bg-white p-4 rounded shadow cursor-pointer hover:shadow-lg transition-shadow duration-200 max-w-full break-words"
    >
      <h3 className="font-bold text-lg mb-1 truncate">{task.taskname}</h3>
      <p className="text-gray-700 text-sm line-clamp-3">{task.description}</p>
    </div>
  );
};

export default TaskCard;

