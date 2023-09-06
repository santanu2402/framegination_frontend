import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';

const GetPost = () => {
    const [posts, setPosts] = useState([]); // Initialize with an empty array

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const token = localStorage.getItem('auth-token');
            const response = await fetch('https://framegination.onrender.com/api/v1/post', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            if (response.ok) {
                const result = await response.json();
                setPosts(result.data.reverse());
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <h1 className="font-extrabold text-[#222328] text-[32px]">Gallery</h1>
            {posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {posts.map((post) => (
                        <Card
                            key={post._id}
                            _id={post._id}
                            name={post.name}
                            prompt={post.prompt}
                            photo={post.photo}
                        />
                    ))}
                </div>
            ) : (
                <p>No posts available.</p>
            )}
        </>
    );
};

export default GetPost;
