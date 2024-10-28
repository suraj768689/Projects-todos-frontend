import React, { useState, useEffect } from 'react';
import api from '../service/apiService';
import { Link, useNavigate } from 'react-router-dom';
import './ProjectStyles.css';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newProject, setNewProject] = useState({ title: '' });
  const navigate = useNavigate();

  useEffect(() => {
    api.getProjects().then(setProjects).catch(console.error);
  }, []);

  const handleAddProject = async () => {
    await api.createProject(newProject);
    setShowForm(false);
    setNewProject({ title: '' });
    setProjects(await api.getProjects());
  };

  return (
    <div className="project-list">
      <h1>Projects</h1>
      <ul>
        {projects.map(project => (
          <li key={project.id} className="project-item" style={{ listStyleType: 'none', textAlign:'left', marginRight:'30px'}}>
            <Link to={`/projects/${project.id}`} style={{ textDecoration: 'none'}}>{project.title}</Link>
          </li>
        ))}
      </ul>
      <button onClick={() => setShowForm(true)} className="add-project-button">Add New Project</button>
      {showForm && (
        <div className="form-overlay">
          <form className="form-container">
            <h2>Add New Project</h2>
            <input
              type="text"
              placeholder="Project Title"
              value={newProject.title}
              onChange={e => setNewProject({ title: e.target.value })}
            />
            <button type="button" onClick={handleAddProject}>Add Project</button>
            <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
