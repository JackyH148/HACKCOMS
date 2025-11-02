import { useState } from "react";

function Scheduler() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [selectedDay, setSelectedDay] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [addDate, setAddDate] = useState(false);
  const [newYear, setNewYear] = useState("");
  const [index, setIndex] = useState(-1);

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };
  const handleYearChange = (event) => {
    setNewYear(event.target.value);
  };
  function delete_index(index) {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
    setIndex(index - 1);
  }

  const handleAddTask = () => {
    if (
      newTask.trim() !== "" &&
      taskTime.trim() !== "" &&
      selectedDay !== "" &&
      newYear !== ""
    ) {
      setIndex(index + 1);
      setTasks([
        ...tasks,
        {
          name: newTask,
          id: index,
          time: taskTime,
          date: `${selectedMonth} ${selectedDay}, ${newYear} ${taskTime}`,
        },
      ]);
      setNewTask("");
      setTaskTime("");
      setNewYear("");
      setSelectedDay("1");
      setSelectedMonth("");
    } else {
      console.log("Please input a valid task, date, and time");
    }
  };
  const handleAddDate = () => {
    setAddDate(true);
  };
  return (
    <div>
      <h2>Scheduler</h2>
      <input
        type="text"
        value={newTask}
        onChange={handleInputChange}
        placeholder="Add a task"
      />
      {!addDate && (
        <>
          <button onClick={handleAddDate}>Add Date</button>
        </>
      )}
      {addDate && (
        <>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
          >
            {Array.from({ length: 31 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={newYear}
            onChange={handleYearChange}
            placeholder="Year"
          />
        </>
      )}
      <input
        type="text"
        value={taskTime}
        onChange={(e) => setTaskTime(e.target.value)}
        placeholder="Add time"
      />
      <button onClick={handleAddTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.name}, {task.date}
            <button onClick={() => delete_index(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Scheduler;
