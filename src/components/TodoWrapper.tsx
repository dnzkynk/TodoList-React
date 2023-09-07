import { useState } from "react";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "./Todo";
import { EditTodoForm } from "./EditTodoForm";
uuidv4();

export interface ITodo {
  id: string;
  task: string;
  completed: boolean;
  isEditing: boolean;
}

export const TodoWrapper = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  const addTodo = (todo: string) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
  };
  const toggleComplete = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task: string, id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task: task, isEditing: false } : todo
      )
    );
  };

  return (
    <div className="container mx-auto mt-5 flex justify-center items-center h-screen bg-blue-100">
      <div className="max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 flex justify-center">
          Yapacaklar Listesi
        </h1>
        <TodoForm addTodo={addTodo} />
        {todos.map((todo, idx) =>
          todo.isEditing ? (
            <EditTodoForm key={idx} editTodo={editTask} task={todo} />
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
