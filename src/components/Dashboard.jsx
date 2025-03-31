import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { name, email } = user || {};
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Welcome, {name || 'User'}!</h2>
        <p className="text-gray-300 text-center mb-2">
          You are successfully logged in.
        </p>
        
        {email && (
          <p className="text-gray-400 text-center mb-6">
            Email: {email}
          </p>
        )}
        
        <div className="text-center">
          <button
            onClick={handleLogout}
            className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;