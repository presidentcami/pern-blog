import AddComment from "./AddComment"
import { useState, useEffect } from 'react'

const OnePost = ({ currentPost, setCurrentPost, currentUser }) => {

    const [comments, setComments] = useState([])
    console.log("we are in the current post", currentPost, currentUser)

    // need a fetch request to get the comments from the database
    const loadComments = () => {
        // A function to fetch the list of students that will be load anytime that list change
        fetch("http://localhost:8180/api/comments")
            .then((response) => response.json())
            .then((comments) => {
                console.log('comments we are fetching', comments)
                setComments(comments.filter((comment) => comment.post_id == currentPost[0].blog_id));
            });
    }

    useEffect(() => {
        loadComments();
    }, []);

    const handleGoBackClick = () => {
        setCurrentPost(null)
    }

    return (
        <div className="postContainer">
        {currentPost.map((post) => {
            return(
            <div key={post.blog_id}>
            <h2>{post.title}</h2>
            <h5>By {post.author}</h5>
            <p>{post.posted.slice(0, 10)} </p>
            <p>{post.content}</p>
            </div>)
        })}
            <AddComment post_id={currentPost[0].blog_id} setComments={setComments} currentUser={currentUser} />
            {comments.map((comment) => {
                let t = comment.comment_posted.split(/[- :TZ]/)
                let d = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5])).toLocaleString();
                return (<div key={comment.comment_id} className="comment-card">
                <p>{comment.comment_text}</p>
                <p style={{ fontSize: '12px'}} >{comment.blog_username} {d}</p>
                </div>)
            })}
        <a href="#BlogPosts" onClick={handleGoBackClick}>Go Back</a>        
        </div>
    )
}

export default OnePost;