import axios from 'axios';
import { Link } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const signin = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      toast.success('Signin Successfully', {
        position: 'top-right',
        autoClose: 2000,
        theme: 'colored',
      });

      window.location.href = '/';
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.msg || 'Signin Failed', {
        position: 'top-right',
        autoClose: 5000,
        theme: 'colored',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {loading && <Loader />}
      <div className="bg-gray-800 px-10 py-10 rounded-xl">
        <div>
          <h1 className="text-center text-white text-xl mb-4 font-bold">Login</h1>
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Email"
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Password"
          />
        </div>
        <div className="flex justify-center mb-3">
          <button
            onClick={signin}
            className="bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg"
          >
            Login
          </button>
        </div>
        <div>
          <h2 className="text-white">
            Don't have an account?{' '}
            <Link className="text-yellow-500 font-bold" to="/signup">
              Signup
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Login;
