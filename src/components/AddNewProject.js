import React, { useState } from 'react';
import Modal from './Modal';
import ProjectForm from './ProjectForm';
import { Plus } from 'react-bootstrap-icons';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { firestore, app } from '../firebase';

function AddNewProject() {
  // STATE
  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    if (projectName) {
      const projectsRef = collection(firestore, 'projects');
      const q = query(projectsRef, where('name', '==', projectName));

      try {
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          await addDoc(projectsRef, { name: projectName });
        } else {
          alert('Project already exists!');
        }
      } catch (error) {
        console.error('Error adding project: ', error);
      }

      setShowModal(false);
      setProjectName('');
    }
  }

  return (
    <div className='AddNewProject'>
      <div className='add-button'>
        <span onClick={() => setShowModal(true)}>
          <Plus size='20' />
        </span>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <ProjectForm
          handleSubmit={handleSubmit}
          heading='New project!'
          value={projectName}
          setValue={setProjectName}
          setShowModal={setShowModal}
          confirmButtonText='+ Add Project'
        />
      </Modal>
    </div>
  );
}

export default AddNewProject;