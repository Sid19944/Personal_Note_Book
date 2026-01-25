import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice.js";
import noteReducer from "./slices/note.sclice.js"

const store = configureStore({
  reducer: {
    user: userReducer,
    note : noteReducer
  },
});

export { store };
