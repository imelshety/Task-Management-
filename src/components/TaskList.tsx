import Header from "./Header";
import { GrCompliance } from "react-icons/gr";
import { RxComponent1 } from "react-icons/rx";
import { GoAlert } from "react-icons/go";
import TaskItems from "./TaskItems";

const TaskList = () => {
  // const handleCheckboxChange = (taskId) => {
  //   setCheckedTasks((prev) => ({
  //     ...prev,
  //     [taskId]: !prev[taskId],
  //   }));
  // };

  return (
    <>
      <Header />

      <div className="container flex flex-col lg:flex-row justify-center items-center gap-8 mx-auto mt-[7rem]">
        {/* search Bar */}
        <label className="input text-xl text-secondary-600 bg-white flex items-center gap-2">
          <input
            type="text"
            className="grow placeholder-secondary-600"
            placeholder="Find Task"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-6 w-6 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        {/* sort selection */}
        <select className="select text-base text-secondary-300 bg-white max-w-xs">
          <option disabled selected>
            Sort By
          </option>
          <option>priority</option>
          <option>Due Date</option>
          <option>creation date</option>
        </select>
      </div>
      <div className="w-full flex justify-center items-center gap-2 lg:gap-8 mt-8">
        <button className="bg-white shadow-xl w-18 h-18 lg:w-24 lg:h-24 text-secondary-600 rounded hover:bg-secondary-600 hover:text-white transform hover:scale-105 transition duration-300 ease-in-out group">
          <span className="flex flex-col items-center gap-2 py-1 px-4 pt-2 group-hover:text-white">
            <RxComponent1 className="text-3xl" />
            All
          </span>
        </button>
        <button className="bg-white shadow-xl  w-18 h-18 lg:w-24 lg:h-24 text-secondary-600 rounded hover:bg-secondary-600 hover:text-white transform hover:scale-105 transition duration-300 ease-in-out group">
          <span className="flex flex-col items-center gap-2 py-1 px-4 pt-2 group-hover:text-white">
            <GrCompliance className="text-3xl" />
            Completed
          </span>
        </button>
        <button className="bg-white shadow-xl  w-18 h-18 lg:w-24 lg:h-24 text-secondary-600 rounded hover:bg-secondary-600 hover:text-white transform hover:scale-105 transition duration-300 ease-in-out group">
          <span className="flex flex-col items-center gap-2 py-1 px-4 pt-2 group-hover:text-white text-base">
            <GoAlert className="text-3xl" />
            Incompleted
          </span>
        </button>
      </div>
      <TaskItems />
      
    </>
  );
};

export default TaskList;
