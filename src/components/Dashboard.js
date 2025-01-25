import { useState, useEffect } from 'react';
import TaskForm from './tasks/TaskForm';
import TaskColumn from './tasks/TaskColumn';
import { tasks as tasksApi } from '../services/api';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  const countTasks = () => {
    return tasks.length;
  }
  useEffect(() => {
    console.log("Task count : " + countTasks());
  }, [tasks]);
  const loadTasks = async () => {
    try {
      setIsLoading(true);
      const response = await tasksApi.getAll();
      console.log('API Response:', response); // Debug API response
      if (response.data) {
        setTasks(response.data);
        console.log('Tasks loaded:', response.data);
      } else {
        console.error('No data in response');
      }
    } catch (err) {
      console.error('Failed to load tasks:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTask = async (newTask) => {
    try {
      const response = await tasksApi.create(newTask);
      console.log('New task created:', response.data);
      await loadTasks();
    } catch (err) {
      console.error('Failed to create task:', err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await tasksApi.delete(taskId);
      setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  const handleDrop = async (taskId, newStatus) => {
    try {
      console.log('Current tasks state:', tasks);
      console.log('TaskID received:', taskId);
      console.log('New Status:', newStatus);
      
      if (!taskId) {
        console.error('Task ID is undefined or null');
        return;
      }

      const task = tasks.find(t => t._id === taskId);
      if (!task) {
        console.error('Task not found with ID:', taskId);
        console.log('Available task IDs:', tasks.map(t => t._id));
        return;
      }

      console.log('Found task:', task);
      const updatedTask = { ...task, status: newStatus };
      const response = await tasksApi.update(taskId, updatedTask);
      console.log('Updated task : ', response.data);
      setTasks(prevTasks => prevTasks.map(t => t._id === taskId ? response.data : t));
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  };

  const filterTasks = (status) => tasks.filter(task => task.status === status);

  if (isLoading) {
    return <div className="text-center mt-5">Loading tasks...</div>;
  }

  return (
    <div className="container">
      <TaskForm onAddTask={handleAddTask} />
      <div className="mt-3">
        <p>Total tasks: {tasks.length}</p>
      </div>
      <div className="row mt-4">
        <TaskColumn
          title="Pending"
          status="pending"
          tasks={filterTasks('pending')}
          onDrop={handleDrop}
          onDeleteTask={handleDeleteTask}
        />
        <TaskColumn
          title="Completed"
          status="completed"
          tasks={filterTasks('completed')}
          onDrop={handleDrop}
          onDeleteTask={handleDeleteTask}
        />
        <TaskColumn
          title="Done"
          status="done"
          tasks={filterTasks('done')}
          onDrop={handleDrop}
          onDeleteTask={handleDeleteTask}
        />
      </div>
    </div>
  );
}

export default Dashboard; 