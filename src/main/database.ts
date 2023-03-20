import { PrismaClient } from "@prisma/client"
import { ipcMain } from "electron"

// const prisma = new PrismaClient()
// async function main() {
//   // ... you will write your Prisma Client queries here
//   const chats = await prisma.chats.create({
//     data: {
//       name: "asdasdasd"
//     }
//   })
//   // ipcMain.handle('')
//   console.log(chats)
// }
//
// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })
