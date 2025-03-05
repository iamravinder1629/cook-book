import React, { useEffect, useState } from 'react';
import ItemCard from '../components/ItemCard';
import axios from 'axios';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';


function Home() {
    const { userId } = useAuth();
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        if (userId) {
            axios.get("http://localhost:8080/api/posts")
                .then((response) => {
                    setPosts(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching posts:", error);
                });
        } else {
            alert("please login")
            navigate("/profile/login")
        }

    }, []);

    return (
        <>
            <h1 className="text-center my-4">Posts</h1>
            <div className="container">
                <div className="row">
                    {userId ? <p>Logged in as User ID: {userId}</p> : <p>Not logged in</p>}
                    {posts.length > 0 ?
                        (
                            posts.map((post) => (
                                <div key={post._id}
                                    className="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center">
                                    {/* {console.log(post)} */}
                                    <ItemCard post={post} />
                                </div>
                            ))
                        ) :
                        (
                            <p className="text-center">No posts available.</p>
                        )}
                </div>
            </div>
        </>
    );
}

export default Home;
