import { PrismaClient, Doctor } from "@prisma/client";

export const prisma = new PrismaClient();

const all = () =>
  prisma.doctor.findMany({
    where: {
      deleted: false,
    },
  });

const detail = (id: number) =>
  prisma.doctor.findFirst({
    where: {
      id,
      deleted: false,
    },
  });

const add = (name: string, specialty: string) =>
  prisma.doctor.create({
    data: {
      name,
      specialty,
    },
  });

const update = (id: number, doctor: Doctor) =>
  prisma.doctor.update({
    where: { id },
    data: doctor,
  });

const remove = (id: number) =>
  prisma.doctor.update({
    where: { id },
    data: {
      deleted: true,
    },
  });

export { all, detail, add, update, remove };
