import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ItemCard from './ItemCard';

function FavItem() {
    const [favItems, setFavItems] = useState([]);


    useEffect(() => {

        const fetchFavorites = async () => {
            try {

                const { data } = await axios.get(`http://localhost:8080/api/user/fav`, { withCredentials: true });
                if (!data.fav || data.fav.length === 0) {
                    setFavItems([]);
                    return;
                }

                const itemRequests = data.fav.map((itemId) =>
                    axios.get(`http://localhost:8080/api/posts/${itemId}`, { withCredentials: true })
                );

                const responses = await Promise.all(itemRequests);
                setFavItems(responses.map((res) => res.data));
            } catch (error) {
                console.error("Error fetching favorite items:", error);
            }
        };

        fetchFavorites();


    }, []);


    return (
        <div className="row">
            <h1 className='text-center'>Favorite</h1>
            {favItems.length > 0 ? (
                favItems.map((post) => (
                    <div key={post._id} className="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center">
                        <ItemCard post={post} />
                    </div>
                ))
            ) : (
                <p className="text-center">No favorite posts available.</p>
            )}
        </div>
    );
}

export default FavItem;
