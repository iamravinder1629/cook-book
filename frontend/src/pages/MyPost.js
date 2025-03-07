import React, { useEffect, useState } from 'react'
import axios from 'axios';
import MyItemCard from '../components/MyItemCard'
import { useSelector } from "react-redux";

function MyPost() {
    const userId = useSelector((state) => state.auth.userId);

    const [mypost, setMypost] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/posts/mypost", { withCredentials: true })
            .then((response) => {
                setMypost(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error fetching posts:", error);
            });
    }, [])

    return (
        (
            <div className='row'>
                <h1 className='text-center'>My Posts</h1>
                {mypost.length > 0 ? mypost.map((post, index) => {
                    return <div
                        key={index}
                        className="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center">
                        <MyItemCard post={post} />
                    </div>
                }) : <p className='text-center my-5'>no post yet</p>
                }
            </div>
        )

    )
}

export default MyPost