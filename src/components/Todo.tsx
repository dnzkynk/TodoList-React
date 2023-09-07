import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

export const Todo = ({
  task,
  toggleComplete,
  deleteTodo,
  editTodo,
}: {
  task: any;
  toggleComplete: any;
  deleteTodo: any;
  editTodo: any;
}) => {
  useEffect(
    () => console.log("task.completed", task.completed),
    [task.completed]
  );

  return (
    <div
      className={`bg-white p-4 shadow rounded mb-4 flex justify-between items-center ${
        task.completed ? "bg-green-200" : ""
      }`}
    >
      <div className="flex items-center">
        <div className="mr-2">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleComplete(task._id)}
          />
        </div>
        <span
          className={`text-lg ${
            task.completed ? "line-through opacity-50" : "text-black"
          }`}
        >
          {task.task}
        </span>
      </div>
      <div>
        <FontAwesomeIcon
          onClick={() => editTodo(task._id)}
          icon={faPenToSquare}
          className="text-blue-500 mr-2 cursor-pointer hover:scale-105"
        />
        <FontAwesomeIcon
          onClick={() => deleteTodo(task._id)}
          icon={faTrash}
          className="text-red-500 cursor-pointer hover:scale-105"
        />
      </div>
    </div>
  );
};
