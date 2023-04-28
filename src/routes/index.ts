import express, { Request, Response } from "express";
import doctorRoutes from "./doctor";
import patientRoutes from "./patient";
import appointmentRoutes from "./appointment";
import userRoutes from "./user";
import { name, version } from "../../package.json";

const router = express.Router();

router.get("/", (req: Request, res: Response) =>
  res.json({
    name,
    version,
  })
);

router.use("/appointment", appointmentRoutes);
router.use("/patient", patientRoutes);
router.use("/doctor", doctorRoutes);
router.use("/user", userRoutes);

export default router;
