// src/pages/edit.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import "../styles/globals.css";

const EditTodo = () => {
  const router = useRouter();
  const { id } = router.query;
  const [title, setTitle] = useState('');

  useEffect(() => {
    const fetchTodo = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/todos/${id}/`);
      setTitle(response.data.title);
    };
    if (id) {
      fetchTodo();
    }
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/todos/${id}/`, { title });
    router.push('/');
  };

  return (
    <div>
      <h1>Edit Todo</h1>
      <form onSubmit={handleUpdate}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditTodo;
