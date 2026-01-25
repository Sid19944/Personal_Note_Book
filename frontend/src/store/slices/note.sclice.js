import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
  name: "note",
  initialState: {
    loading: false,
    notes: [],
    note: {},
    isUpdated: false,
    noteError: null,
    noteMessage: null,
  },

  reducers: {
    // get All notes
    getNotesRequest(state, action) {
      state.loading = true;
      state.notes = [];
      state.noteMessage = null;
      state.isUpdated = false;
      state.noteError = null;
    },
    getNotesSuccess(state, action) {
      state.loading = false;
      state.notes = action.payload;
      state.note = {};
    },
    getNotesFailed(state, action) {
      state.loading = false;
      state.notes = [];
      state.noteError = action.payload;
      state.noteMessage = null;
    },

    // get Single note
    getNoteRequest(state, action) {
      state.loading = true;
    },
    getNoteSuccess(state, action) {
      state.loading = false;
      state.noteMessage = null;
      state.note = action.payload;
    },
    getNoteFailed(state, action) {
      state.loading = false;
      state.note = {};
      state.noteError = action.payload;
      state.noteMessage = null;
    },

    // create new note
    creatNoteRequest(state, action) {
      state.loading = true;
      state.noteError = null;
      state.noteMessage = null;
    },
    creatNoteSuccess(state, action) {
      state.loading = false;
      state.noteMessage = action.payload.message;
      state.note = action.payload.note;
    },
    creatNoteFailed(state, action) {
      state.loading = false;
      state.noteError = action.payload;
    },

    // update note
    updateNoteRequrest(state, action) {
      state.loading = true;
    },
    updateNoteSuccess(state, action) {
      state.loading = false;
      state.note = action.payload.note;
      state.noteMessage = action.payload.message;
      state.noteError = null;
      state.isUpdated = true;
    },
    updateNoteFailed(state, action) {
      state.loading = false;
      state.noteError = action.payload;
      state.noteMessage = null;
    },

    // delete note
    deleteNoteRequrest(state, action) {
      state.loading = true;
    },
    deleteNoteSuccess(state, action) {
      state.loading = false;
      state.notes = state.notes.filter(
        (note) => note._id != action.payload.note._id,
      );
      state.noteMessage = action.payload.message;
      state.noteError = null;
    },
    deleteNoteFailed(state, action) {
      state.loading = false;
      state.noteError = action.payload;
      state.noteMessage = null;
    },

    // clear all error
    clearAllError(state, action) {
      state.noteError = null;
      state.isAuthenticated = state.isAuthenticated;
      state.notes = state.notes;
    },
  },
});

import { noteApi } from "../../Api";

export const getAllNotes = () => async (dispatch) => {
  dispatch(noteSlice.actions.getNotesRequest());
  try {
    const { data } = await noteApi.get("/getnotes", { withCredentials: true });
    dispatch(noteSlice.actions.getNotesSuccess(data.notes));
    dispatch(noteSlice.actions.clearAllError());
  } catch (error) {
    dispatch(noteSlice.actions.getNotesFailed(error.response.data.message));
  }
};

export const getSindleNote = (id) => async (dispatch) => {
  dispatch(noteSlice.actions.getNoteRequest());
  try {
    const { data } = await noteApi.get(`/get/${id}`, { withCredentials: true });
    dispatch(noteSlice.actions.getNoteSuccess(data.note));
    dispatch(noteSlice.actions.clearAllError());
  } catch (error) {
    dispatch(noteSlice.actions.getNoteFailed(error.response.data.message));
  }
};

export const createNote = (title, content) => async (dispatch) => {
  dispatch(noteSlice.actions.creatNoteRequest());
  try {
    const { data } = await noteApi.post(
      "/create",
      { title, content },
      { withCredentials: true },
    );
    dispatch(noteSlice.actions.creatNoteSuccess(data));
    dispatch(noteSlice.actions.clearAllError());
  } catch (error) {
    dispatch(noteSlice.actions.creatNoteFailed(error.response.data.message));
  }
};

export const updateNote = (id, title, content) => async (dispatch) => {
  dispatch(noteSlice.actions.updateNoteRequrest());
  try {
    const { data } = await noteApi.put(
      `/update/${id}`,
      { title, content },
      {
        withCredentials: true,
      },
    );
    dispatch(noteSlice.actions.updateNoteSuccess(data));
    dispatch(noteSlice.actions.clearAllError());
  } catch (error) {
    dispatch(noteSlice.actions.updateNoteFailed(error.response.data.message));
  }
};

export const deleteNote = (id) => async (dispatch) => {
  dispatch(noteSlice.actions.deleteNoteRequrest());
  try {
    const { data } = await noteApi.delete(`/delete/${id}`, {
      withCredentials: true,
    });
    dispatch(noteSlice.actions.deleteNoteSuccess(data));
    dispatch(noteSlice.actions.clearAllError());
  } catch (error) {
    dispatch(noteSlice.actions.deleteNoteFailed(error.response.data.message));
  }
};
export default noteSlice.reducer;
