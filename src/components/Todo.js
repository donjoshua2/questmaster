import React, { useContext, useState } from 'react';
import { ArrowClockwise, CheckCircleFill, Circle, Trash } from 'react-bootstrap-icons';
import { doc, deleteDoc } from 'firebase/firestore';
import { firestore } from '../firebase';
import { TodoContext } from '../context';

function Todo({ todo }) {
  const [hover, setHover] = useState(false);
  const { selectedTodo, setSelectedTodo } = useContext(TodoContext);

  const handleDelete = async (todo) => {
    await deleteTodo(todo);

    if (selectedTodo && selectedTodo.id === todo.id) {
      setSelectedTodo(undefined);
    }
  };

  const deleteTodo = async (todo) => {
    try {
      await deleteDoc(doc(firestore, 'todos', todo.id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className='Todo'>
      <div
        className='todo-container'
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className='check-todo'>
          {todo.checked ? (
            <span className='checked'>
              <CheckCircleFill color='#bebebe' />
            </span>
          ) : (
            <span className='unchecked'>
              <Circle color={todo.color} />
            </span>
          )}
        </div>
        <div
          className='text'
          onClick={() => setSelectedTodo(todo)}
        >
          <p style={{ color: todo.checked ? '#bebebe' : '#000000' }}>{todo.text}</p>
          <span>
            {todo.time} - {todo.projectName}
          </span>
          <div className={`line ${todo.checked ? 'line-through' : ''}`}></div>
        </div>
        <div className='add-to-next-day'>
          {todo.checked && (
            <span>
              <ArrowClockwise />
            </span>
          )}
        </div>
        <div className='delete-todo' onClick={() => handleDelete(todo)}>
          {(hover || todo.checked) && (
            <span>
              <Trash />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Todo;