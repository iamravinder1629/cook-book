import React from 'react';
import axios from 'axios'
import { Outlet } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import { FaSignInAlt } from "react-icons/fa";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

function Profile() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/logout", {
                withCredentials: true
            });

            alert(response.data.message);
            navigate("/profile/login");
        } catch (error) {
            console.error("Error logging out:", error);
            alert("Logout failed: " + (error.response?.data?.message || "An error occurred."));
        }
    };

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



                    <NavLink
                        to="/profile/login"
                        className={({ isActive }) => (isActive ? 'nav-link text-warning' : 'nav-link')}
                    >
                        <button className="btn btn-dark ms-3" onClick={handleLogout}>
                            Logout
                        </button>
                    </NavLink>
                </Nav>
                <Outlet />
            </div>
        </>
    );
}

export default Profile;
