import app from './app';
import dotenv from "dotenv"
import {connectDB} from "./lib/db"


dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB()
});
