import { createContext, useContext, useState } from "react";
import { useEffect } from "react";

const TaskContext = createContext();
export const TaskProvider = ({children}) => {
    const [tasks, setTasks] = useState(()=>{
        const saved = localStorage.getItem("tasks");
        return saved ? JSON.parse(saved) : []
    });
    const [open, setOpen] = useState(false);
  const [isButton, setIsButton] = useState(false);

  useEffect(()=>{
    localStorage.setItem("tasks", JSON.stringify(tasks))
},[tasks])
   
    return(
        <TaskContext.Provider value={{
            tasks,
            setTasks,
            open,
            setOpen,
            isButton,
            setIsButton
            
        }}
        >
            {children}
        </TaskContext.Provider>
    )
}
export const useTaskContext = () => useContext(TaskContext);



