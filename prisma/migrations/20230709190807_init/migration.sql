/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Deck` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Deck` DROP FOREIGN KEY `Deck_userId_fkey`;

-- DropTable
DROP TABLE `User`;

-- CreateIndex
CREATE UNIQUE INDEX `Deck_userId_key` ON `Deck`(`userId`);
