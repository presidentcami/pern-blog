
import React, { useState, useReducer, useEffect } from 'react'
import { Button } from "react-bootstrap"
import * as ioicons from 'react-icons/io5'

const initialValue = {
    commenter_name: '',
    comment_text: '',
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'add':
            return {
                ...state,
                [action.payload.key]: action.payload.value,
            };
        case 'reset': 
            return { ...initialValue } 
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
};

const AddComment = ({ setComments, post_id }) => {

    const [state, dispatch] = useReducer(reducer, initialValue);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(current => !current);
    const handleShow = () => {
        // console.log(initialValue)
        setShow(!show)

    };

    const inputAction = (event) => {
        event.preventDefault();

        dispatch({
            type: 'add',
            payload: { key: event.target.name, value: event.target.value },
        });
        console.log({...state, post_id: post_id})
    };

    //A function to handle the post request
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(...state, {post_id: post_id})
        try {
            fetch('http://localhost:8180/api/newcomment/', {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...state, post_id: post_id }),
            })
                .then((response) => response.json())
                .then(comment => {
                    setComments(comment);
                    console.log('Comments fetched when new comment is added', comment);
                    handleClose()
                })
                dispatch ({ type: 'reset', initialValue })
            // console.log(state)
            // window.location = "/"; 
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <>
            {/* <Button variant="outline-info" aria-label="Add Comment" onClick={handleShow} style={{ alignContent: 'center', width: '50em', padding: '0.6em', marginRight: '0.9em', marginTop: '0.3em' }}> Comment </Button> */}

            {show ? <>
                <form onSubmit={handleSubmit} id="addNewBlogForm">
                    <h3>Leave a Comment!</h3>
                    <div><label>Your Name</label></div>
                    <input
                        type="text"
                        id="commenter-name"
                        name="commenter_name"
                        value={state.commenter_name}
                        onChange={inputAction}
                    />
                    <div><label>Comment Text</label></div>
                    <textarea
                        cols="96"
                        type="text-area"
                        id="add-new-comment"
                        name="comment_text"
                        value={state.comment_text}
                        onChange={inputAction}
                    />
                    <section>
                        <Button type="submit" variant="outline-success" style={{ padding: '0.6em', marginTop: '0.9em' }}>Comment</Button>
                        <Button type="button" variant="outline-warning" onClick={handleClose} style={{ padding: '0.6em', marginTop: '0.9em', marginLeft: '0.9em' }}>Cancel</Button>
                    </section>
                </form>
            </> : <Button variant="outline-info" aria-label="Add Comment" onClick={handleShow} style={{ alignContent: 'center', width: '50em', padding: '0.6em', marginRight: '0.9em', marginTop: '0.3em' }}> Comment </Button>}


        </>
    );
};


export default AddComment
 