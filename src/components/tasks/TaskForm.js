import { useState } from 'react';

function TaskForm({ onAddTask }) {
  const [task, setTask] = useState({
    name: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask({
      ...task,
      status: 'pending'
    });
    setTask({ name: '', description: '' });
  };

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">Add New Task</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Task Name</label>
            <input
              type="text"
              className="form-control"
              value={task.name}
              onChange={(e) => setTask({ ...task, name: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              value={task.description}
              onChange={(e) => setTask({ ...task, description: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Add Task</button>
        </form>
      </div>
    </div>
  );
}

export default TaskForm; 