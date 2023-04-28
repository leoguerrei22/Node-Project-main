import express from "express";
import { list, detail, create, remove, update, login } from "../actions/user"
const router = express.Router();

router.get("/all", list);
router.get("/profile", detail);
router.post("/register", create);
router.put("/remove/:id", remove);
router.put("/update/:id", update);
router.post("/login", login)

export default router;