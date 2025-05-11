using Dapper;
using Database;
using Services.Common;

public class DapperService : IScopedInjectable
{
    private readonly HotelChainContext _dataContext;

    public DapperService(HotelChainContext dataContext)
    {
        _dataContext = dataContext;
    }

    // Single Query for multiple rows
    public IEnumerable<T> Query<T>(string sql, object param = null)
    {
        using (var connection = _dataContext.CreateConnection())
        {
            return connection.Query<T>(sql, param);
        }
    }

    // Query for a single object (returns a single row)
    public T QuerySingle<T>(string sql, object param = null)
    {
        using (var connection = _dataContext.CreateConnection())
        {
            return connection.QuerySingleOrDefault<T>(sql, param);
        }
    }

    // Execute a non-query (INSERT, UPDATE, DELETE)
    public int Execute(string sql, object param = null)
    {
        using (var connection = _dataContext.CreateConnection())
        {
            return connection.Execute(sql, param);
        }
    }

    // Execute multiple queries in one call (useful for SELECT with different results)
    public (IEnumerable<T1>, IEnumerable<T2>) QueryMultiple<T1, T2>(string sql, object param = null)
    {
        using (var connection = _dataContext.CreateConnection())
        {
            using (var multi = connection.QueryMultiple(sql, param))
            {
                var result1 = multi.Read<T1>().ToList();
                var result2 = multi.Read<T2>().ToList();
                return (result1, result2);
            }
        }
    }

    // Execute multiple queries in one call (useful for SELECT with more than two result types)
    public (IEnumerable<T1>, IEnumerable<T2>, IEnumerable<T3>) QueryMultiple<T1, T2, T3>(string sql, object param = null)
    {
        using (var connection = _dataContext.CreateConnection())
        {
            using (var multi = connection.QueryMultiple(sql, param))
            {
                var result1 = multi.Read<T1>().ToList();
                var result2 = multi.Read<T2>().ToList();
                var result3 = multi.Read<T3>().ToList();
                return (result1, result2, result3);
            }
        }
    }

    // Asynchronous query for multiple rows
    public async Task<IEnumerable<T>> QueryAsync<T>(string sql, object param = null)
    {
        using (var connection = _dataContext.CreateConnection())
        {
            return await connection.QueryAsync<T>(sql, param);
        }
    }

    // Asynchronous query for a single row
    public async Task<T> QuerySingleAsync<T>(string sql, object param = null)
    {
        using (var connection = _dataContext.CreateConnection())
        {
            return await connection.QuerySingleOrDefaultAsync<T>(sql, param);
        }
    }

    // Asynchronous Execute (non-query)
    public async Task<int> ExecuteAsync(string sql, object param = null)
    {
        using (var connection = _dataContext.CreateConnection())
        {
            return await connection.ExecuteAsync(sql, param);
        }
    }

    // Using transactions for multiple operations
    public int ExecuteTransaction(IEnumerable<string> sqls, object param = null)
    {
        using (var connection = _dataContext.CreateConnection())
        using (var transaction = connection.BeginTransaction())
        {
            try
            {
                foreach (var sql in sqls)
                {
                    connection.Execute(sql, param, transaction);
                }
                transaction.Commit();
                return sqls.Count();
            }
            catch
            {
                transaction.Rollback();
                throw;
            }
        }
    }
}
