import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for handling API calls with loading and error states
 * @param {Function} apiFunction - The API function to call
 * @param {Array} dependencies - Dependencies to trigger the API call (optional)
 * @param {boolean} executeOnMount - Whether to execute the API call on component mount
 * @param {any} initialData - Initial data
 * @returns {Object} { data, loading, error, execute }
 */
const useApi = (apiFunction, dependencies = [], executeOnMount = true, initialData = null) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(executeOnMount);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction(...args);
      setData(result);
      return result;
    } catch (error) {
      setError(error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  useEffect(() => {
    if (executeOnMount) {
      execute();
    }
  }, [...dependencies, execute]);

  return { data, loading, error, execute };
};

export default useApi;