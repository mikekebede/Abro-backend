import dotenv from "dotenv";
import { connectDB } from "./lib/db";
import { server } from "./lib/socket";

dotenv.config();

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDB();
});