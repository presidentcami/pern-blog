const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const db = require('./db/db-connection.js');


const app = express();
const PORT = process.env.PORT || 8180;
app.use(cors());
app.use(express.json());

// creates an endpoint for the route "/""
app.get('/', (req, res) => {
    res.json({ message: 'Hola, from My template ExpressJS with React-Vite' });
});

// create the get request for blog posts in the endpoint '/api/posts'
app.get('/api/posts', async (req, res) => {
    try {
        const { rows: posts } = await db.query('SELECT * FROM blog_posts');
        res.send(posts);
    } catch (e) {
        return res.status(400).json({ e });
    }
});

// get one blog post
app.get('/api/onepost/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { rows: post } = await db.query('SELECT * FROM blog_posts WHERE blog_id=$1', [id]);
        res.send(post)
    } catch (err) {
        console.error(err.message)
    }
})

// create the get request for blog posts in the endpoint '/api/posts'
app.get('/api/users', async (req, res) => {
    try {
        const { rows: users } = await db.query('SELECT * FROM blog_users');
        res.send(users);
    } catch (e) {
        return res.status(400).json({ e });
    }
});

// get one blog post
app.get('/api/oneuser/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { rows: user } = await db.query('SELECT * FROM blog_users WHERE blog_user_id=$1', [id]);
        res.send(user)
    } catch (err) {
        console.error(err.message)
    }
})

// create the POST request
app.post('/api/students', async (req, res) => {
    try {
        const newStudent = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            iscurrent: req.body.iscurrent
        };
        //console.log([newStudent.firstname, newStudent.lastname, newStudent.iscurrent]);
        const result = await db.query(
            'INSERT INTO students(firstname, lastname, is_current) VALUES($1, $2, $3) RETURNING *',
            [newStudent.firstname, newStudent.lastname, newStudent.iscurrent],
        );
        console.log(result.rows[0]);
        res.json(result.rows[0]);

    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }

});

// delete request for students
app.delete('/api/delpost/:blogid', async (req, res) => {
    try {
        const {blogid} = req.params;
        await db.query('DELETE FROM blog_posts WHERE blog_id=$1', [blogid]);
        console.log("From the delete request-url", blogid);
        // res.status(200).end();
        const { rows: posts } = await db.query('SELECT * FROM blog_posts');
        res.send(posts);
    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });

    }
});

//A put request - Update a blog post 
app.put('/api/editblogpost/:blogid', async (req, res) => {
    //console.log(req.params);

    const { blogid } = req.params
    const { title, content, highlight1, highlight2, author, edited } = req.body;

    console.log("In the server from the url - the blog id", blogid);
    console.log("In the server, from the react - the blog to be edited", req.body);
    // UPDATE students SET lastname = "something" WHERE id="16";
    const query = `UPDATE blog_posts SET title=$1, content=$2, highlight1=$3, highlight2=$4, author=$5, edited=$6 WHERE blog_id=${blogid} RETURNING *`;
    const values = [title, content, highlight1, highlight2, author, edited];
    try {
        const updated = await db.query(query, values);
        console.log(updated.rows[0]);

        const { rows: posts } = await db.query('SELECT * FROM blog_posts');
        res.send(posts);
    } catch (e) {
        console.log(e);
        return res.status(400).json({ e })
    }
})


// console.log that your server is up and running
app.listen(PORT, () => {
    console.log(`Hola, Server listening on ${PORT}`);
});