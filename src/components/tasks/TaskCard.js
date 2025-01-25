import { useDrag } from 'react-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function TaskCard({ task, onDelete }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task._id);
    }
  };

  return (
    <div
      ref={drag}
      className={`card mb-2 ${isDragging ? 'opacity-10' : ''}`}
      style={{ cursor: 'move' }}
    >
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div>

            <h5 className="card-title">{task.name}</h5>
            <p className="card-text">{task.description}</p>
            <p>{task._id}</p>
          </div>
          <button
            className="btn btn-danger btn-sm"
            onClick={handleDelete}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard; 