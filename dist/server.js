"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./lib/db");
const socket_1 = require("./lib/socket");
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
socket_1.server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    (0, db_1.connectDB)();
});
//# sourceMappingURL=server.js.map