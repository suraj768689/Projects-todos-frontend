// src/service/apiService.js
import axios from 'axios';

const API_URL = 'http://localhost:8090/api'; // Update with your backend URL

const apiService = {
    // Project APIs
    getProjects: async () => {
        const response = await axios.get(`${API_URL}/projects`);
        return response.data;
    },

    createProject: async (project) => {
        const response = await axios.post(`${API_URL}/projects`, project);
        return response.data;
    },

    getProjectById: async (projectId) => {
        const response = await axios.get(`${API_URL}/projects/${projectId}`);
        return response.data;
    },

    deleteProject: async (projectId) => {
        await axios.delete(`${API_URL}/projects/${projectId}`);
    },

    // Todo APIs
    getTodosByProjectId: async (projectId) => {
        const response = await axios.get(`${API_URL}/todos/project/${projectId}`);
        return response.data;
    },

    createTodo: async (projectId, todo) => {
        const response = await axios.post(`${API_URL}/todos/project/${projectId}`, todo); // Pass the todo object here
        return response.data;
    },
    updateTodoStatus: async (todoId, status) => {
        const response = await axios.patch(`${API_URL}/todos/${todoId}/status`, null, {
            params: { status } // Send the status as a query parameter
        });
        return response.data;
    },

    getTodoById: async (todoId) => {
        const response = await axios.get(`${API_URL}/todos/${todoId}`);
        return response.data;
    },
    updateTodoDetails: async (todoId, todo) => {
        const response = await axios.put(`${API_URL}/todos/${todoId}`, todo); // Ensure the endpoint matches your backend
        return response.data;
    },
    

};

export default apiService;
