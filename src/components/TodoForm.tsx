import React, { useState } from "react";

interface TodoFormProps {
  addTodo: (todo: string) => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo(value);
    setValue("");
  };

  return (
    <form
      className="mb-4 bg-white p-4 shadow rounded flex items-center"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Bugün neler yapacaksınız?"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        required
        className="border border-gray-400 rounded px-3 py-2 w-full"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
      >
        Ekle
      </button>
    </form>
  );
};
