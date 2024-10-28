import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProjectList from './components/ProjectList';
import ProjectDetails from './components/ProjectDetails';
import EditTodo from './components/EditTodo';

import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" exact element={<ProjectList/>} />
          <Route path="/projects/:id" element={<ProjectDetails/>} />
          <Route path="/todos/:id/edit" element={<EditTodo/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
