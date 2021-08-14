import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import React, {useState} from "react";
import { nanoid } from "nanoid";

function App(props) {

	const [taskList, setTaskList] = useState(props.tasks);

	function toggleTaskCompleted(id) {
		const updatedTasks = taskList.map( (task) => {
			if (id === task.id){
				console.log({...task, completed: !task.completed});
				return {...task, completed: !task.completed};
			}
			return task;
		});
		setTaskList(updatedTasks);
	}

	const renderTaskList = (taskList) => taskList.map(
		(task) => <Todo 
			id={task.id} 
			name={task.name} 
			completed={task.completed} 
			toggleTaskCompleted={toggleTaskCompleted}
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
