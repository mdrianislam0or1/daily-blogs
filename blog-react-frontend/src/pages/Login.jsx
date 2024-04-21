import { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(null); // Clear previous errors
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });
      console.log('Login successful:', response.data);
      // Store email and token in localStorage
      localStorage.setItem('email', email);
      localStorage.setItem('token', response.data.token);
      // Redirect to create blog page
      navigate('/create');
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please check your credentials.'); // Set error message
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-96">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <input
        type="email"
        placeholder="Email"
        className="shadow appearance-none border rounded w-full py-2 px-3 mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="shadow appearance-none border rounded w-full py-2 px-3 mb-6"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Login
      </button>
    </div>
  </div>
  );
};

export default Login;
