import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";
import Loader from "../helperComponent/Loader";

export default function Navbar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const toggleNav = (isOpen) => setIsOpen(!isOpen);
    const { state, dispatch } = useAuthContext();
    const [loading, setLoading] = useState(false);

    async function logOut() {

        try {
            setLoading(true)
            const response = await fetch('http://localhost:3000/api/logout', {
                method: 'POST',
                credentials: 'include',
            });

            const data = await response.json();

            navigate('/');

            if (response.ok) {
                setLoading(false)
                navigate('/');
                dispatch({ type: 'LOGOUT', payload: null });

            } else {
                setLoading(false);
                console.error('Failed to log out', data);
            }
        } catch (error) {
            setLoading(false);
            console.error('Logout request failed:', error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {loading ? <Loader message={"Logging Out"} /> : ""}
            <nav className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <button onClick={() => toggleNav(isOpen)} type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset" aria-controls="mobile-menu" aria-expanded="false">
                                <span className="absolute -inset-0.5"></span>
                                <span className="sr-only">Open main menu</span>

                                <svg className={isOpen ? "hidden size-6" : "block size-6"} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>

                                <svg className={isOpen ? "block size-6" : "hidden size-6"} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    <Link to="/" className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" aria-current="page">Homepage</Link>
                                    <Link to="/events" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Events</Link>
                                    {
                                        state.isLoggedIn
                                            ?
                                            <>
                                                <Link onClick={logOut} className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Logout</Link>
                                                <Link to="/createEvent" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Create Event</Link>
                                            </>
                                            :
                                            <>
                                                <Link to="/login" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Login</Link>
                                                <Link to="/signin" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">SignIn</Link>
                                            </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="sm:hidden" id="mobile-menu">
                    <div className={isOpen ? "space-y-1 px-2 pt-2 pb-3" : "hidden space-y-1 px-2 pt-2 pb-3"}>
                        <Link to="/" className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" aria-current="page">Homepage</Link>
                        <Link to="/events" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Events</Link>
                        {
                            state.isLoggedIn
                                ?
                                <>
                                    <Link onClick={logOut} className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Logout</Link>
                                    <Link to="/createEvent" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Create Event</Link>
                                </>
                                :
                                <>
                                    <Link to="/login" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Login</Link>
                                    <Link to="/signin" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">SignIn</Link>
                                </>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}