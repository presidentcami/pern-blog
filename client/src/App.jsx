import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavBar from './components/Navbar'
import Posts from './components/BlogPosts'


function App() {

  return (
    <div className="App">
      <MyNavBar />
      <Posts />

    </div>
  )
}

export default App
