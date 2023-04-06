
import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import * as ioicons from 'react-icons/io5'

const Delete = ({id, setPosts}) => {

    // turn this component into just the delete button, then make another component for editing purposes


    const deleteRequest = async (e) => {
        console.log(id)
        e.preventDefault()
        try {
            fetch(`http://localhost:8180/api/delpost/${id}`, {
                method: "DELETE"
            })
                .then((response) => response.json())
                .then(posts => {
                    setPosts(posts);
                    console.log("id of deleted post", id, 'posts fetched when post is deleted', posts);
                })
        } catch (err) {
            console.err(err.message)
        }
    }
// onClick={deleteRequest}
    return (
        <Button variant="outline-danger" aria-label="Delete post"  style={{padding: '0.6em', marginRight:'0.9em', marginTop:'0.3em'}}><ioicons.IoTrash/></Button>
    )

}

export default Delete;
