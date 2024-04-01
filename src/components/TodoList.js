import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';


function TodoList() {
  // State to manage todo items
  const [todos, setTodos] = useState([]);

  // Load todos from local storage when the component mounts
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  // Save todos to local storage whenever todos state changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Function to add a new todo item
  const addTodo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];
    setTodos(newTodos);
  };

  // Function to update a todo item
  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  // Function to remove a todo item
  const removeTodo = id => {
    const removedArr = [...todos].filter(todo => todo.id !== id);
    setTodos(removedArr);
  };

  // Function to mark a todo item as complete
  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  // Render the TodoList component
  return (
    <>
      <h1>What's on the agenda for today?</h1>
      {/* Render the TodoForm component for adding new todos */}
      <TodoForm onSubmit={addTodo} />
      {/* Render the Todo component to display todo items */}
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;
