import Login from "./pages/Auth/Login";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Auth/Register";
import Home from "./pages/home/Home";
import NoteCard from "./component/NoteCard"
import CreateNote from "./component/CreateNote"
import Account from "./component/Account"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/account" element={<Account/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />}/>
      <Route path="/view/:id" element={<NoteCard/>}/>
      <Route path="/create" element={<CreateNote/>}/>
    </Routes>
  );
}

export default App;
