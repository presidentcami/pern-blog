import React, { useState, useReducer, useEffect } from 'react'
import { Button } from "react-bootstrap"
import * as ioicons from 'react-icons/io5'

const initialValue = {
    title: '',
    content: '',
    highlight1: '',
    highlight2: '',
    author: '',
    edited: '',
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'update':
            return {
                ...state,
                [action.payload.key]: action.payload.value,
            };
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
};

const EditForm = ({ post, setPosts }) => {

    const {  blog_id, title, content, highlight1, highlight2, author, edited } = post;

    const [state, dispatch] = useReducer(reducer, initialValue);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(current => !current);
    const handleShow = () => {
        initialValue.title = title;
        initialValue.content = content;
        initialValue.highlight1 = highlight1;
        initialValue.highlight2 = highlight2;
        initialValue.author = author;
        initialValue.edited = edited;
        console.log(initialValue)
        setShow(!show)

    };

    const inputAction = (event) => {
        event.preventDefault();

        dispatch({
            type: 'update',
            payload: { key: event.target.name, value: event.target.value },
        });
        console.log(state)
    };

    //A function to handle the post request
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            fetch(`http://localhost:8180/api/editblogpost/${blog_id}`, {
                method: "PUT",
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
            {show ? <>
                <form onSubmit={handleSubmit} id="editContactsForm">
                    <h3>Edit Post</h3>
                    <div><label>Title</label></div>
                    <input
                        type="text"
                        id="update-blog-title"
                        name="title"
                        defaultValue={title}
                        onChange={inputAction}
                    />
                    <div><label>Content</label></div>
                    <textarea
                        rows="13"
                        cols="96"
                        type="text-area"
                        id="update-content"
                        name="content"
                        defaultValue={content}
                        onChange={inputAction}
                    />
                    <div><label>Highlight 1</label></div>
                    <textarea
                        cols="96"
                        id="update-highlight-1"
                        name="highlight1"
                        defaultValue={highlight1}
                        onChange={inputAction}
                    />
                    <div><label>Highlight 2</label></div>
                    <textarea
                        cols="96"
                        id="update-highlight-1"
                        name="highlight2"
                        defaultValue={highlight2}
                        onChange={inputAction}
                    />
                    <div><label>Author</label></div>
                    <input
                        type="text"
                        id="update-blog-author"
                        name="author"
                        defaultValue={author}
                        onChange={inputAction}
                    />
                    <div><label>Date Updated</label></div>
                    <div>
                    <input
                        type="date"
                        id="add-date-edited"
                        name="edited"
                        required
                        onChange={inputAction}
                    />
                    </div>
                    <section>
                        <Button type="submit" variant="outline-success" style={{ padding: '0.6em', marginTop: '0.9em' }}>Submit Changes</Button>
                        <Button type="button" variant="outline-warning" onClick={handleClose} style={{ padding: '0.6em', marginTop: '0.9em' }}>Cancel</Button>
                    </section>
                </form>
            </> : <Button className='functionalButton' variant="outline" aria-label="Edit contact" onClick={handleShow} style={{ padding: '0.6em', marginRight: '0.9em', marginTop: '0.3em' }}> <ioicons.IoCreateOutline /> </Button>}


        </>
    );
};


export default EditForm