import { Link, useLocation } from 'react-router-dom';
import { useUserStore } from '../Zustand/UserStore';

const Navbar = () => {
    const { pathname } = useLocation();
    const { user, logout } = useUserStore();

    if (pathname === '/login' || pathname === '/signup') {
        return null;
    }

    return (
        <div className="h-[60px] bg-sky-200 shadow-sm flex items-center px-6 py-2">
            <div className="flex justify-between w-full items-center">
                <h5 className="font-semibold text-xl text-gray-500">TodoList</h5>
                <div className="flex justify-center items-center md:gap-10 gap-2">
                    <div className="md:text-sm text-xs bg-yellow-200 px-5 py-1 rounded-md shadow-sm text-gray-500">
                        <p><span className="font-semibold">User:</span> {user?.username || 'Guest'}</p>
                        <p><span className="font-semibold">Role:</span> {user?.role || 'No role'}</p>
                    </div>
                    {user?._id ? (
                        <button
                            onClick={logout}
                            className="px-4 py-1 rounded-md font-semibold text-gray-600 bg-pink-200 hover:bg-pink-300 shadow-md"
                        >
                            <Link to="/login">
                                Logout
                            </Link>
                        </button>
                    ) : (
                        <Link to="/login">
                            <button className="px-3 py-1 rounded-full text-gray-600 bg-yellow-200 hover:bg-yellow-300">
                                Login
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;

