import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { HiBars3 } from "react-icons/hi2";
import AddTask from "./AddTask/AddTask";
import { ButtonCreate } from "./ButtonCreate";

const Header: React.FC = () => {
  const [active, setActive] = useState(false);

 
  return (
    <>
      <header className="hidden  bg- w-full bg-white p-5 lg:flex justify-between items-center gap-8 shadow-lg">
        <h1 className="text-3xl font-semibold text-secondary-600"> TASKS</h1>
        <ul>
          <li>
           <ButtonCreate/>
          </li>
        </ul>
      </header>
      {/* for small screen and tablet */}
      <header
        className={`fixed lg:hidden bg-secondaryColor-50  top-0 left-0 right-0 flex justify-between p-3 z-50`}
      >
        {active ? (
          <button
            className="text-black-950 text-4xl"
            onClick={() => setActive(false)}
          >
            <AiFillCloseCircle />
          </button>
        ) : (
          <button
            className="text-black-950 text-4xl"
            onClick={() => setActive(true)}
          >
            <HiBars3 />
          </button>
        )}
      </header>
      <div
        className={`lg:hidden w-screen h-screen py-10 fixed z-[998] left-0 right-0 backdrop-blur-sm bg-white/80 duration-300 ${
          active ? "top-[50px]" : "-top-[120vh]"
        }`}
      >
        <ul className="flex flex-col gap-4 justify-center items-center">
          <li>
            <h1 className="text-lg lg:text-3xl font-semibold text-secondary-600">
              TASKS
            </h1>
          </li>
          <li>
           <ButtonCreate/>
          </li>
        </ul>
      </div>
       <AddTask/>
    </>
  );
};

export default Header;
