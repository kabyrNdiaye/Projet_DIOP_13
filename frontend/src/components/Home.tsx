import React, { useState, useEffect } from 'react';
import { fetchArticles } from '../models/data';

interface Article {
  id: number;
  title: string;
  summary: string;
}

const Home: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const articlesPerPage = 6;

  useEffect(() => {
    fetchArticles().then(setArticles).catch(console.error);
  }, []);

  const indexOfLastArticle = (currentPage + 1) * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-news-blue to-gray-800 text-white font-sans">
      <header className="bg-news-blue/90 backdrop-blur-md p-6 mb-8 shadow-2xl">
        <h1 className="text-5xl font-extrabold tracking-wide animate-pulse">Actualités Explosives</h1>
        <p className="text-news-gray mt-2 opacity-80">Les news mondiales en temps réel</p>
      </header>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white/10 p-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-white/20"
            >
              <h2 className="text-xl font-bold text-news-accent mb-2">
                <a href={`/article/${article.id}`} className="hover:text-yellow-400 transition-colors">
                  {article.title}
                </a>
              </h2>
              <p className="text-gray-300 text-sm line-clamp-3">{article.summary}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 0}
            className="bg-news-accent text-white px-6 py-2 rounded-full disabled:opacity-50 hover:bg-yellow-500 transition-colors"
          >
            Précédent
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={indexOfLastArticle >= articles.length}
            className="bg-news-accent text-white px-6 py-2 rounded-full disabled:opacity-50 hover:bg-yellow-500 transition-colors"
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;