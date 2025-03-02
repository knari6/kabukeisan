SELECT 
  b.id,
  c.name,
  c.code,
  f.company_id,
  b.statement_id
FROM BalanceSheet b
INNER JOIN FinancialStatements f ON b.statement_id = f.id
INNER JOIN Companies c ON f.company_id = c.id;