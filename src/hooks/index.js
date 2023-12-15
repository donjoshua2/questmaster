import moment from 'moment';
import { useState, useEffect } from 'react';
import { onSnapshot, collection } from 'firebase/firestore';
import { firestore } from '../firebase';

export function useTodos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, 'todos'), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(data);
    });

    return () => unsubscribe();
  }, []);

  return todos;
}

export function useFilterTodos(selectedProject) {
  const todos = useTodos();
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    let data;
    const todayDateFormated = moment().format('MM/DD/YYYY');

    if (selectedProject === 'today') {
      data = todos.filter((todo) => todo.date === todayDateFormated);
    } else if (selectedProject === 'next 7 days') {
      data = todos.filter((todo) => {
        const todoDate = moment(todo.date, 'MM/DD/YYYY');
        const todayDate = moment(todayDateFormated, 'MM/DD/YYYY');

        const diffDays = todoDate.diff(todayDate, 'days');

        return diffDays >= 0 && diffDays < 7;
      });
    } else if (selectedProject === 'all days') {
      data = todos;
    } else {
      data = todos.filter((todo) => todo.projectName === selectedProject);
    }

    setFilteredTodos(data);
  }, [todos, selectedProject]);

  return filteredTodos;
}

export function useProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, 'projects'), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }));
      setProjects(data);
    });

    return () => unsubscribe();
  }, []);

  return projects;
}

export function useProjectsWithStats() {
  const projects = useProjects();
  const todos = useTodos();
  const [projectsWithStats, setProjectsWithStats] = useState([]);

  useEffect(() => {
    console.log('Projects:', projects);
    console.log('Todos:', todos);
  
    const data = projects.map((project) => ({
      numOfTodos: todos.filter((todo) => todo.projectName === project.name && !todo.checked).length,
      ...project,
    }));
  
    setProjectsWithStats(data);
  }, [projects, todos]);

  return projectsWithStats;
}