import { useParams } from "react-router-dom";
import { useTaskContext } from "../context/TaskContext";
import { useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";

const CardDetail = () => {

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);  // back to the previos page
  };

  const { id } = useParams();
  const { tasks, open } = useTaskContext();

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return (
      <div className="p-6 text-center text-red-700 font-semibold">
        Task not found
      </div>
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
    <div
      className={`transition-all duration-500 ease-in-out ${
        open ? "ml-60" : "ml-16"
      } overflow-auto`}
    >
      
      <div className="max-w-4xl mx-auto mt-20 p-8 bg-white rounded-xl shadow-xl space-y-10">
        {/* Header with task name and progress circle */}
        <div>
          <button onClick={goBack}>
          <IoChevronBack />
          </button>
      </div>
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-extrabold text-slate-900">
            {task.taskname}
          </h1>

          {/* Circular Progress */}
          <div className="relative w-28 h-28">
            <svg
              className="transform -rotate-90"
              width="100%"
              height="100%"
              viewBox="0 0 120 120"
            >
              <circle
                stroke="#d1d5db"
                fill="transparent"
                strokeWidth="10"
                r={radius}
                cx="60"
                cy="60"
              />
              <circle
                stroke="#2563eb"
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
              <span className="text-3xl font-bold text-blue-700">
                {progressPercent}%
              </span>
              <span className="text-sm text-slate-500 font-medium">
                Completed
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <section>
          <h2 className="text-2xl font-semibold mb-3 text-slate-800">
            Description
          </h2>
          <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
            {task.description || "No description provided."}
          </p>
        </section>

        {/* Details grid */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-slate-700 font-medium">
          <div>
            <h3 className="text-slate-900 font-semibold mb-1">Category</h3>
            <p>{task.category}</p>
          </div>

          <div>
            <h3 className="text-slate-900 font-semibold mb-1">Requested By</h3>
            <p>{task.requestedBy || "N/A"}</p>
          </div>

          <div>
            <h3 className="text-slate-900 font-semibold mb-1">Request Date</h3>
            <p>
              {task.requestDate
                ? new Date(task.requestDate).toLocaleDateString()
                : "N/A"}
            </p>
          </div>

          <div>
            <h3 className="text-slate-900 font-semibold mb-1">Due Date</h3>
            <p>
              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString()
                : "N/A"}
            </p>
          </div>

          <div>
            <h3 className="text-slate-900 font-semibold mb-1">Progress</h3>
            <p>{progressPercent}%</p>
          </div>
        </section>

        {/* Progress Bar */}
        <div>
          <div className="w-full bg-slate-300 rounded-full h-6">
            <div
              className="bg-blue-700 h-6 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Comments */}
        {task.comments && task.comments.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-5 text-slate-800">
              Comments
            </h2>
            <ul className="space-y-4 max-h-56 overflow-auto border border-slate-200 p-4 rounded-lg bg-slate-50">
              {task.comments.map((comment, i) => (
                <li key={i} className="bg-white p-4 rounded-md shadow-sm">
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
    </div>
  );
};

export default CardDetail;



