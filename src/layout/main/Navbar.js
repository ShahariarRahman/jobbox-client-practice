import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, useLocation } from "react-router-dom";
import { signOutUser } from "../../features/auth/authSlice";

const Navbar = () => {
  const { pathname } = useLocation();
  const {
    user: { email, role },
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOutUser());
  };
  return (
    <nav
      className={`h-14 fixed w-full z-[999] ${
        pathname === "/" ? null : "bg-white"
      }`}
    >
      <ul className="max-w-7xl mx-auto flex gap-3 h-full items-center">
        <li className="flex-auto font-semibold text-2xl">
          <button to="/">JobBox</button>
        </li>
        <li>
          <button className="hover:text-primary" to="/jobs">
            Jobs
          </button>
        </li>

        {email ? (
          <li>
            <button onClick={handleSignOut} className="hover:text-primary">
              Log Out
            </button>
          </li>
        ) : (
          <li>
            <Link
              className="border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all "
              to="/login"
            >
              Login
            </Link>
          </li>
        )}
        {email && role && (
          <li>
            <Link
              className="border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all "
              to="/dashboard"
            >
              Dashboard
            </Link>
          </li>
        )}
        {email && !role && (
          <li>
            <Link
              className="border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all "
              to="/register"
            >
              Get Started
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
