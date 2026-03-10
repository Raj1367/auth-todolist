import { ChangeEvent, FormEvent, useState } from 'react';
import { FaLock } from 'react-icons/fa6';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '../Zustand/UserStore';

type LoginData = {
    email: string;
    password: string;
};

const Login = () => {
    const navigate = useNavigate();

    // State
    const [loginData, setLoginData] = useState<LoginData>({ email: '', password: '' });
    const [viewPassword, setViewPassword] = useState<boolean>(false);

    // Zustand store
    const { login, loading } = useUserStore();

    // Handlers
    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const viewPasswordHandler = () => {
        setViewPassword((prev) => !prev);
    };

    const loginDataSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await login(loginData);
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } catch (error) {
            console.error(error);
        }

        setLoginData({ email: '', password: '' });
    };

    return (
        <div className="flex items-center justify-center h-[90vh]">
            <div className="container w-[350px] border flex justify-center shadow-md px-5 py-5 rounded bg-white">
                <div className="flex flex-col justify-center items-center w-full">
                    <div className="border-2 border-sky-300 rounded-full p-3 my-2 shadow-md">
                        <FaLock className="text-sky-300" fontSize={23} />
                    </div>

                    <form onSubmit={loginDataSubmitHandler} className="w-full text-gray-600">
                        <div className="flex flex-col gap-5">
                            <div>
                                <label htmlFor="email" className="text-md font-medium">
                                    Email:
                                </label>
                                <input
                                    placeholder="Enter email"
                                    className="border h-8 w-full rounded text-sm shadow-sm px-2"
                                    type="email"
                                    name="email"
                                    id="email"
                                    onChange={inputChangeHandler}
                                    value={loginData.email}
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="text-md font-medium">
                                    Password:
                                </label>
                                <div className="relative">
                                    <input
                                        placeholder="Enter password"
                                        className="border h-8 w-full rounded text-sm shadow-sm px-2"
                                        type={viewPassword ? 'text' : 'password'}
                                        name="password"
                                        id="password"
                                        value={loginData.password}
                                        onChange={inputChangeHandler}
                                    />
                                    <span
                                        className="absolute top-2 right-2 px-2 cursor-pointer"
                                        onClick={viewPasswordHandler}
                                    >
                                        {viewPassword ? <FaEye /> : <FaEyeSlash />}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center mt-6">
                            <button
                                className="bg-sky-300 px-4 py-2 text-white rounded shadow-md active:scale-95 transition-all"
                                type="submit"
                                disabled={loading}
                            >
                                <p className="text-sm font-medium">{loading ? 'Logging in...' : 'Login'}</p>
                            </button>
                        </div>
                    </form>

                    <div className="flex justify-center mt-5 font-semibold">
                        <p className="text-sm text-gray-600">
                            Don't have an account ?
                            <Link to="/signup">
                                <span className="px-1 text-sky-400">Signup</span>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
