import React, { useEffect, useContext } from "react";
import { useLogContext } from "../context/LogContext";
import { useTaskContext as useSidebarTaskContext } from '../context/TaskContext'; 
import { AuthContext } from "../context/AuthContext";
import moment from "moment";

export default function Log() {
  const { logs, fetchLogs, loading } = useLogContext();
  const { open } = useSidebarTaskContext();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user && user.team) {
      fetchLogs();
    }
  }, [fetchLogs, user]);

  if (loading) {
    return (
      <div className={`pt-20 px-4 sm:px-6 transition-all duration-500 min-h-screen bg-gray-900 text-white
        ${open ? 'ml-64' : 'ml-20'}`}>
        <h1 className="text-4xl font-bold mb-8 border-b border-gray-700 pb-3">📜 Activity Log</h1>
        <p className="text-gray-400 text-center text-lg mt-20">Loading logs...</p>
      </div>
    );
  }

  if (!user || !user.team) {
    return (
      <div className={`pt-20 px-4 sm:px-6 transition-all duration-500 min-h-screen bg-gray-900 text-white
        ${open ? 'ml-64' : 'ml-20'}`}>
        <h1 className="text-4xl font-bold mb-8 border-b border-gray-700 pb-3">📜 Activity Log</h1>
        <p className="text-gray-400 text-center text-lg mt-20">
          You must be in a team to view the activity log.
        </p>
      </div>
    );
  }

  return (
    <div className={`pt-20 px-4 sm:px-6 transition-all duration-500 min-h-screen bg-gray-900 text-white
        ${open ? 'ml-64' : 'ml-20'}`}>
      <h1 className="text-4xl font-bold mb-8 border-b border-gray-700 pb-3">📜 Team Activity Log</h1>
      {logs.length === 0 ? (
        <p className="text-gray-400 text-center text-lg mt-20">
          No activity found for your team.
        </p>
      ) : (
        <ul className="space-y-4">
          {logs.map((log) => (
            <li
              key={log._id}
              className="bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-lg hover:bg-gray-750 transition-all flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3"
            >
              <div>
                <p className="text-gray-200">
                  <span className="font-semibold text-purple-400">{log.user?.name || 'Unknown User'}</span>
                  <span className="text-gray-300"> — {log.message}</span>
                </p>
              </div>
              <div className="text-xs text-gray-500 sm:text-right">
                {moment(log.timestamp).format("MMM Do YYYY, h:mm A")}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}