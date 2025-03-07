import React, { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import { useSelector } from "react-redux";

function Home() {
    const postsFromRedux = useSelector((state) => state.auth.posts);
    const [posts, setPosts] = useState([]);
    console.log("hahahha",posts)

    useEffect(() => {
        setPosts(postsFromRedux);
    }, [postsFromRedux]);

    return (
        <>
            <h1 className="text-center my-4">Posts</h1>
            <div className="container">
                <div className="row">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post._id} className="col-lg-4 col-md-6 col-sm-6 d-flex justify-content-center">
                                <ItemCard post={post} />
                            </div>
                        ))
                    ) : (
                        <p className="text-center">No posts found.</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default Home;