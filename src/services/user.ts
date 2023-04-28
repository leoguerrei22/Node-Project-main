import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
export const prisma = new PrismaClient();

const all = () =>
  prisma.user.findMany({
    where: {
      deleted: false,
    },
  });

const detail = (id: number) =>
  prisma.user.findFirst({
    where: {
      id,
      deleted: false,
    },
  });

async function add (login: string, password: string) {

  const user = await prisma.user.create({
    data: {
      login,
      password: await bcrypt.hash(password, 8),
    },
  });
  return createToken(user);
}

 
  const update = async (id: number, oldPassword: string, newPassword: string) => {
    const user = await prisma.user.findUnique({ where: { id } });
  
    if (!user) {
      throw new Error('User not found');
    }
  
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
  
    if (!isPasswordValid) {
      throw new Error('Invalid old password');
    }
  
    const hashedPassword = await bcrypt.hash(newPassword, 8);
  
    return await prisma.user.update({ where: { id }, data: { password: hashedPassword } });
  };


const remove = (id: number) =>
  prisma.user.update({
    where: { id },
    data: {
      deleted: true,
    },
  });

const attemptLogin = async (login: string, password: string) => {
    const user = await prisma.user.findFirst({
      where: {
        login,
        deleted: false,
      },
    });
  
    const match = user && (await bcrypt.compare(password, user.password));
  
    if (!user || !match) {
      throw new Error("Bad credentials");
    }
  
    return createToken(user);
  }

  function createToken(user: User) {
    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 100,
        login: user.login,
        user_id: user.id,
      },
      "VeryScreteKeyToSignMyLogin"
    );
   return token;
  }

export { all, detail, add, update, remove, attemptLogin };
