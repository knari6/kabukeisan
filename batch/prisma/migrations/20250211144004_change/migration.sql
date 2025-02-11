/*
  Warnings:

  - You are about to drop the column `accounts_payable_trade` on the `AccountDatas` table. All the data in the column will be lost.
  - You are about to drop the column `capital_expenditures` on the `AccountDatas` table. All the data in the column will be lost.
  - You are about to drop the column `goodwill_amortizaion` on the `AccountDatas` table. All the data in the column will be lost.
  - You are about to drop the column `long_term_debt` on the `AccountDatas` table. All the data in the column will be lost.
  - You are about to drop the column `merchandise_and_finished_goods` on the `AccountDatas` table. All the data in the column will be lost.
  - You are about to drop the column `security` on the `AccountDatas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `AccountDatas` DROP COLUMN `accounts_payable_trade`,
    DROP COLUMN `capital_expenditures`,
    DROP COLUMN `goodwill_amortizaion`,
    DROP COLUMN `long_term_debt`,
    DROP COLUMN `merchandise_and_finished_goods`,
    DROP COLUMN `security`;
