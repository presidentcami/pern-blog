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

    // function to put the blog post titles on screen in order by most recent to oldest
    posts.sort(function (a, b) {
        let postA = a.posted;
        let postB = b.posted;
        return (postA > postB) ? -1 : (postA < postB) ? 1 : 0;
    })

    return (
        <>
        {posts.map((post) => {
            return (
                <li key={post.blog_id}>
                <h1>{post.title} </h1>
                <h4>By: {post.author}</h4>
                <p>{post.content}</p>
                <h2>{post.highlight1}</h2>
                </li>
            )
        })}
        </>
    )
}

export default Posts;