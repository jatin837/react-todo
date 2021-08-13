import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import React, {useState} from "react";
import { nanoid } from "nanoid";

function App(props) {

	const initialTaskList = props.tasks.map(task => 
		(<Todo name={task.name} completed={task.completed} id={task.id} key={task.id}/>)
	);

	const [taskList, setTaskList] = useState(initialTaskList)

	const addTask = (name) => {
		const newTask = <Todo
			id = { "todo---" + nanoid() }
			name = {name}
			completed = {false}
		/>
		setTaskList([...taskList, newTask]);
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
				{taskList}
      </ul>
    </div>
  );
}

export default App
