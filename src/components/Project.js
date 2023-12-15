import React, { useContext, useState } from 'react';
import { Pencil, XCircle } from 'react-bootstrap-icons';
import Modal from './Modal';
import RenameProject from './RenameProject';
import { TodoContext } from '../context';
import { doc, deleteDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase';

function Project({ project, edit }) {
  // CONTEXT
  const { defaultProject, selectedProject, setSelectedProject } = useContext(TodoContext);

  // STATE
  const [showModal, setShowModal] = useState(false);

  const deleteProject = async (project) => {
    try {
      // Delete the project
      await deleteDoc(doc(firestore, 'projects', project.id));

      // Delete associated todos
      const todosQuery = query(collection(firestore, 'todos'), where('projectName', '==', project.name));
      const todosSnapshot = await getDocs(todosQuery);

      todosSnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });

      // Set default project if the deleted project was selected
      if (selectedProject === project.name) {
        setSelectedProject(defaultProject);
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div className='Project'>
      <div className='name' onClick={() => setSelectedProject(project.name)}>
        {project.name}
      </div>
      <div className='btns'>
        {edit ? (
          <div className='edit-delete'>
            <span className='edit' onClick={() => setShowModal(true)}>
              <Pencil size='13' />
            </span>
            <span className='delete' onClick={() => deleteProject(project)}>
              <XCircle size='13' />
            </span>
          </div>
        ) : project.numOfTodos === 0 ? (
          ''
        ) : (
          <div className='total-todos'>{project.numOfTodos}</div>
        )}
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <RenameProject project={project} setShowModal={setShowModal} />
      </Modal>
    </div>
  );
}

export default Project;