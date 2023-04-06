import AddComment from "./AddComment"
import { useState, useEffect } from 'react'

const OnePost = ({ currentPost, setCurrentPost }) => {

    const [comments, setComments] = useState([])
    console.log("we are in the current post", currentPost)

    // need a fetch request to get the comments from the database
    const loadComments = () => {
        // A function to fetch the list of students that will be load anytime that list change
        fetch("http://localhost:8180/api/comments")
            .then((response) => response.json())
            .then((comments) => {
                console.log(comments)
                setComments(comments);
            });
    }

    useEffect(() => {
        loadComments();
    }, []);

    const handleAnchorClick = () => {
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
            <AddComment post_id={currentPost[0].blog_id} setComments={setComments} />
            {comments.map((comment) => {
                return (<div key={comment.comment_id}>
                <p>{comment.commenter_name}</p>
                <p>{comment.comment_text}</p>
                </div>)
            })}
        <a href="#BlogPosts" onClick={handleAnchorClick}>Go Back</a>        
        </div>
    )
}

export default OnePost;