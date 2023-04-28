import { Request, Response } from "express";
import { add } from "../../services/appointment";
import { detail as detailPatient } from "../../services/patient";
import { detail as detailDoctor } from "../../services/doctor";

export default async (req: Request, res: Response) => {
  const { date, time, room, observations, patientId, doctorId } = req.body;

  const patient = await detailPatient(Number(patientId));
  const doctor = await detailDoctor(Number(doctorId));

  if (!patient || patient.deleted) {
    return res.status(400).json({ message: "Patient not found" });
  } else if (!doctor || doctor.deleted) {
    return res.status(400).json({ message: "Doctor not found" });
  } else {
    const appointment = await add(
      date,
      time,
      room,
      observations,
      patientId,
      doctorId
    );

    return res.json(appointment);
  }
};
