import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../../helpers/api/apiCall";
import { Endpoints } from "../../../utilities/endPoints";

const initialState = {
  tasks: {
    data: [],
  },
  loading: false,
};

export const getTasks = createAsyncThunk(
  "todos/getTasks",
  async () => {
    const response = await client.get(Endpoints.TASKS);
    return response.data;
  }
);

export const deleteTasks = createAsyncThunk(
  "todos/deleteTasks",
  async (taskId) => {
    const response = await client.delete(
      Endpoints.TASKS + "/" + taskId
    );
    return response.data;
  }
);

export const addTasks = createAsyncThunk(
  "todos/addTasks",
  async (body) => {
    const response = await client.post(Endpoints.TASKS, body);
    return response.data;
  }
);

export const updateTasks = createAsyncThunk(
  "todos/updateTasks",
  async (body) => {
    const response = await client.put(
      Endpoints.TASKS + "/" + body.id,
      body
    );
    return response.data;
  }
);

export const patchTasks = createAsyncThunk(
  "todos/patchTasks",
  async (body) => {
    const response = await client.patch(
      Endpoints.TASKS + "/" + body.id,
      body
    );
    return response.data;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getTasks.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.tasks.data = action.payload;
      state.loading = false;
    });
    builder.addCase(getTasks.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteTasks.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteTasks.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteTasks.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(addTasks.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addTasks.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(addTasks.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateTasks.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateTasks.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateTasks.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(patchTasks.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(patchTasks.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(patchTasks.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default taskSlice.reducer;
