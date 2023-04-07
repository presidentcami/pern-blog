
import React, { useState, useReducer, useEffect } from 'react'
import { Button } from "react-bootstrap"
import * as ioicons from 'react-icons/io5'

const initialValue = {
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

const AddComment = ({ setComments, post_id, currentUser }) => {

    const [state, dispatch] = useReducer(reducer, initialValue);

    const inputAction = (event) => {
        event.preventDefault();

        dispatch({
            type: 'add',
            payload: { key: event.target.name, value: event.target.value },
        });
        console.log({...state, post_id: post_id, user_id: currentUser })
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
                body: JSON.stringify({ ...state, post_id: post_id, user_id: currentUser }),
            })
                .then((response) => response.json())
                .then(comments => {
                    // got this Map code from https://stackoverflow.com/a/58429784/20649462 and tested it out https://replit.com/@presidentcami/SpitefulGloriousMedian-1#index.js
                    const onlyUniqueComments = [...new Map(comments.map(item =>
                        [item['comment_text'], item])).values()];

                    setComments(onlyUniqueComments);
                    console.log('Comments fetched when new comment is added', comments);
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
            <form onSubmit={handleSubmit} id="addNewBlogForm">
                <div><label>Comment Text</label></div>
                <textarea
                    cols="96"
                    type="text-area"
                    id="add-new-comment"
                    name="comment_text"
                    placeholder='Leave a comment'
                    value={state.comment_text}
                    onChange={inputAction}
                />
                <section>
                    <Button type="submit" variant="outline" className='functionalButton' style={{ padding: '0.6em', marginTop: '0.9em' }}>Comment</Button>
                    <Button type="button" variant="outline" className='functionalButton' style={{ padding: '0.6em', marginTop: '0.9em', marginLeft: '0.9em' }}>Cancel</Button>
                </section>
            </form>
        </>
    );
};


export default AddComment
 