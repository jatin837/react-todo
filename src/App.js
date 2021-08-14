import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import React, {useState} from "react";
import { nanoid } from "nanoid";

const FILTER_MAP = {
	All: (task) => true,
	Active: (task) => !task.completed,
	Completed: (task) => task.completed
}

const FILTER_NAMES = Object.keys(FILTER_MAP);

const App = (props) => {
	const [tasks, setTasks] = useState(props.tasks);
	const [filter, setFilter] = useState('All');
	const filterList = FILTER_NAMES.map(
		(name) => <FilterButton 
			key = {name} 
			name = {name}
			isPressed = {name === filter}
			setFilter = {setFilter}
		/>
	);

	/*
	 * PROP CALLBACK
	 toggleTaskCompleted takes an id of task and 
	 toggles it's complete property and set the state to the new task list
	 */

	const toggleTaskCompleted = (id) => {
		const updatedTasks = tasks.map( (task) => {
			if (id === task.id){
				console.log({...task, completed: !task.completed});
				return {...task, completed: !task.completed};
			}
			return task;
		});
		setTasks(updatedTasks);
	}

	/*
	 * PROP CALLBACK
	 deleteTask takes ID of 'to be deleted' task, filter out tasks which does not have this ID
	 and update the taskList
	 */
	const deleteTask = (id) => {
		const newTaskList = tasks.filter( 
			(task) => id !== task.id 
		);
		setTasks(newTaskList);
	};

	const addTask = (name) => {
		const newTask = {
			id:  "todo-" + nanoid(),
			name: name,
			completed: false
		};
		setTasks([...tasks, newTask]);
	};


	const editTask = (id, newName) => {
		const editedTaskList = tasks.map(
			(task) => {
				if (task.id === id)
					return {...task, name:newName};
				else 
					return task;
			}
		)
		setTasks(editedTaskList);
	}

	const taskList = tasks
	.filter(FILTER_MAP[filter])
	.map(task => (
		  <Todo
		    id={task.id}
		    name={task.name}
		    completed={task.completed}
		    key={task.id}
		    toggleTaskCompleted={toggleTaskCompleted}
		    deleteTask={deleteTask}
		    editTask={editTask}
		  />
	));

  return (
    <div className="todoapp stack-large">
      <h1>Todo</h1>

			<Form addTask={addTask}/>

      <div className="filters btn-group stack-exception">
				{filterList}
			</div>

      <h2 id="list-heading">
				{tasks.length} tasks remaining
      </h2>

      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
				{taskList}
      </ul>
    </div>
  );
}

export default App;
