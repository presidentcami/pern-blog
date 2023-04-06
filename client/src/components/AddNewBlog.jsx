

import React, { useState, useReducer, useEffect } from 'react'
import { Button } from "react-bootstrap"
import * as ioicons from 'react-icons/io5'

const initialValue = {
    title: '',
    content: '',
    highlight1: '',
    highlight2: '',
    author: '',
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

const AddBlog = ({ setPosts }) => {

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
        console.log(state)
    };

    //A function to handle the post request
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            fetch('http://localhost:8180/api/newblog/', {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(state),
            })
                .then((response) => response.json())
                .then(post => {
                    setPosts(post);
                    console.log('Contacts fetched when new contact is added', post);
                    handleClose()
                })
                dispatch ({ type: 'reset', initialValue })
            // console.log(state)
            // window.location = "/"; 
        } catch (error) {
            console.error(error.message)
        }
    }

    // let someDate = new Date();
    // someDate.setDate(someDate.getDate() + 3);
    // let date = someDate.toISOString().substring(0, 10);

    return (
        <>
            <Button variant="outline-info" aria-label="Add Blog" onClick={handleShow} style={{ alignContent: 'center', width: '50em', padding: '0.6em', marginRight: '0.9em', marginTop: '0.3em' }}> Add a New Blog </Button>

            {show && <>
                <form onSubmit={handleSubmit} id="addNewBlogForm">
                    <h3>Add New Post</h3>
                    <div><label>Title</label></div>
                    <input
                        type="text"
                        id="add-new-blog-title"
                        name="title"
                        value={state.title}
                        onChange={inputAction}
                    />
                    <div><label>Content</label></div>
                    <textarea
                        rows="13"
                        cols="96"
                        type="text-area"
                        id="add-new-content"
                        name="content"
                        value={state.content}
                        onChange={inputAction}
                    />
                    <div><label>Highlight 1</label></div>
                    <textarea
                        cols="96"
                        id="add-new-highlight-1"
                        name="highlight1"
                        value={state.highlight1}
                        onChange={inputAction}
                    />
                    <div><label>Highlight 2</label></div>
                    <textarea
                        cols="96"
                        id="add-new-highlight-1"
                        name="highlight2"
                        value={state.highlight2}
                        onChange={inputAction}
                    />
                    <div><label>Author</label></div>
                    <input
                        type="text"
                        id="add-new-blog-author"
                        name="author"
                        value={state.author}
                        onChange={inputAction}
                    />
                    <section>
                        <Button type="submit" variant="outline-success" style={{ padding: '0.6em', marginTop: '0.9em' }}>Submit New Post</Button>
                        <Button type="button" variant="outline-warning" onClick={handleClose} style={{ padding: '0.6em', marginTop: '0.9em' }}>Cancel</Button>
                    </section>
                </form>
            </>}


        </>
    );
};


export default AddBlog

