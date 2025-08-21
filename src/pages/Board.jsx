// src/components/Board.jsx

import React, { useContext, useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { AuthContext } from '../context/AuthContext';
import Column from './Column';
import TaskCard from '../components/TaskCard'; 
import { DndContext, useSensors, useSensor, MouseSensor, TouchSensor, DragOverlay } from '@dnd-kit/core';

const Board = () => {
  const { tasks, updateTaskStatus } = useTaskContext();
  const { token } = useContext(AuthContext);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  );

  const pandingTasks = tasks.filter(task => task.category === "Panding");
  const todoTasks = tasks.filter(task => task.category === "Todo");
  const inProgressTasks = tasks.filter(task => task.category === "InProgress");
  const doneTasks = tasks.filter(task => task.category === "Done");

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id && active.data.current.category !== over.id) {
      updateTaskStatus(active.id, over.id);
    }
    setActiveId(null);
  };

  const activeTask = tasks.find(task => task._id === activeId);

  return (
    <main
      className={`
        transition-all duration-500 ease-in-out bg-gray-100 rounded-xl
        mt-5 pt-5
        p-4 md:p-6
        h-[calc(100vh-4rem)]
        overflow-y-auto
      `}
    >
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 h-full max-w-full">
          <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col">
            <Column id="Panding" title="Panding" tasks={pandingTasks} />
          </div>
          <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col">
            <Column id="Todo" title="Todo" tasks={todoTasks} />
          </div>
          <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col">
            <Column id="InProgress" title="In Progress" tasks={inProgressTasks} />
          </div>
          <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col">
            <Column id="Done" title="Done" tasks={doneTasks} />
          </div>
        </div>
        
        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
    </main>
  );
};

export default Board;