import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticlesByCategory } from '../models/data';

const CategoryList: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [articles, setArticles] = useState<{ id: number; title: string; summary: string; category: string; author: string; created_at: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      if (name) {
        const data = await fetchArticlesByCategory(name);
        console.log('Articles pour', name, ':', data); // Débogage
        setArticles(data);
        setLoading(false);
      }
    };
    loadArticles();
  }, [name]);

  if (loading) return <div className="text-center p-4">Chargement...</div>;
  if (!articles.length) return <div className="text-center p-4">Aucun article trouvé pour {name}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-news-blue to-gray-800 text-white font-sans p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Articles de {name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div key={article.id} className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold mb-2">
              <a href={`/article/${article.id}`} className="text-blue-300 hover:text-blue-100">
                {article.title}
              </a>
            </h2>
            <p className="text-gray-400 text-sm mb-2">Catégorie: {article.category}</p>
            <p className="text-gray-300 mb-2">{article.summary}</p>
            <p className="text-xs text-gray-500">Par {article.author} - {new Date(article.created_at).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;