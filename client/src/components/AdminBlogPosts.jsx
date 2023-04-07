import React, { useState, useEffect, useMemo } from 'react'
import Card from 'react-bootstrap/Card';
import OnePost from './OnePost';
import EditForm from './EditBlog';
import Delete from './DeleteBlog';
import AddBlog from './AddNewBlog';

const AdminPostsView = ({ setCurrentPost }) => {

    const [posts, setPosts] = useState([])
    // const [selectedBlog, setSelectedBlog] = useState(null)

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
        <AddBlog setPosts={setPosts} />
        {posts.map((post) => {
            // console.log(post.posted)
            return (
                <li key={post.blog_id}>
                    <Card className="card" style={{ padding: '0.6em', marginTop: '0.9em' }}>
                        <Card.Header>
                            Posted: {post.posted.slice(0, 10)} Last Edit: {post.edited}
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>
                                {post.title} 
                            </Card.Title>
                            <Card.Subtitle>
                                By: {post.author}
                            </Card.Subtitle>
                            <EditForm post={post} setPosts={setPosts} />
                            <Delete id={post.blog_id} setPosts={setPosts} />
                        </Card.Body>
                    </Card>
                </li>
            )
        })}
        </>
    )

    }
export default AdminPostsView;