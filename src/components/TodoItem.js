import React from 'react';
import { Link } from 'react-router-dom';
import './TodoItem.css'; // Assuming you have a CSS file for styling

const TodoItem = ({ todo, onStatusChange }) => {
    return (
        <li className="todo-item">
            <input
                type="checkbox"
                checked={todo.status} // Bind the checked state to the todo's status
                onChange={() => onStatusChange(todo.id, todo.status)} // Call onStatusChange when checkbox is clicked
            />
            <span>{todo.description}</span>
            <Link to={`/todos/${todo.id}/edit`}>
                <button>Edit</button>
            </Link>
        </li>
    );
};

export default TodoItem;
