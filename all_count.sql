SELECT count(*)
FROM companies c
INNER JOIN `financial_statements` fs
ON c.id = fs.company_id
INNER JOIN `balance_sheets` bs
ON fs.id = bs.statement_id
INNER JOIN `profit_loss_statements` pl
ON fs.id = pl.`statement_id`
-- WHERE c.code = 2830 AND fs.fiscal_year=2024