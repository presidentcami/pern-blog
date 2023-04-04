import React, { useState, useEffect } from 'react'

const Posts = () => {
    const [posts, setPosts] = useState([])
    const loadPosts = () => {
        // A function to fetch the list of students that will be load anytime that list change
        fetch("http://localhost:8180/api/posts")
            .then((response) => response.json())
            .then((posts) => {
                console.log(posts)
                setPosts(posts);
            });
    }

    useEffect(() => {
        loadPosts();
    }, []);

    return (
        <>
        {posts.map((post) => {
            return (
                <>
                <h1>{post.title}</h1>
                <h4>{post.author}</h4>
                <p>{post.content}</p>
                <h2>{post.highlight1}</h2>
                </>
            )
        })}
        </>
    )
}

export default Posts;