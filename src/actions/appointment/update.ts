import { Request, Response } from "express";
import { update, detail } from "../../services/appointment";
import { detail as detailPatient } from "../../services/patient";
import { detail as detailDoctor } from "../../services/doctor";

export default async (req: Request, res: Response) => {
  const { id } = req.params;
  const { date, time, room, observations, patientId, doctorId } = req.body;

  const appointmentToUpdate = await detail(Number(id));
  if (!appointmentToUpdate) {
    return res.status(404).json({ error: "Appointment not found" });
  }

  const patient = await detailPatient(Number(patientId));
  const doctor = await detailDoctor(Number(doctorId));

  if (!patient || patient.deleted || isNaN(patient.id)) {
    return res.status(400).json({ message: "Patient not found" });
  } else if (!doctor || doctor.deleted || isNaN(doctor.id)) {
    return res.status(400).json({ message: "Doctor not found" });
  }

  const updatedAppointment = await update(Number(id), req.body);

  return res.json(updatedAppointment);
};
