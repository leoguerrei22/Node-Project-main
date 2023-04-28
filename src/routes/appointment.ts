import express from "express";
import { list, detail, create, remove, update } from "../actions/appointment"
const router = express.Router();

router.get("/all", list);
router.get("/find/:id", detail);
router.post("/register", create);
router.put("/remove/:id", remove);
router.put("/update/:id", update);

export default router;