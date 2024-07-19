// TaskSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { API_URL, Itask } from "../../services/api";
import axios from "axios";

const priorities = ['Low', 'Medium', 'High'];

export interface ITaskState {
  tasks: Itask[];
  status: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: ITaskState = {
  tasks: [],
  status: "idle",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchTasks:any = createAsyncThunk("fetchTasks", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const TaskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addNewTask: (state, action: PayloadAction<Itask>) => {
      const newTask = {
        ...action.payload,
        priority: priorities[Math.floor(Math.random() * priorities.length)]
      };
      state.tasks.push(newTask);
    },
    updateTask: (state, action: PayloadAction<Itask>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    toggleTaskCompleted: (state, action: PayloadAction<number>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload);
      if (index !== -1) {
        state.tasks[index].completed = !state.tasks[index].completed;
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      const temp: Itask[] = action.payload;
      state.tasks = temp.map((task: Itask) => ({
        ...task,
        priority: priorities[Math.floor(Math.random() * priorities.length)]
      }));
      state.status = "succeeded";
    });
    builder.addCase(fetchTasks.pending, (state) => {
      state.status = "pending";
    });
  },
});

export const { addNewTask, updateTask , deleteTask, toggleTaskCompleted  } = TaskSlice.actions;
export default TaskSlice.reducer;
