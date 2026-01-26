import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteNote, getAllNotes } from "../../store/slices/note.sclice";
import { ToastContainer, toast } from "react-toastify";
import { getUser } from "../../store/slices/user.slice";
import { Link, useNavigate } from "react-router-dom";

import DeleteIcon from "@mui/icons-material/Delete";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import { logout } from "../../store/slices/user.slice";

import Loading from "../../utils/Loading";

function Home() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const { notes, noteMessage } = useSelector((state) => state.note);
  const { isAuthenticated, user, message, error,loading } = useSelector(
    (state) => state.user,
  );

  const handleDelete = (id) => {
    dispatch(deleteNote(id));
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    if (isAuthenticated) {
      dispatch(getAllNotes());
    }
    if (message != "User logged out successfully") dispatch(getUser());
    if (error) {
      toast.error(error, { position: "bottom-left" });
    }
    if (noteMessage) {
      toast.success(noteMessage, { position: "bottom-left" });
    }
    if (message) {
      toast.success(message, { position: "bottom-left" });
    }
  }, [isAuthenticated, error, noteMessage]);

  return (
    <div className="font-serif ">
      <nav className="outline-1 w-full flex mb-2 justify-between p-2 items-baseline sticky top-0 bg-black overflow-hidden h-fit">
        <p className="text-xs md:text-lg">All Notes : {notes?.length || "0"}</p>
        <p className=" overflow-hidden text-sm md:text-lg">
          Welcome back{" "}
          <span className="font-semibold  overflow-hidden">{user.name}</span>
        </p>
        <Link onClick={() => setShowMenu(!showMenu)}>
          <div className="h-8 w-8 rounded-[100%]">
            <AccountCircleIcon />
          </div>
        </Link>
      </nav>

      {/* Mini nav */}
      {showMenu && (
        <nav className="outline-1 fixed right-1 bg-black top-13 py-2 px-2 rounded-lg flex flex-col gap-2">
          <Link to={"/account"} className="flex gap-2">
            <AccountCircleIcon />
            Account
          </Link>
          <Link className="flex gap-2" onClick={handleLogout}>
            <LogoutIcon />
            Logout
          </Link>
        </nav>
      )}

      <div className="p-2 overflow-y-auto">
        <Link to={"/create"}>
          <div className="border h-25 mb-4 rounded-lg bg-gray-800 p-2 overflow-hidden hover:border-none hover:shadow-[0px_0px_4px_4px] hover:shadow-blue-600">
            <h1>Create New</h1>
          </div>
        </Link>
        {notes?.map((note) => (
          <div
            key={note._id}
            className="border mb-4 rounded-lg bg-gray-800 p-2 overflow-hidden hover:border-none hover:shadow-[0px_0px_4px_4px] hover:shadow-blue-600 flex justify-between"
          >
            <div className="w-full">
              <Link to={`/view/${note._id}`}>
                <h1 className="font-semibold">{note.title}</h1>
                <p className="h-6 overflow-hidden">{note.content}</p>
                <p className="text-gray-400">
                  {new Date(note.updatedAt).toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                  })}
                </p>
              </Link>
            </div>
            <Link
              onClick={() => handleDelete(note._id)}
              className="text-red-500 rounded-xl bg-gray-700 p-2 h-fit hover:bg-gray-900 hover:text-red-700 active:bg-gray-900 active:text-red-700"
            >
              <DeleteIcon style={{ fontSize: "30px" }} />
            </Link>
          </div>
        ))}
      </div>

      <ToastContainer />
      {loading ? <Loading text="Loading..." /> : ""}
    </div>
  );
}

export default Home;
