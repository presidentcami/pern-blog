import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import MyNavBar from './components/Navbar'
import Posts from './components/BlogPosts'
import OnePost from './components/OnePost';
import AdminPostsView from './components/AdminBlogPosts';
import AddUser from './components/AddUserForm';


function App() {

  const [users, setUsers] = useState([])
  const [currentPost, setCurrentPost] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  
  console.log(currentUser)
  return (
    <div className="App">
      <MyNavBar users={users} setUsers={setUsers} currentUser={currentUser} setCurrentUser={setCurrentUser}  />
      
      {!currentUser ? <AddUser setUsers={setUsers} /> : currentUser == 1 ? <AdminPostsView /> : currentPost ? <OnePost currentPost={currentPost} setCurrentPost={setCurrentPost} currentUser={currentUser} /> : <Posts setCurrentPost={setCurrentPost} currentUser={currentUser} />}
      <footer style={{ height: '2em'}}></footer>
    </div>
  
  )
}

export default App
