import { useAuth } from '../contexts/AuthContext';

const DebugInfo = () => {
  const { user, loading } = useAuth();

  return (
    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
      <h3 className="text-lg font-semibold text-yellow-800 mb-2">Debug Information</h3>
      <div className="text-sm text-yellow-700 space-y-1">
        <div><strong>Loading:</strong> {loading ? 'Yes' : 'No'}</div>
        <div><strong>User:</strong> {user ? 'Logged in' : 'Not logged in'}</div>
        {user && (
          <>
            <div><strong>User ID:</strong> {user.id}</div>
            <div><strong>Email:</strong> {user.email}</div>
            <div><strong>Name:</strong> {user.name}</div>
            <div><strong>User Type:</strong> {user.userType}</div>
            <div><strong>Token:</strong> {user.token ? 'Present' : 'Missing'}</div>
          </>
        )}
        <div><strong>Local Storage:</strong> {localStorage.getItem('user') ? 'Has data' : 'Empty'}</div>
      </div>
    </div>
  );
};

export default DebugInfo; 