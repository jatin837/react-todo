import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const DUMMY_DATA = [
	{id: "todo-01", name: "Watch Rick & Morty", completed: false},
	{id: "todo-02", name: "Name a new react component", completed: true},
	{id: "todo-03", name: "Solve the differential equation", completed: true},
]

ReactDOM.render(
  <React.StrictMode>
    <App tasks={DUMMY_DATA}/>
  </React.StrictMode>,
  document.getElementById('root')
);
