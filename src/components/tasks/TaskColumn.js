import { useDrop } from 'react-dnd';
import TaskCard from './TaskCard';

function TaskColumn({ title, tasks, status, onDrop, onDeleteTask }) {


  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'TASK',
    drop: (item) => {
      console.log('Dropping item:', item);  // Debug log
      if (!item.id) {
        console.error('No id in dropped item:', item);
        return;
      }
      onDrop(item.id, status);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    
  }));

  return (
    <div className="col-md-4">
      <div
        ref={drop}
        className={`task-column ${isOver ? 'bg-light' : ''}`}
      >
        <h3 className="text-center mb-3">{title}</h3>
        <div className="task-list">
          {tasks.map(task => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={onDeleteTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TaskColumn; 