import express from "express";
import rateLimiter from "express-rate-limit";
import { login, register, updateUser } from "../controllers/auth.js";
import authenticateUser from "../middleware/authentication.js";

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
});

const router = express.Router();

router.post("/register", apiLimiter, register);
router.post("/login", apiLimiter, login);
router.patch("/updateUser", authenticateUser, updateUser);

export default router;
