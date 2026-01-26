import { React, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  createNote,
  getSindleNote,
  updateNote,
} from "../store/slices/note.sclice";
import { ToastContainer, toast } from "react-toastify";

import Loading from "../utils/Loading";

function NoteCard() {
  const dispatch = useDispatch();
  const { note, noteError, isUpdated, loading } = useSelector((state) => state.note);
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const textRe = useRef(null);

  const navigate = useNavigate();

  const handleUpdate = () => {
    dispatch(updateNote(id, title, content));
  };

  useEffect(() => {
    if (isUpdated) {
      navigate("/");
    }
    textRe.current.focus();
    if (noteError) {
      toast.error(noteError, { position: "bottom-left" });
    }

    if (Object.values(note).length == 0) {
      dispatch(getSindleNote(id));
    }
    setTitle(note?.title);
    setContent(note?.content);
  }, [Object.values(note).length, noteError, isUpdated]);

  return (
    <div className="bg-[url('/public/notebg.jpg')] h-screen flex flex-col bg-cover bg-no-repeat outline-1 text-black p-1">
      <nav className="p-2 outline-1 mb-2 rounded-lg bg-amber-600 flex justify-between">
        <div className="flex gap-2">
          <h1 className="font-semibold">Title : </h1>
          <input
            type="text"
            className="outline-blue-600 px-2 border-b-blue-600 border-b-2 font-semibold"
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Title"
          />
        </div>
        <button
          onClick={handleUpdate}
          disabled={content?.trim() == ""}
          className="outline-1 cursor-pointer px-4 disabled:bg-blue-300 disabled:blur-[0.4px] disabled:text-black disabled:cursor-not-allowed rounded-lg py-1 font-bold blur-none bg-blue-700 text-white"
        >
          Update
        </button>
      </nav>
      <textarea
        className="w-full h-full p-2 text-lg font-semibold outline-none border-2 rounded-lg"
        name="content"
        id="content"
        ref={textRe}
        defaultValue={content}
        placeholder="Enter Text "
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <ToastContainer />
      {loading? <Loading text="Loading..."/>:""}
    </div>
  );
}

export default NoteCard;
