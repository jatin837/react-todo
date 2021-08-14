import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import React, {useState} from "react";
import { nanoid } from "nanoid";

const App = (props) => {

	const [taskList, setTaskList] = useState(props.tasks);

	/*
	 * PROP CALLBACK
	 toggleTaskCompleted takes an id of task and 
	 toggles it's complete property and set the state to the new task list
	 */

	const toggleTaskCompleted = (id) => {
		const updatedTasks = taskList.map( (task) => {
			if (id === task.id){
				console.log({...task, completed: !task.completed});
				return {...task, completed: !task.completed};
			}
			return task;
		});
		setTaskList(updatedTasks);
	}

	/*
	 * PROP CALLBACK
	 deleteTask takes ID of 'to be deleted' task, filter out tasks which does not have this ID
	 and update the taskList
	 */
	const deleteTask = (id) => {
		const newTaskList = taskList.filter( 
			(task) => id !== task.id 
		);
		setTaskList(newTaskList);
	};

	const renderTaskList = (taskList) => taskList.map(
		(task) => <Todo 
			id={task.id} 
			name={task.name} 
			completed={task.completed} 
			toggleTaskCompleted={toggleTaskCompleted}
			deleteTask={deleteTask}
			editTask={editTask}
			key={task.id} 
		/>
	);

	const addTask = (name) => {
		const newTask = {
			id:  "todo-" + nanoid(),
			name: name,
			completed: false
		};
		setTaskList([...taskList, newTask]);
	};

	const editTask = (id, newName) => {
		const editedTaskList = taskList.map(
			(task) => {
				if (task.id === id)
					return {...task, name:newName};
				else 
					return task;
			}
		)
		setTaskList(editedTaskList);
	}

  return (
    <div className="todoapp stack-large">
      <h1>Todo</h1>

			<Form addTask={addTask}/>

      <div className="filters btn-group stack-exception">
				<FilterButton name="All" ariaStatus={true} />
				<FilterButton name="Active" ariaStatus={false} />
				<FilterButton name="Completed" ariaStatus={false} />
			</div>

      <h2 id="list-heading">
				{taskList.length} tasks remaining
      </h2>

      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
				{renderTaskList(taskList)}
      </ul>
    </div>
  );
}

export default App;
