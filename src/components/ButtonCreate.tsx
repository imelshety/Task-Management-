import { IoIosAdd } from "react-icons/io";

export const ButtonCreate = () => {
  const handleButtonClick = () => {
    const modal = document.getElementById("my_modal_5") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <button
      className="btn bg-secondary-600 border-1 border-secondary-600 hover:border-secondary-400 rounded-xl flex justify-center items-center gap-1 p-1 text-white text-lg hover:bg-secondary-500 duration-300 ease-in-out"
      onClick={handleButtonClick}
    >
      Create Task <IoIosAdd className="text-2xl font-bold" />
    </button>
  );
};
