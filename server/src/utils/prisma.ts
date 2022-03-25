import { ApiKey, Post, PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export { Post, User, ApiKey };

export default prisma;
