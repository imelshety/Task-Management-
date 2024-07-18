import axios from 'axios';

export const API_URL = 'https://jsonplaceholder.typicode.com/todos';


export interface Itask{
  id: number;
  title: string;
  priority  ? : string;
  completed : boolean;
}

export const fetchTasks = async () => {
  const response = await axios.get(API_URL);
  const tasksData = response.data;
  return tasksData
};

// export const addTask = async (task:Itask) => {
//   const response = await axios.post(API_URL, task);
//   return response.data;
// };

// export const updateTask = async ( task:Itask) => {
//   const response = await axios.put(`${API_URL}/${task.id}`, task);
//   return response.data;
// };

export const deleteTask = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
