import React, { useState, useEffect  } from 'react';
import './styles.scss';

interface Task {
  id: number;
  text: string;
  done: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  const [input, setInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (input.trim()) {
      const newTask = { id: Date.now(), text: input, done: false };
      setTasks([newTask, ...tasks]);
      setInput('');
    }
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleDoneTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="task-list">
      <h1>TO DO LIST APPLICATION</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add new task in here"
      />
      <button onClick={handleAddTask}>+</button>
      <ul>
        {currentTasks.map((task) => (
          <li key={task.id} className={task.done ? 'done' : ''}>
            <span>{task.text}</span>
            {!task.done && <button onClick={() => handleDoneTask(task.id)}>✓</button>}
            <button onClick={() => handleDeleteTask(task.id)}>X</button>
          </li>
        ))}
      </ul>
      <div className="pagination">
        {[...Array(Math.ceil(tasks.length / tasksPerPage))].map((_, i) => (
          <button key={i} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskList;