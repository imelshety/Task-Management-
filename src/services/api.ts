
export const API_URL = 'https://jsonplaceholder.typicode.com/todos';


export interface Itask{
  id: number;
  title: string;
  priority  ? : string;
  completed : boolean;
}

// export const fetchTasks = async () => {
//   const response = await axios.get(API_URL);
//   const tasksData = response.data;
//   return tasksData
// };


// export const deleteTask = async (id: number) => {
//   const response = await axios.delete(`${API_URL}/${id}`);
//   return response.data;
// };
