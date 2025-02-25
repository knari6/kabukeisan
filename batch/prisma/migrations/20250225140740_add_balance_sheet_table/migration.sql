-- CreateTable
CREATE TABLE `BalanceSheets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `statementId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `assets` DECIMAL(15, 2) NULL,
    `currentAssets` DECIMAL(15, 2) NULL,
    `cashAndDeposits` DECIMAL(15, 2) NULL,
    `accountsReceivable` DECIMAL(15, 2) NULL,
    `merchandiseAndFinishedGoods` DECIMAL(15, 2) NULL,
    `securities` DECIMAL(15, 2) NULL,
    `inventory` DECIMAL(15, 2) NULL,
    `otherCurrentAssets` DECIMAL(15, 2) NULL,
    `fixedAssets` DECIMAL(15, 2) NULL,
    `tangibleFixedAssets` DECIMAL(15, 2) NULL,
    `land` DECIMAL(15, 2) NULL,
    `intangibleFixedAssets` DECIMAL(15, 2) NULL,
    `investmentSecurities` DECIMAL(15, 2) NULL,
    `otherAssets` DECIMAL(15, 2) NULL,
    `currentLiabilities` DECIMAL(15, 2) NULL,
    `debt` DECIMAL(15, 2) NULL,
    `otherCurrentLiabilities` DECIMAL(15, 2) NULL,
    `fixedLiabilities` DECIMAL(15, 2) NULL,
    `otherLiabilities` DECIMAL(15, 2) NULL,
    `liabilities` DECIMAL(15, 2) NULL,
    `equity` DECIMAL(15, 2) NULL,
    `netAssets` DECIMAL(15, 2) NULL,

    UNIQUE INDEX `BalanceSheets_statementId_key`(`statementId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BalanceSheets` ADD CONSTRAINT `BalanceSheets_statementId_fkey` FOREIGN KEY (`statementId`) REFERENCES `FinancialStatements`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
