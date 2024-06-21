// src/pages/add.js
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import axios from 'axios';
import "../styles/globals.css";

const AddTodo = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();
    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/todos/`, { title });
    router.push('/');
  };

  return (
    <div>
      <h1>Add Todo</h1>
      <form onSubmit={handleAdd}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddTodo;
