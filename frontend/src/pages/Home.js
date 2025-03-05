import React, { useEffect, useState } from 'react';
import ItemCard from '../components/ItemCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

function Home() {
    const { searchResults, searchQuery, status } = useSelector((state) => state.auth);
    const userId = useSelector((state) => state.auth.userId);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
            alert("Please login");
            navigate("/profile/login");
            return;
        }

        if (searchQuery && searchResults.length >= 0) {
            setPosts(searchResults);

        } else {
            axios.get("http://localhost:8080/api/posts")
                .then((response) => {
                    setPosts(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching posts:", error);
                });
        }
    }, [searchResults, searchQuery, userId]);

    return (
        <>
            <h1 className="text-center my-4">Posts</h1>
            <div className="container">
                <div className="row">
                    {userId ? <p>Logged in as User ID: {userId}</p> : <p>Not logged in</p>}
                    {status === "loading" ? (
                        <p>Loading...</p>
                    ) : posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post._id} className="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center">
                                <ItemCard post={post} />
                            </div>
                        ))
                    ) : (
                        <p className="text-center">No results found.</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default Home;



