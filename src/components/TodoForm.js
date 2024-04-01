import React, { useState, useEffect, useRef } from 'react';

// TodoForm component for adding and updating todo items
function TodoForm(props) {
  // State to manage input value
  const [input, setInput] = useState(props.edit ? props.edit.value : '');

  // Reference to input field
  const inputRef = useRef(null);

  // Focus on input field when component mounts or updates
  useEffect(() => {
    inputRef.current.focus();
  });

  // Function to handle input change
  const handleChange = e => {
    setInput(e.target.value);
  };

  // Function to handle form submission
  const handleSubmit = e => {
    e.preventDefault();

    // Call onSubmit function with new todo object
    props.onSubmit({
      id: Math.floor(Math.random() * 10000), // Generate random id
      text: input // Todo text from input field
    });

    // Clear input field after submission
    setInput('');
  };

  // Render the TodoForm component
  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      {/* Render input field and button based on edit mode */}
      {props.edit ? (
        <>
          <input
            placeholder='Update your item'
            value={input}
            onChange={handleChange}
            name='text'
            ref={inputRef}
            className='todo-input edit'
          />
          <button onClick={handleSubmit} className='todo-button edit'>
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder='Add a todo'
            value={input}
            onChange={handleChange}
            name='text'
            className='todo-input'
            ref={inputRef}
          />
          <button onClick={handleSubmit} className='todo-button'>
            Add todo
          </button>
        </>
      )}
    </form>
  );
}


export default TodoForm;
