-- stock_amountカラムの型をbigintからDECIMAL(15,2)に変更
ALTER TABLE `FinancialStatements` MODIFY COLUMN `stock_amount` DECIMAL(15,2);

-- NULLの値を0に更新
UPDATE `FinancialStatements` SET `stock_amount` = 0 WHERE `stock_amount` IS NULL;

-- NOT NULL制約を追加
ALTER TABLE `FinancialStatements` MODIFY COLUMN `stock_amount` DECIMAL(15,2) NOT NULL;