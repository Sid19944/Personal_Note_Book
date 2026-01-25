import app from "./app.js";
import dotenv from "dotenv";
dotenv.config("./.env");
const PORT = process.env.PORT;

import { dbconnect } from "./src/database/db.connect.js";

dbconnect().then(() => {
  console.log("DB connected successfully");
  app.listen(PORT, () => {
    console.log("App is listing on PORT", PORT);
  })
}).catch((err)=>{
  console.log("Someting is Wrong while dbconnect and app.listen",err)
})
