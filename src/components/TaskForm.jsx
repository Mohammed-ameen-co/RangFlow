import React from "react";
import { useForm } from "react-hook-form";
import { useTaskContext } from "../context/TaskContext";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";


const TaskForm = () => {
  const { tasks, setTasks } = useTaskContext();
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);  // back to the previos page
  };
  const onSubmit = (data) => {
    // Automatically set requestDate as today (optional)
    const taskData = {
      ...data,
      id: uuidv4(),
      requestDate: new Date().toISOString(),
    };

    setTasks([...tasks, taskData]);
    reset();
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-2xl 
      
      w-[95vw] max-w-xs 
      sm:max-w-md sm:w-[80vw] 
      md:max-w-lg md:w-[60vw] 
      lg:max-w-xl lg:w-[40vw] 
      xl:max-w-2xl xl:w-[30vw]
      mx-auto p-4 sm:p-6 md:p-8 my-8"
    >
      <button onClick={goBack}>
        <IoChevronBack />
      </button>

      <h2 className="text-2xl font-bold  mb-6 text-center text-blue-700">
      
        Add New Task
      </h2>
      
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="taskname"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Task Name <span className="text-red-600">*</span>
          </label>
          <input
            id="taskname"
            {...register("taskname", { required: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter task name"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            {...register("description")}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter description"
          ></textarea>
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category <span className="text-red-600">*</span>
          </label>
          <select
            id="category"
            {...register("category", { required: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Select category</option>
            <option value="Todo">Todo</option>
            <option value="InProgress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="dueDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            {...register("dueDate")}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition duration-200"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;

