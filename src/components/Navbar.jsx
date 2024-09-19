import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Navbar = ({ currentUser }) => {
    const navigate = useNavigate();

    return (
        <nav className="bg-gray-800 p-4">
            <ul className="flex space-x-4 mx-auto content-center justify-center">
                <div>
                    <Link to="/" className="text-white hover:text-gray-400">Home</Link>
                </div>
                <div>
                    <Link to="/games" className="text-white hover:text-gray-400">Games</Link>
                </div>
                <div>
                    <Link to="/reviews" className="text-white hover:text-gray-400">Reviews</Link>
                </div>
                <div>
                    {localStorage.getItem("rater_token") && (
                        <Link
                            to=""
                            onClick={() => {
                                localStorage.removeItem("rater_token");
                                navigate("/login", { replace: true });
                            }}
                            className="text-white hover:text-gray-400"
                        >
                            Logout
                        </Link>
                    )}
                </div>
            </ul>
        </nav>
    );
};