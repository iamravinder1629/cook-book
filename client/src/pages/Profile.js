import React from 'react'
import { NavLink } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import { FaSignInAlt } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { MdFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";

function Profile() {
    const { userId } = useAuth();

    return (
        <>
            <div className="container">
                <Nav className="d-flex justify-content-center">
                    <NavLink
                        to="/profile/login"
                        className={({ isActive }) => (isActive ? 'nav-link text-warning' : 'nav-link')}
                    >
                        <button className="btn btn-dark">
                            Sign-up/Login  <FaSignInAlt />
                        </button>
                    </NavLink>

                    <NavLink
                        to="/profile/mypost"
                        className={({ isActive }) => (isActive ? 'nav-link text-warning' : 'nav-link')}
                    >
                        <button className="btn btn-dark">
                            My posts
                        </button>
                    </NavLink>
                    <NavLink
                        to="/profile/fav"
                        className={({ isActive }) => (isActive ? 'nav-link text-warning' : 'nav-link')}
                    >
                        <button className="btn btn-dark">
                            <MdFavorite />
                                                    <MdFavoriteBorder />
                        </button>
                    </NavLink>

                </Nav>
                <Outlet />
            </div>
        </>
    )
}

export default Profile
