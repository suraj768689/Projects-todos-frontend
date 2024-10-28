import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TodoItem from './TodoItem';
import api from '../service/apiService';
import './ProjectStyles.css';

const ProjectDetails = () => {
  const { id } = useParams(); // Use useParams hook to get the project ID
  const [project, setProject] = useState(null);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddTodoForm, setShowAddTodoForm] = useState(false); // State to toggle Add Todo form
  const [newTodoText, setNewTodoText] = useState(''); // State for new todo input

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.getProjectById(id); // Use id from useParams
        setProject(response);
        setTodos(response.todos);
      } catch (error) {
        console.error('Error loading project:', error);
        setError('Failed to load project. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const handleTodoStatusChange = async (todoId, currentStatus) => {
    try {
      const updatedStatus = !currentStatus; // Toggle the current status
      await api.updateTodoStatus(todoId, updatedStatus); // Update status in the backend
      // Update the local state
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === todoId ? { ...todo, status: updatedStatus } : todo
        )
      );
    } catch (error) {
      console.error('Error updating todo status:', error);
    }
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    try {
      const newTodo = { text: newTodoText, status: false }; // Structure your new todo
      await api.createTodo(id, newTodo); // Use your api service to add the todo
      setTodos((prevTodos) => [...prevTodos, newTodo]); // Update the local todos state
      setNewTodoText(''); // Clear input
      setShowAddTodoForm(false); // Hide the form after adding
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const completedTodos = todos.filter(todo => todo.status);
  const pendingTodos = todos.filter(todo => !todo.status);

  return (
    <div className="project-details">
      <h2>{project.title}</h2>
      <button className="button add-todo-button" onClick={() => setShowAddTodoForm(true)}>
        Add Todo
      </button>

      {showAddTodoForm && (
        <form onSubmit={handleAddTodo} className="todo-form">
          <input
            type="text"
            placeholder="Enter todo..."
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            required
            style={{padding:'10px 0px 10px 0px'}}
          />
          <button type="submit" style={{marginBottom:'10px'}}>Add Todo</button>
          <button type="button" onClick={() => setShowAddTodoForm(false)}>Cancel</button>
        </form>
      )}

      <h3>Summary: {completedTodos.length}/{todos.length} todos completed</h3>

      <div className="todo-section">
        <h4>Pending</h4>
        <ul className="todo-list">
          {pendingTodos.length > 0 ? (
            pendingTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onStatusChange={handleTodoStatusChange}
              />
            ))
          ) : (
            <li>No pending todos.</li>
          )}
        </ul>

        <h4>Completed</h4>
        <ul className="todo-list">
          {completedTodos.length > 0 ? (
            completedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onStatusChange={handleTodoStatusChange}
              />
            ))
          ) : (
            <li>No completed todos.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProjectDetails;
