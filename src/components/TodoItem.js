// src/components/TodoItem.js
import React from 'react';
import axios from 'axios';

const TodoItem = ({ todo, onDelete }) => {
  const handleDelete = async () => {
    await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/todos/${todo.id}/`);
    onDelete(todo.id);
  };

  return (
    <div>
      <input type="checkbox" checked={todo.completed} readOnly />
      <span>{todo.title}</span>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TodoItem;
