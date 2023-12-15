import React, { createContext, useState } from 'react';
import { useTodos, useProjects, useProjectsWithStats } from '../hooks';
import { firestore } from '../firebase';

const TodoContext = createContext();

function TodoContextProvider({ children }){
  const defaultProject = 'today';
  const [selectedProject, setSelectedProject] = useState(defaultProject);
  const [selectedTodo, setSelectedTodo] = useState(undefined);
  const todos = useTodos();
  const projects = useProjects();
  const projectsWithStats = useProjectsWithStats(projects, todos)

  return (
    <TodoContext.Provider
      value={{
        defaultProject,
        selectedProject,
        setSelectedProject,
        todos,
        projects : projectsWithStats,
        firestore, // Add firestore instance to the context
        selectedTodo,
        setSelectedTodo
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export { TodoContextProvider, TodoContext };
