import AddComment from "./AddComment"
import {useState} from 'react'

const OnePost = ({ currentPost, setCurrentPost }) => {

    const [comments, setComments] = useState([])
    console.log("we are in the current post", currentPost)

    // need a fetch request to get the comments from the database


    const handleAnchorClick = () => {
        setCurrentPost(null)
    }
    return (
        <div className="postContainer">
        {currentPost.map((post) => {
            return(
            <div>
            <h2>{post.title}</h2>
            <h5>By {post.author}</h5>
            <p>{post.posted.slice(0, 10)} </p>
            <p>{post.content}</p>
            </div>)
        })}
            <AddComment post_id={currentPost[0].blog_id} setComments={setComments} />
            {comments.map((comment) => {
                return (<>
                <p>{comment.commenter_name}</p>
                <p>{comment.comment_text}</p>
                </>)
            })}
        <a href="#BlogPosts" onClick={handleAnchorClick}>Go Back</a>        
        </div>
    )
}

export default OnePost;