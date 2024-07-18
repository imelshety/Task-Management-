import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { addNewTask } from "../../store/Slices/TaskSlice";
import { Itask } from "../../services/api";
import Button from "../Button";

const AddTask: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Low"); // Default priority

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    const maxId =
      tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) : 0;
    const newTask: Itask = {
      id: maxId + 1,
      title,
      priority,
      completed: false,
    };
    dispatch(addNewTask(newTask));
    const modal = document.getElementById("my_modal_5") as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
    setTitle(""); // Reset the input field
    setPriority("Low"); // Reset the priority field
  };

  return (
    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-primary-50">
        <h3 className="font-bold text-secondary-800 text-lg uppercase">
          Add New Task!
        </h3>
        <form onSubmit={handleAddTask} className="py-4">
          <div>
            <label
              htmlFor="taskTitle"
              className="block text-sm lg:text-lg font-medium text-secondary-600"
            >
              Task Title
            </label>
            <input
              id="taskTitle"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border border-text-secondary-300 bg-white rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="taskPriority"
              className="block text-sm lg:text-lg font-medium text-secondary-600"
            >
              Priority
            </label>
            <select
              id="taskPriority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="mt-1 block w-full border border-text-secondary-300 bg-white rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="modal-action">
            <Button type="submit">Add Task</Button>
            <Button
              type="button"
              onClick={() =>
                (document.getElementById("my_modal_5") as HTMLDialogElement).close()
              }
            >
              Close
            </Button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default AddTask;
