import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchTasks, deleteTask, toggleTaskCompleted } from "../store/Slices/TaskSlice";
import Button from "./Button";
import EditTask from "./EditTask/EditTask";
import DeleteTask from "./DeleteTask/DeleteTask";
import { Itask } from "../services/api";

interface TaskItemsProps {
  searchTerm: string;
  filter: "all" | "completed" | "incompleted";
}

const TaskItems: React.FC<TaskItemsProps> = ({ searchTerm, filter }) => {
  const dispatch = useDispatch();
  const { tasks, status } = useSelector((state: RootState) => state.tasks);
  const [selectedTask, setSelectedTask] = useState<Itask | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Itask | null>(null);
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

  const handleOpenDeleteModal = (task: Itask) => {
    setTaskToDelete(task);
  };

  const handleCloseDeleteModal = () => {
    setTaskToDelete(null);
  };

  const handleDeleteTask = (id: number) => {
    dispatch(deleteTask(id));
  };

  const handleToggleCompleted = (id: number) => {
    dispatch(toggleTaskCompleted(id));
  };

  useEffect(() => {
    const editModal = document.getElementById("edit_modal") as HTMLDialogElement;
    const deleteModal = document.getElementById("delete_modal") as HTMLDialogElement;

    if (selectedTask) {
      editModal?.showModal();
    } else {
      editModal?.close();
    }

    if (taskToDelete) {
      deleteModal?.showModal();
    } else {
      deleteModal?.close();
    }
  }, [selectedTask, taskToDelete]);

  // Filter tasks based on the search term and filter
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "completed" && task.completed) ||
      (filter === "incompleted" && !task.completed);
    return matchesSearch && matchesFilter;
  });

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
              <th>Completed?</th>
              <th>Details</th>
              <th>DELETE</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.length ? (
              filteredTasks.slice(0, displayedTasks).map((task) => (
                <tr
                  key={task.id}
                  className="shadow-lg border-b-2 border-secondary-400 text-xl text-secondary-600 bg-white mb-4"
                >
                  <td>
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox p-1 lg:p-4 bg-white border-2 shadow-lg"
                        checked={task.completed}
                        onChange={() => handleToggleCompleted(task.id)}
                      />
                    </label>
                  </td>
                  <td className="py-12">
                    <span className="font-bold">{task.id}</span>
                  </td>
                  <td>{task.title}</td>
                  <td className="flex items-center py-12">
                    <span
                      className={`rounded-xl text-sm lg:text-lg p-3 text-center ${
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
                  <td>
                    <span
                      className={`rounded-2xl text-sm lg:text-xl ms-2 lg:ms-5 p-4 text-center ${
                        task.completed
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {task.completed ? "Yes" : "No"}
                    </span>
                  </td>
                  <td>
                    <Button
                      className="uppercase p-2 lg:p-4"
                      onClick={() => handleOpenModal(task)}
                    >
                      details
                    </Button>
                  </td>
                  <td>
                    <Button
                      className="uppercase hover:bg-red-600 hover:border-red-500 p-2 lg:p-4"
                      onClick={() => handleOpenDeleteModal(task)}
                    >
                      delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className=" text-center py-4 text-xl text-secondary-600 font-bold">No tasks ya Man</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {displayedTasks < filteredTasks.length && (
        <div className="flex justify-center mt-8">
          <Button onClick={handleShowMore}>Show More</Button>
        </div>
      )}
      {selectedTask && (
        <EditTask task={selectedTask} closeModal={handleCloseModal} />
      )}
      {taskToDelete && (
        <DeleteTask
          task={taskToDelete}
          closeModal={handleCloseDeleteModal}
          onDelete={handleDeleteTask}
        />
      )}
    </>
  );
};

export default TaskItems;
