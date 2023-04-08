import React, { useState, useEffect, useMemo } from 'react'
import Card from 'react-bootstrap/Card';
import * as ioicons from 'react-icons/io5'

const Posts = ({ setCurrentPost }) => {

    const [posts, setPosts] = useState([])
  

    const loadPosts = () => {
        const commentsByPostId = {}
        fetch("http://localhost:8180/api/comments")
            .then((response) => response.json())
            .then((comments) => {
                console.log('comments we are fetching', comments)
                
                comments.forEach((comment) => {
                    if (!commentsByPostId[comment.post_id]) {
                        commentsByPostId[comment.post_id] = [];
                    }
                    commentsByPostId[comment.post_id].push(comment)
                })
                console.log('comments by post id from comments fetch request', commentsByPostId)
            })
            .then(() => {
                fetch("http://localhost:8180/api/posts")
                    .then((response) => response.json())
                    .then((posts) => {
                        const postsWithComments = []
                        posts.forEach((post) => {
                            post.comments = commentsByPostId[post.blog_id]
                            postsWithComments.push(post)
                        })

                        console.log("posts with comments obj", postsWithComments)
                        setPosts(postsWithComments);
                    });
            });
            
        // A function to fetch the list of students that will be load anytime that list change

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

    const handleSelectedBlog = (id) => {
        // e.preventDefault()
        console.log(id)
        fetch(`http://localhost:8180/api/onepost/${id}`)
        .then((response) => response.json())
        .then((post) => {
            setCurrentPost(post);
            console.log("currentpost", post)
        });
}
    

    return (
        <>
        <h1 style={{marginLeft: '5em'}}>Blogs</h1>
        {posts.map((post) => {
            // console.log(post.posted)
            let t = post.posted.split(/[- :TZ]/)
            let date = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5])).toLocaleDateString();
            return (
                <li key={post.blog_id}>
                    <Card style={{ padding: '0.6em', marginTop: '0.9em' }} className='onClick card' onClick={() =>  handleSelectedBlog(post.blog_id)}>
                        <Card.Header>
                            {date}
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>
                                {post.title} 
                            </Card.Title>
                            <Card.Subtitle>
                                By: {post.author}
                            </Card.Subtitle>
                            <Card.Text>{post.content.slice(0, 110)}</Card.Text>
                            <Card.Text><ioicons.IoChatboxSharp style={{ fontSize: '24px', marginRight: '0.2em'}} />{post.comments.length}</Card.Text>
                        </Card.Body>
                    </Card>
                </li>
            )
        })}
        </>
    )

    }
export default Posts;