import React, { useState, useReducer, useEffect } from 'react'
import { Button, Form } from "react-bootstrap"

const initialValue = {
    blog_username: ''
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

const AddUser = ({ setUsers }) => {


    const [state, dispatch] = useReducer(reducer, initialValue);

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
            fetch("http://localhost:8180/api/newuser/", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(state),
            })
                .then((response) => response.json())
                .then(user => {
                    setUsers(user);
                    console.log('users fetched when new user is added', user);

                })
            dispatch({ type: 'reset', initialValue })
            // console.log(state)
            // window.location = "/"; 
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <form onSubmit={handleSubmit} id="addUsersForm">

            <h3>Register for an Account</h3>
            <label>Create Username</label>
            <div style={{ marginTop: '0.9em'}} >
                <input
                type="text"
                id="add-username"
                name="blog_username"
                required
                value={state.blog_username}
                onChange={inputAction}
            />
            </div>
            <div>
            <Button type="submit" variant="outline" className='functionalButton' style={{ padding: '0.6em', marginTop: '0.9em' }}>Add User</Button> </div>
        </form>

    );
};


export default AddUser