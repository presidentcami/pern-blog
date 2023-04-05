
const OnePost = ({ currentPost, setCurrentPost }) => {

    console.log("we are in the current post", currentPost)
    const handleAnchorClick = () => {
        setCurrentPost(null)
    }
    return (
        <>
        {currentPost.map((post) => {
            
        })}
        <a href="#BlogPosts" onClick={handleAnchorClick}>Go Back</a>        
        </>
    )
}

export default OnePost;