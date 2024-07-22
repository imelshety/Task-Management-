import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchTasks, deleteTask, toggleTaskCompleted, updateTasksOrder } from "../store/Slices/TaskSlice";
import Button from "./Button";
import EditTask from "./EditTask/EditTask";
import DeleteTask from "./DeleteTask/DeleteTask";
import { Itask } from "../services/api";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface TaskItemsProps {
  searchTerm: string;
  filter: "all" | "completed" | "incompleted";
  sortOption: "priority" | "status" | "";
}

const TaskItems: React.FC<TaskItemsProps> = ({ searchTerm, filter, sortOption }) => {
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDragEnd = (result: any) => {
    const { source, destination } = result;
  
    if (!destination) return;
  
    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(source.index, 1);
    reorderedTasks.splice(destination.index, 0, movedTask);
  
    dispatch(updateTasksOrder(reorderedTasks));
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

  // Sort tasks based on priority and status
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sortedTasks = filteredTasks.sort((a: any, b: any) => {
    if (sortOption === "priority") {
      const priorityOrder: { [key: string]: number } = { Low: 1, Medium: 2, High: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    } else if (sortOption === "status") {
      return Number(a.completed) - Number(b.completed);
    }
    return 0;
  });

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="taskList">
          {(provided) => (
            <div
              className="overflow-x-auto mt-[5rem]"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
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
                  {sortedTasks.length ? (
                    sortedTasks.slice(0, displayedTasks).map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                        {(provided,snapshot) => (
                          <tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`shadow-lg border-b-2 border-secondary-400 text-xl text-secondary-600 bg-white mb-4 draggable-item ${snapshot.isDragging ? 'dragging' : ''}`}
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
                                className="uppercase delete-btn p-2 lg:p-4"
                                onClick={() => handleOpenDeleteModal(task)}
                              >
                                delete
                              </Button>
                            </td>
                          </tr>
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <tr>
                      <td className="text-center py-4 text-xl text-secondary-600 font-bold">
                        No tasks found
                      </td>
                    </tr>
                  )}
                  {provided.placeholder}
                </tbody>
              </table>
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {displayedTasks < sortedTasks.length && (
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
