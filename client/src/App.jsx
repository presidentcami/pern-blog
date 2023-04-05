import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import MyNavBar from './components/Navbar'
import Posts from './components/BlogPosts'
import OnePost from './components/OnePost';


function App() {

  const [currentPost, setCurrentPost] = useState(null)

  return (
    <div className="App">
      <MyNavBar />
      {currentPost ? <OnePost currentPost={currentPost} setCurrentPost={setCurrentPost} /> : <Posts setCurrentPost={setCurrentPost} />}

    </div>
  )
}

export default App
