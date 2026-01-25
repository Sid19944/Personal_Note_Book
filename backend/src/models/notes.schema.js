import mongoose, { Schema } from "mongoose";

const notesSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    
    title: String,
    content: String,
  },
  { timestamps: true },
);

export const Note = mongoose.model("Note", notesSchema);
