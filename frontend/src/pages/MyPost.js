import React, { useEffect, useState } from 'react'
import axios from 'axios';
import MyItemCard from '../components/MyItemCard'
import { useSelector } from "react-redux";

function MyPost() {
    const userId = useSelector((state) => state.auth.userId);

    const [mypost, setMypost] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/posts")
            .then((response) => {
                setMypost(response.data);
            })
            .catch((error) => {
                console.error("Error fetching posts:", error);
            });
    }, [])

    return (
        (userId ?
            <div className='row'>
                {mypost.map((post, index) => {
                    if (post.user_id._id === userId) {
                        return <div
                            key={index}
                            className="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center">
                            <MyItemCard post={post} />

                        </div>

                    } else {
                        <h1>NOT POSTED YET</h1>
                    }
                })
                }


            </div>
            :
            <h1>Please Login in</h1>
        )

    )
}

export default MyPost