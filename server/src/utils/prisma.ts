import { Key, Post, PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export { Post, User, Key };

export default prisma;
