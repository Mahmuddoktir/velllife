import { useState } from 'react';
import { authAPI } from '../utils/api';

const ApiTest = () => {
  const [testResults, setTestResults] = useState({});
  const [loading, setLoading] = useState(false);

  const testLogin = async () => {
    setLoading(true);
    try {
      const result = await authAPI.login({
        email: 'test@example.com',
        password: 'password123',
        userType: 'jobseeker'
      });
      setTestResults(prev => ({ ...prev, login: { success: true, data: result } }));
    } catch (error) {
      setTestResults(prev => ({ ...prev, login: { success: false, error: error.message } }));
    }
    setLoading(false);
  };

  const testRegister = async () => {
    setLoading(true);
    try {
      const result = await authAPI.register({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        userType: 'jobseeker'
      });
      setTestResults(prev => ({ ...prev, register: { success: true, data: result } }));
    } catch (error) {
      setTestResults(prev => ({ ...prev, register: { success: false, error: error.message } }));
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">API Test</h2>
      
      <div className="space-y-4">
        <button
          onClick={testLogin}
          disabled={loading}
          className="btn-primary"
        >
          Test Login API
        </button>
        
        <button
          onClick={testRegister}
          disabled={loading}
          className="btn-primary"
        >
          Test Register API
        </button>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Results:</h3>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
          {JSON.stringify(testResults, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default ApiTest; 