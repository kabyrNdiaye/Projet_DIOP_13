import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ArticleDetail from './components/ArticleDetail';
import Navbar from './components/Navbar';
import CategoryList from './components/CategoryList';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
        <Route path="/category/:name" element={<CategoryList />} />
      </Routes>
    </Router>
  );
}

export default App;