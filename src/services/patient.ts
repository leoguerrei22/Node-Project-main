import { PrismaClient, Patient } from "@prisma/client";

export const prisma = new PrismaClient();

const all = () =>
  prisma.patient.findMany({
    where: {
      deleted: false,
    },
  });

const detail = (id: number) =>
  prisma.patient.findFirst({
    where: {
      id,
      deleted: false,
    },
  });

const add = (name: string, age: number, gender: string, address: string, contact: string) =>
  prisma.patient.create({
    data: {
      name,
      age,
      gender,
      address,
      contact,
    },
  });

const update = (id: number, patient: Patient) =>
  prisma.patient.update({
    where: { id },
    data: patient,
  });

const remove = (id: number) =>
  prisma.patient.update({
    where: { id },
    data: {
      deleted: true,
    },
  });

export { all, detail, add, update, remove };
