"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const posting_controller_1 = require("../controllers/posting.controller");
const router = express_1.default.Router();
router.get("/", auth_middleware_1.protectRoute, posting_controller_1.getPostings);
router.post("/createPost", auth_middleware_1.protectRoute, posting_controller_1.createPosting);
exports.default = router;
//# sourceMappingURL=posting.route.js.map