import React, { useState } from 'react';
import './App.css';

type Priority = 'p1' | 'p2' | 'p3';

type Task = {
  id: number;
  title: string;
  isCompleted: boolean;
  priority?: Priority;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Learn React',
      isCompleted: true,
      priority: 'p1',
    },
  ]);

  const [taskName, setTaskName] = useState('');
  const [edit, setEdit] = useState(false);
  const [editInput, setEditInput] = useState<number | null>(null);
  const [status, setStatus] = useState(false);

  const onAddTask = () => {
    if (taskName.trim() === '') return;
    setTasks([
      ...tasks,
      {
        id: new Date().getTime(),
        title: taskName,
        isCompleted: false,
      },
    ]);
    setTaskName('');
  };

  const onDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEdit = (task: Task) => {
    setEdit(true);
    setTaskName(task.title);
    setEditInput(task.id);
  };

  const saveSubmit = () => {
    setEdit(false);
    setTasks(
      tasks.map((task) =>
        task.id === editInput ? { ...task, title: taskName } : task,
      ),
    );
    setTaskName('');
    setEditInput(null);
  };

  const handleToggle = () => {
    setStatus(!status);
  };

  return (
    <div className="container">
      <h1>Tasks</h1>
      <div className="input-container">
        <input
          id="task-input"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Enter task..."
        />
        {edit ? (
          <button className="btn save" onClick={saveSubmit}>
            Save
          </button>
        ) : (
          <button className="btn add" onClick={onAddTask}>
            Add
          </button>
        )}
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task">
            <span className="task-title">{task.title}</span>
            <div className="task-buttons">
              <button
                className="btn delete"
                onClick={() => onDeleteTask(task.id)}
              >
                Delete
              </button>
              <button className="btn edit" onClick={() => handleEdit(task)}>
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
