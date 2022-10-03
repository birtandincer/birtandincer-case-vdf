import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./slices/tasks/taskSlice";

export default configureStore({
  reducer: {
    tasks: taskSlice,
  },
});
