import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const signup = async () => {
    if (!name || !email || !password) {
      return toast.error("All fields are required");
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Signup failed");
      }

      localStorage.setItem('token', data.token);
      toast.success('Signup Successful');
      window.location.href = '/login';
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      {loading && <Loader />}
      <div className='bg-gray-800 px-10 py-10 rounded-xl'>
        <div>
        <h1 className='text-center text-white text-xl mb-4 font-bold'>Signup</h1>
        </div>
        <div>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}  placeholder='Name'  className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        />
                         </div>
                         <div>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}  placeholder='Email'  className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'/>
        </div>
        <div>
        </div>
        <div>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none' placeholder='Password' />
        </div>
        <div>
        <button onClick={signup} className=' bg-red-500 w-full text-white font-bold  px-2 py-2 rounded-lg'>Signup</button>
        <h2 className='text-white'>Have an account? <Link className='text-red-500 font-bold' to={'/login'}>Login</Link></h2>
        
      </div>
    </div>
    </div>
  );
}

export default Signup;
