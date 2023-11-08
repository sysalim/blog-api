/*
  Warnings:

  - A unique constraint covering the columns `[image]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `image` VARCHAR(100) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_image_key` ON `users`(`image`);
