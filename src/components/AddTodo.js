// src/components/AddTodo.js
import React, { useState } from 'react';
import axios from 'axios';

const AddTodo = ({ onAdd }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/todos/`, { title });
    onAdd();
    setTitle('');
  };

  return (
    <div>
      <h1>Add Todo</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddTodo;
