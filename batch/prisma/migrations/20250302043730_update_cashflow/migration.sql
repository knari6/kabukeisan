/*
  Warnings:

  - Added the required column `created_at` to the `CashFlowStatement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CashFlowStatement` ADD COLUMN `created_at` DATETIME(0) NOT NULL;
