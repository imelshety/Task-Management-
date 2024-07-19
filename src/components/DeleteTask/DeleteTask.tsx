import { Itask } from "../../services/api";
import Button from "../Button";

interface DeleteTaskProps {
  task: Itask;
  closeModal: () => void;
  onDelete: (id: number) => void;
}

const DeleteTask = ({ task, closeModal, onDelete }: DeleteTaskProps) => {
  const handleDelete = () => {
    onDelete(task.id);
    closeModal();
  };

  return (
    <dialog id="delete_modal" className="modal">
      <form method="dialog" className="modal-box bg-white">
        <h3 className="font-bold text-lg text-secondary-600">Confirm Delete</h3>
        <p className="py-4 text-secondary-600">
          Are you sure you want to delete the task <span className="text-red-600"> {task.title}</span>?
        </p>
        <div className="modal-action">
          <Button className="btn hover:bg-red-600 hover:border-red-500 " onClick={handleDelete}>
            Delete
          </Button>
          <Button className="btn" onClick={closeModal}>
            Cancel
          </Button>
        </div>
      </form>
    </dialog>
  );
};

export default DeleteTask;
