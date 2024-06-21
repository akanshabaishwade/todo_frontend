import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import "../styles/globals.css";


const Home = ({ todos }) => {
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const handleAddTodo = async () => {
    if (!newTodoTitle) return;

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/todos/`, { title: newTodoTitle });
      setNewTodoTitle('');
      // Update state to show new todo without reloading the page
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/todos/${id}/`);
      // Update state to remove deleted todo without reloading the page
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (

    <div className="max-w-3xl mx-auto mt-8">
    
      <h1 className="text-3xl font-bold mb-4">Todo List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="Enter todo title"
          className="flex-1 border border-gray-300 px-4 py-2 mr-2 rounded-lg focus:outline-none"
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Add Todo
        </button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className="flex items-center justify-between border-b border-gray-300 py-2">
            <span className="text-lg">{todo.title}</span>
            <div className="flex items-center">
              <Link href={`/edit/${todo.id}`} className="text-blue-500 hover:text-blue-600 mr-2">
                Edit
              </Link>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="text-red-500 hover:text-red-600 focus:outline-none"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/todos/`);
    const todos = response.data;
    return { props: { todos } };
  } catch (error) {
    console.error('Error fetching todos:', error);
    return { props: { todos: [] } }; // Return empty todos on error
  }
}

export default Home;
