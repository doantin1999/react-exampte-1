import logo from './logo.svg';
import React, { useState } from 'react';
import TaskList from './component/tast';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <TaskList />
    </div>
  );
};

export default App;
