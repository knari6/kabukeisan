/*
  Warnings:

  - Added the required column `year` to the `Companies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Companies` ADD COLUMN `year` VARCHAR(5) NOT NULL;
