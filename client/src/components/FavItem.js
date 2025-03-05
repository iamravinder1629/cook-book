import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import ItemCard from './ItemCard';

function FavItem() {
    const [favItems, setFavItems] = useState([]);
    const { userId } = useAuth();

    useEffect(() => {
        if (!userId) return;

        const fetchFavorites = async () => {
            try {

                const { data } = await axios.get(`http://localhost:8080/api/user/fav/${userId}`);

                if (!data.fav || data.fav.length === 0) {
                    setFavItems([]);
                    return;
                }

                const itemRequests = data.fav.map((itemId) =>
                    axios.get(`http://localhost:8080/api/posts/${itemId}`)
                );

                const responses = await Promise.all(itemRequests);
                console.log(responses)
                setFavItems(responses.map((res) => res.data));
            } catch (error) {
                console.error("Error fetching favorite items:", error);
            }
        };

        fetchFavorites();
    }, [userId]);


    return (
        <div className="row">
            {favItems.length > 0 ? (
                favItems.map((post) => (
                    <div key={post._id} className="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center">
                        <ItemCard post={post} />
                        {/* {console.log(post)} */}
                    </div>
                ))
            ) : (
                <p className="text-center">No favorite posts available.</p>
            )}
        </div>
    );
}

export default FavItem;
