SELECT *
FROM companies c
INNER JOIN `financial_statements` fs
ON c.id = fs.company_id
INNER JOIN `balance_sheets` bs
ON fs.id = bs.statement_id
INNER JOIN `profit_loss_statements` pl
ON fs.id = pl.`statement_id`
INNER JOIN `cash_flow_statements` cfs
ON fs.id = cfs.`statement_id`
INNER JOIN `debt_statements` ds
ON fs.id = ds.`statement_id`
INNER JOIN `capital_expenditures` ce
ON fs.id = ce.`statement_id`
WHERE c.code = 2830 AND fs.fiscal_year=2024