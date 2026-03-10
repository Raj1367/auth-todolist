import { ChangeEvent, FormEvent, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '../Zustand/UserStore';

type SignupData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
};

const SignUp = () => {
  const navigate = useNavigate();

  // State
  const [signupData, setSignupData] = useState<SignupData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'general',
  });
  const [viewPassword, setViewPassword] = useState<boolean>(false);
  const [viewConfirmPassword, setViewConfirmPassword] = useState<boolean>(false);

  // Zustand
  const { signup, loading } = useUserStore();

  // Handlers
  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const viewPasswordHandler = () => {
    setViewPassword((prev) => !prev);
  };

  const viewConfirmPasswordHandler = () => {
    setViewConfirmPassword((prev) => !prev);
  };

  const signupDataSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    try {
      await signup(signupData);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }

    setSignupData({ username: '', email: '', password: '', confirmPassword: '', role: 'admin' });
  };

  return (
    <div className="flex items-center justify-center h-[90vh]">
      <div className="container w-[350px] border flex justify-center shadow-md p-3 rounded bg-white">
        <div className="flex flex-col justify-center items-center w-full">
          <form onSubmit={signupDataSubmitHandler} className="w-full text-gray-600">
            <div className="flex flex-col gap-4 mt-3 w-full">
              <div>
                <label htmlFor="username" className="text-md font-semibold">
                  Userame:
                </label>
                <input
                  className="border h-8 w-full rounded text-sm"
                  type="text"
                  name="username"
                  id="name"
                  value={signupData.username}
                  onChange={inputChangeHandler}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="text-md font-semibold">
                  Email:
                </label>
                <input
                  className="border h-8 w-full rounded text-sm"
                  type="email"
                  name="email"
                  id="email"
                  value={signupData.email}
                  onChange={inputChangeHandler}
                  required
                />
              </div>


              <div>
                <label htmlFor="password" className="text-md font-semibold">
                  Password:
                </label>
                <div className="relative">
                  <input
                    className="border h-8 w-full rounded text-sm"
                    type={viewPassword ? 'text' : 'password'}
                    name="password"
                    id="password"
                    value={signupData.password}
                    onChange={inputChangeHandler}
                    required
                  />
                  <span
                    className="absolute top-2 right-2 px-2 cursor-pointer"
                    onClick={viewPasswordHandler}
                  >
                    {viewPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="text-md font-semibold">
                  Confirm Password:
                </label>
                <div className="relative">
                  <input
                    className="border h-8 w-full rounded text-sm"
                    type={viewConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    id="confirmPassword"
                    value={signupData.confirmPassword}
                    onChange={inputChangeHandler}
                    required
                  />
                  <span
                    className="absolute top-2 right-2 px-2 cursor-pointer"
                    onClick={viewConfirmPasswordHandler}
                  >
                    {viewConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                className="bg-sky-300 px-4 py-2 text-white rounded shadow-md font-medium"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Signing up...' : 'Signup'}
              </button>
            </div>
          </form>

          <div className="flex justify-center mt-5 font-semibold">
            <p className="text-sm text-gray-600">
              Already have an account ?
              <Link to="/login">
                <span className="px-1 text-sky-400">Login</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
