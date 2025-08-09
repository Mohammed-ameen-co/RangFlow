import Board from "./components/Board";
import Sidebar from "./components/Sidebar";
import TaskForm from "./components/TaskForm";
import CardDetail from "./components/CardDetail";
import { TaskProvider } from "./context/TaskContext";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <TaskProvider>
        <Sidebar/>
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="/addtask" element={<TaskForm />} />
          <Route path="/task/:id" element={<CardDetail />} />
        </Routes>
      </TaskProvider>
    </BrowserRouter>
  );
}
