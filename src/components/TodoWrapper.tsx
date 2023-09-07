import { useEffect, useState } from "react";
import axios from "axios";
import { TodoForm } from "./TodoForm";
import { Todo } from "./Todo";
import { EditTodoForm } from "./EditTodoForm";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState<any[]>([]);

  const getTodos = async () => {
    const response = await axios.get("http://localhost:3000/todos");
    console.log(response.data.data);
    setTodos(response.data.data);
  };

  const addTodo = async (todo: string) => {
    const todoData = {
      task: todo,
      completed: false,
      isEditing: false,
    };

    const response = await axios.post("http://localhost:3000/todos", todoData);
    console.log(response.data);

    setTodos([...todos, response.data.data]);
  };

  const toggleComplete = async (id: string) => {
    const todoToUpdate = todos.find((todo) => todo._id === id);
    console.log("todoToUpdate", todoToUpdate);
    if (todoToUpdate) {
      const updatedTodo = {
        ...todoToUpdate,
        completed: !todoToUpdate.completed,
      };
      await axios.post(`http://localhost:3000/todos/${id}`, {
        completed: updatedTodo.completed,
      });
      setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
    }
  };

  const deleteTodo = async (id: string) => {
    await axios.delete(`http://localhost:3000/todos/${id}`);
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  const editTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo._id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = async (task: string, id: string) => {
    await axios.post(`http://localhost:3000/todos/${id}`, { task });
    setTodos(
      todos.map((todo) =>
        todo._id === id ? { ...todo, task: task, isEditing: false } : todo
      )
    );
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="container mx-auto mt-5 flex justify-center items-center h-screen bg-blue-100">
      <div className="max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 flex justify-center">
          Yapacaklar Listesi
        </h1>
        <TodoForm addTodo={addTodo} />
        {todos.map((todo, idx) =>
          todo.isEditing ? (
            (console.log("todo", todo),
            (<EditTodoForm key={idx} editTodo={editTask} task={todo} />))
          ) : (
            <Todo
              key={idx}
              task={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          )
        )}
      </div>
    </div>
  );
};
