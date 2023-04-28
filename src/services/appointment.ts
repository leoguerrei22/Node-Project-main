import { PrismaClient, Appointment } from "@prisma/client";

export const prisma = new PrismaClient();

const all = () =>
  prisma.appointment.findMany({
    where: {
      deleted: false,
    },
  });

const detail = (id: number) =>
  prisma.appointment.findFirst({
    where: {
      id,
      deleted: false,
    },
    include: {
      doctor: {
        select: {
          name: true,
          specialty: true,
        },
      },
      patient: {
        select: {
          name: true,
        },
      },
    },
  });

const add = (
  date: Date,
  time: string,
  room: string,
  observations: string,
  patientId: number,
  doctorId: number
) =>
  prisma.appointment.create({
    data: {
      date: new Date("2023-05-30"),
      time,
      room,
      observations,
      patientId,
      doctorId,
    },
    include: {
      doctor: {
        select: {
          name: true,
          specialty: true,
        },
      },
      patient: {
        select: {
          name: true,
        },
      },
    },
  });

const update = (id: number, appointment: Appointment) =>
  prisma.appointment.update({
    where: { id },
    data: appointment,
    include: {
      patient: {
        select: {
          name: true,
        },
      },
      doctor: {
        select: {
          name: true,
          specialty: true,
        },
      },
    },
  });

  
const remove = (id: number) =>
  prisma.appointment.update({
    where: { id },
    data: {
      deleted: true,
    },
  });

export { all, detail, add, update, remove };
