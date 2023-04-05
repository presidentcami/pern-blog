
const OnePost = ({ currentPost }) => {

    console.log("we are in the current post", currentPost)
    return (
        <>
        {currentPost[0].title}
        </>
    )
}

export default OnePost;