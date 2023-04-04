import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card';

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
                    <Card style={{ padding: '0.6em', marginTop: '0.9em' }}>
                        <Card.Header>
                            {post.posted}
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>
                                {post.title} 
                            </Card.Title>
                            <Card.Subtitle>
                                By: {post.author}
                            </Card.Subtitle>
                        </Card.Body>
                    </Card>
                </li>
            )
        })}
        </>
    )
}

export default Posts;