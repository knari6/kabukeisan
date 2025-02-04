-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `age` VARCHAR(191) NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AccountDatas` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(20) NOT NULL,
    `year` VARCHAR(20) NOT NULL,
    `current_asset` VARCHAR(20) NULL,
    `cash` VARCHAR(20) NULL,
    `trade_receivable` VARCHAR(20) NULL,
    `security` VARCHAR(20) NULL,
    `inventory` VARCHAR(20) NULL,
    `other_current_asset` VARCHAR(20) NULL,
    `non_current_asset` VARCHAR(20) NULL,
    `tangible_asset` VARCHAR(20) NULL,
    `long_term_security` VARCHAR(20) NULL,
    `investment` VARCHAR(20) NULL,
    `other_asset` VARCHAR(20) NULL,
    `assets` VARCHAR(20) NULL,
    `liability` VARCHAR(20) NULL,
    `current_liability` VARCHAR(20) NULL,
    `accounts_payable_trade` VARCHAR(20) NULL,
    `other_current_liability` VARCHAR(20) NULL,
    `non_current_liability` VARCHAR(20) NULL,
    `bond` VARCHAR(20) NULL,
    `long_term_debt` VARCHAR(20) NULL,
    `equity` VARCHAR(20) NULL,
    `sale` VARCHAR(20) NULL,
    `gross_profit` VARCHAR(20) NULL,
    `operating_income` VARCHAR(20) NULL,
    `ordinary_income` VARCHAR(20) NULL,
    `pre_tax_profit` VARCHAR(20) NULL,
    `profit` VARCHAR(20) NULL,
    `depreciation_amortization` VARCHAR(20) NULL,
    `impairment_loss` VARCHAR(20) NULL,
    `research_and_development` VARCHAR(20) NULL,
    `operating_activities` VARCHAR(20) NULL,
    `investment_activities` VARCHAR(20) NULL,
    `financing_activities` VARCHAR(20) NULL,
    `dividends_paid` VARCHAR(20) NULL,
    `capital_expenditures` VARCHAR(20) NULL,
    `goodwill_amortizaion` VARCHAR(20) NULL,

    INDEX `account_datas_code_year_fkey`(`code`, `year`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Companies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `year` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Companies_code_year_key`(`code`, `year`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `age` VARCHAR(191) NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AccountDatas` ADD CONSTRAINT `AccountDatas_code_year_fkey` FOREIGN KEY (`code`, `year`) REFERENCES `Companies`(`code`, `year`) ON DELETE RESTRICT ON UPDATE CASCADE;
