import { Router } from "express";
const router = Router();

import {
  createNewNote,
  deleteNote,
  getAllNotesOfAUser,
  updateNote,
  getSingleNote,
} from "../controllers/note.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

router.route("/create").post(verifyJwt, createNewNote);
router.route("/getnotes").get(verifyJwt, getAllNotesOfAUser);
router.route("/get/:id").get(verifyJwt, getSingleNote);
router.route("/update/:id").put(verifyJwt, updateNote);
router.route("/delete/:id").delete(verifyJwt, deleteNote);

export default router;
