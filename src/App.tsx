import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { BlogPost } from './pages/BlogPost'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
    </Routes>
  )
}

export default App

