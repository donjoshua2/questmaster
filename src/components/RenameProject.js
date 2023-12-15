import React, { useContext, useState } from 'react';
import ProjectForm from './ProjectForm';
import { TodoContext } from '../context';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { firestore } from '../firebase';

function RenameProject({ project, setShowModal }) {
  // STATE
  const [newProjectName, setNewProjectName] = useState(project.name);

  // CONTEXT
  const { selectedProject, setSelectedProject } = useContext(TodoContext);

  // Rename Project
  const renameProject = async (project, newProjectName) => {
    try {
      const projectsRef = collection(firestore, 'projects');
      const todosRef = collection(firestore, 'todos');

      const { name: oldProjectName } = project;

      // Check if the new project name already exists
      const duplicateQuery = query(projectsRef, where('name', '==', newProjectName));
      const duplicateSnapshot = await getDocs(duplicateQuery);

      if (!duplicateSnapshot.empty) {
        alert('Project with the same name already exists!');
        return;
      }

      // Update project name
      await updateDoc(doc(projectsRef, project.id), {
        name: newProjectName,
      });

      // Update associated todos
      const todosQuery = query(todosRef, where('projectName', '==', oldProjectName));
      const todosSnapshot = await getDocs(todosQuery);

      todosSnapshot.forEach((doc) => {
        updateDoc(doc.ref, {
          projectName: newProjectName,
        });
      });

      // Update selected project if needed
      if (selectedProject === oldProjectName) {
        setSelectedProject(newProjectName);
      }
    } catch (error) {
      console.error('Error renaming project:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    renameProject(project, newProjectName);
    setShowModal(false);
  };

  return (
    <div className='RenameProject'>
      <ProjectForm
        handleSubmit={handleSubmit}
        heading='Edit project name!'
        value={newProjectName}
        setValue={setNewProjectName}
        setShowModal={setShowModal}
        confirmButtonText='Confirm'
      />
    </div>
  );
}

export default RenameProject;
