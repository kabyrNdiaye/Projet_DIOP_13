import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      const response = await fetch('http://localhost:3000/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data.map((c: any) => c.name));
      }
    };
    loadCategories();
  }, []);

  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="text-white hover:text-blue-300">Accueil</Link>
        </li>
        {categories.map((cat) => (
          <li key={cat}>
            <Link to={`/category/${cat}`} className="text-white hover:text-blue-300">
              {cat}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;