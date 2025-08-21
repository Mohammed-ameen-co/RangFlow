// src/pages/CardDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import api from '../api';

const CardDetail = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await api.get(`/tasks/${id}`);
        setTask(res.data);
      } catch (error) {
        console.error("Error fetching task details:", error);
        setTask(null);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  if (loading) {
    return (
      <main className="bg-gray-100 min-h-screen pt-16 p-6 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading task details...</div>
      </main>
    );
  }
  
  if (!task) {
    return (
      <main className={`bg-gray-100 min-h-screen pt-16 p-6 flex items-center justify-center`}>
        <div className="p-8 text-center bg-white rounded-xl shadow-xl">
          <p className="text-2xl text-red-600 font-semibold mb-4">Task not found</p>
          <button
            onClick={goBack}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Go Back
          </button>
        </div>
      </main>
    );
  }

  const progressMap = {
    Todo: 0,
    InProgress: 50,
    Done: 100,
  };

  const progressPercent = progressMap[task.category] ?? 0;
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (progressPercent / 100) * circumference;

  return (
    <main
      className={`bg-gray-100 min-h-screen transition-all duration-500 ease-in-out pt-16 p-6`}
    >
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-2xl">
        <button
          onClick={goBack}
          className="text-gray-500 hover:text-purple-600 transition mb-6 flex items-center gap-2 font-semibold"
        >
          <IoChevronBack size={24} />
          Back to Board
        </button>

        {/* Header with task name and progress circle */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b pb-6 mb-6 border-gray-200">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 md:mb-0">
            {task.taskname}
          </h1>

          {/* Circular Progress */}
          <div className="relative w-28 h-28 flex-shrink-0">
            <svg
              className="transform -rotate-90"
              width="100%"
              height="100%"
              viewBox="0 0 120 120"
            >
              <circle
                stroke="#e5e7eb"
                fill="transparent"
                strokeWidth="10"
                r={radius}
                cx="60"
                cy="60"
              />
              <circle
                stroke="#8b5cf6" // Purple color
                fill="transparent"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                r={radius}
                cx="60"
                cy="60"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-purple-700">
                {progressPercent}%
              </span>
              <span className="text-sm text-slate-500 font-medium">
                Completed
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3 text-slate-800">
            Description
          </h2>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
              {task.description || "No description provided."}
            </p>
          </div>
        </section>

        {/* Details grid with new fields */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 text-slate-700 font-medium">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-slate-900 font-bold mb-1">Product</h3>
            <p>{task.product?.name || 'N/A'}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-slate-900 font-bold mb-1">Category</h3>
            <p>{task.category}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-slate-900 font-bold mb-1">Created By</h3>
            <p>{task.createdBy?.name || "N/A"}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-slate-900 font-bold mb-1">Assigned To</h3>
            <p>{task.assignedTo?.name || "Unassigned"}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-slate-900 font-bold mb-1">Due Date</h3>
            <p>
              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-slate-900 font-bold mb-1">Created On</h3>
            <p>
              {task.createdAt
                ? new Date(task.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-slate-900 font-bold mb-1">Last Updated</h3>
            <p>
              {task.updatedAt
                ? new Date(task.updatedAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </section>

        {/* Comments */}
        {task.comments && task.comments.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-5 text-slate-800">Comments</h2>
            <ul className="space-y-4 max-h-56 overflow-y-auto border border-slate-200 p-4 rounded-lg bg-gray-50">
              {task.comments.map((comment, i) => (
                <li key={i} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <p className="text-slate-800">{comment.text}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {new Date(comment.date).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
};

export default CardDetail;