SELECT table_schema AS database_name,
       ROUND(SUM(data_length) / 1024 / 1024, 2) AS data_size_mb,
       ROUND(SUM(index_length) / 1024 / 1024, 2) AS index_size_mb,
       ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS total_size_mb
FROM information_schema.tables
GROUP BY table_schema
ORDER BY total_size_mb DESC;