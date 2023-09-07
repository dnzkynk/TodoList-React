import React, { useState } from "react";

interface EditTodoFormProps {
  editTodo: (todo: string, taskId: string) => void;
  task: any;
}

export const EditTodoForm: React.FC<EditTodoFormProps> = ({
  editTodo,
  task,
}) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("task.id", task._id);

    editTodo(value, task._id);
  };

  return (
    <form
      className="mb-4 bg-white p-4 shadow rounded flex items-center"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Görevi Güncelle"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        required
        className="border border-gray-400 rounded px-3 py-2 w-full"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
      >
        Güncelle
      </button>
    </form>
  );
};
