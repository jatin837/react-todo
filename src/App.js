import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

const addTask = (name) => {
	alert(name);
}

function App(props) {
	const taskList = props.tasks.map(task => 
		(<Todo name={task.name} completed={task.completed} id={task.id} key={task.id}/>)
	);

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
