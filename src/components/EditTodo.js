import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Update this line
import api from '../service/apiService';
import './EditTodo.css'; // Add CSS file for styling

const EditTodo = () => {
    const { id } = useParams(); // Get todo ID from URL
    const navigate = useNavigate(); // Use useNavigate instead of useHistory
    const [todo, setTodo] = useState(null);
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const response = await api.getTodoById(id); // Fetch todo by ID
                setTodo(response);
                setDescription(response.description); // Set current description in state
            } catch (error) {
                console.error('Error fetching todo:', error);
                setError('Failed to load todo. Please try again later.');
            }
        };
        fetchTodo();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedTodo = { ...todo, description }; // Update the todo with new description
            const response = await api.updateTodoDetails(id, updatedTodo); // Call API to update the todo
            console.log('Update Response:', response); // Log the response
            navigate(`/projects/${todo.project.id}`); // Redirect back to the project details page
        } catch (error) {
            console.error('Error updating todo:', error);
            setError('Todo updated Successfully.');
        }
    };
    

    if (!todo) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="edit-todo">
            <h2>Edit Todo</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Description:
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} // Update description state
                        required
                    />
                </label>
                <button type="submit">Update Todo</button>
            </form>
        </div>
    );
};

export default EditTodo;
