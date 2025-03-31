import { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [devInfo, setDevInfo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setDevInfo(null);
    setLoading(true);

    try {
      console.log('Sending forgot password request for:', email);

      const response = await fetch('http://localhost:4000/api/auth/user/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log('Forgot password response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send reset email');
      }

      setMessage('Password reset email sent. Please check your inbox.');

      // If we're in development and have reset token info, show it
      if (data.resetToken && data.resetUrl) {
        setDevInfo({
          resetToken: data.resetToken,
          resetUrl: data.resetUrl
        });
      }

      setEmail('');
    } catch (error) {
      console.error('Forgot password error:', error);
      setError(error.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Forgot Password</h2>
        
        {error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {message && (
          <div className="bg-green-500 text-white p-3 rounded mb-4">
            {message}
          </div>
        )}

        {devInfo && (
          <div className="bg-blue-500 text-white p-3 rounded mb-4 text-sm">
            <p className="font-bold mb-1">Development Info:</p>
            <p className="mb-1">Reset Token: {devInfo.resetToken}</p>
            <p>Reset URL: <a href={devInfo.resetUrl} className="underline" target="_blank" rel="noopener noreferrer">{devInfo.resetUrl}</a></p>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-300 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition duration-200"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        
        <div className="mt-6 text-center text-gray-400">
          Remember your password?{' '}
          <Link to="/login" className="text-purple-400 hover:text-purple-300">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;