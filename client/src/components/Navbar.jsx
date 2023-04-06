import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Logo from '../assets/BlueTechtonicaWord.png'
import { useState, useEffect } from 'react';


function MyNavBar({ currentUser, setCurrentUser }) {

  const [users, setUsers] = useState([])
  const fetchUsers =() => {
    fetch("http://localhost:8180/api/users")
      .then((response) => response.json())
      .then((users) => {
        console.log(users)
        setUsers(users);
      });
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  
  return (
    <>
    <Navbar bg="dark" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand href="/">
        <img
              src={Logo}
              height="30"
              className="d-lg-inline-block"
              alt="React Bootstrap logo"
            />
        </Navbar.Brand>
        <Nav.Link >Your Link</Nav.Link>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Sign in as: 
              <select style={{ marginLeft: '0.9em' }} onChange={(e) => setCurrentUser(e.target.value)} >
                <option></option>
                    {users.map((user) => <option key={user.blog_user_id} value={user.blog_user_id} >{user.blog_username}</option>)}
                </select>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
};

export default MyNavBar;