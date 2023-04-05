
const OnePost = ({ currentPost, setCurrentPost }) => {

    console.log("we are in the current post", currentPost)
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
        <a href="#BlogPosts" onClick={handleAnchorClick}>Go Back</a>        
        </div>
    )
}

export default OnePost;