/*
  Warnings:

  - A unique constraint covering the columns `[fiscal_year]` on the table `companies` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code,fiscal_year]` on the table `companies` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `companies_fiscal_year_key` ON `companies`(`fiscal_year`);

-- CreateIndex
CREATE UNIQUE INDEX `companies_code_fiscal_year_key` ON `companies`(`code`, `fiscal_year`);
