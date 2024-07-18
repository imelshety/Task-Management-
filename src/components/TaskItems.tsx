import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchTasks } from "../store/Slices/TaskSlice";
import Button from "./Button";
import EditTask from "./EditTask/EditTask";
import { Itask } from "../services/api";

const TaskItems = () => {
  const dispatch = useDispatch();
  const { tasks, status } = useSelector((state: RootState) => state.tasks);
  const [selectedTask, setSelectedTask] = useState<Itask | null>(null);
  const [displayedTasks, setDisplayedTasks] = useState(8);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTasks());
    }
  }, [status, dispatch]);

  const handleShowMore = () => {
    setDisplayedTasks((prev) => prev + 8);
  };

  const handleOpenModal = (task: Itask) => {
    setSelectedTask(task);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
  };

  useEffect(() => {
    const modal = document.getElementById("edit_modal") as HTMLDialogElement;
    if (selectedTask) {
      modal?.showModal();
    } else {
      modal?.close();
    }
  }, [selectedTask]);

  return (
    <>
      <div className="overflow-x-auto mt-[5rem]">
        <table className="table w-full">
          <thead className="bg-white">
            <tr className="shadow-lg border-b-2 border-secondary-400 text-xl text-secondary-600">
              <th className="py-12"></th>
              <th>ID</th>
              <th>Task Name</th>
              <th>Priority</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length ? (
              tasks.slice(0, displayedTasks).map((task) => (
                <tr
                  key={task.id}
                  className="shadow-lg border-b-2 border-secondary-400 text-xl text-secondary-600 bg-white mb-4"
                >
                  <th>
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox bg-white border-2 shadow-lg"
                      />
                    </label>
                  </th>
                  <td className="py-12">
                    <span className="font-bold">{task.id}</span>
                  </td>
                  <td>{task.title}</td>
                  <td className="flex items-center py-12">
                    <span
                      className={`rounded-full text-lg w-20 h-8 text-center ${
                        task.priority === "High"
                          ? "bg-red-500 text-white"
                          : task.priority === "Medium"
                          ? "bg-yellow-500 text-white"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </td>
                  <th>
                    <Button className="uppercase" onClick={() => handleOpenModal(task)}>
                      details
                    </Button>
                  </th>
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-center py-4">No tasks available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {displayedTasks < tasks.length && (
        <div className="flex justify-center mt-8">
          <Button onClick={handleShowMore}>Show More</Button>
        </div>
      )}
      {selectedTask && <EditTask task={selectedTask} closeModal={handleCloseModal} />}
    </>
  );
};

export default TaskItems;
