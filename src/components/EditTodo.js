import React, { useContext, useEffect, useState } from 'react';
import TodoForm from './TodoForm';
import { TodoContext } from '../context';
import moment from 'moment';
import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebase';


function EditTodo() {
    // STATE
    const [text, setText] = useState('');
    const [day, setDay] = useState(new Date());
    const [time, setTime] = useState('');
    const [todoProject, setTodoProject] = useState('');
  
    // CONTEXT
    const { selectedTodo, projects } = useContext(TodoContext);
  
    useEffect(() => {
      if (selectedTodo) {
        setText(selectedTodo.text);
        setDay(moment(selectedTodo.date, 'MM/DD/YYYY').toDate());
        setTime(selectedTodo.time);  // Update the time state directly with the stored time string
        setTodoProject(selectedTodo.projectName);
      }
    }, [selectedTodo]);
  
    useEffect(() => {
      const updateTodo = async () => {
        if (selectedTodo) {
          const todoDocRef = doc(firestore, 'todos', selectedTodo.id);
  
          await updateDoc(todoDocRef, {
            text,
            date: moment(day).format('MM/DD/YYYY'),
            day: moment(day).format('d'),
            time,  // Use the time directly from the state
            projectName: todoProject,
          });
        }
      };
  
      updateTodo();
    }, [text, day, time, todoProject, selectedTodo]);
  
    function handleSubmit(e) {
      // Handle form submission if needed
    }
  
    return (
      <div>
        {selectedTodo && (
          <div className='EditTodo'>
            <div className='header'>Edit Todo</div>
            <div className='container'>
              <TodoForm
                handleSubmit={handleSubmit}
                text={text}
                setText={setText}
                day={day}
                setDay={setDay}
                time={time}
                setTime={setTime}
                todoProject={todoProject}
                setTodoProject={setTodoProject}
                projects={projects}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
  
  export default EditTodo;
  