import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTask } from "../../store/Slices/TaskSlice";
import { Itask } from "../../services/api";
import Button from "../Button";

interface EditTaskProps {
  task: Itask;
  closeModal: () => void;
}

const EditTask: React.FC<EditTaskProps> = ({ task, closeModal }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(task.title);
  const [priority, setPriority] = useState(task.priority); // Initialize with the current task's priority

  const handleEditTask = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTask: Itask = {
      ...task,
      title,
      priority,
    };
    dispatch(updateTask(updatedTask));
    closeModal();
  };

  return (
    <dialog id="edit_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-primary-50">
        <h3 className="font-bold text-secondary-800 text-lg uppercase">
          Edit Task
        </h3>
        <form onSubmit={handleEditTask} className="py-4">
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
            <Button type="submit">Edit Task</Button>
            <Button type="button" onClick={closeModal}>Close</Button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default EditTask;
