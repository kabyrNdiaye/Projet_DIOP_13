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
  const articlesPerPage = 5;

  useEffect(() => {
    fetchArticles().then(setArticles).catch(console.error);
  }, []);

  const indexOfLastArticle = (currentPage + 1) * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  return (
    <div className="min-h-screen bg-news-white p-6">
      <header className="bg-news-blue text-white p-4 mb-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold">Site d'Actualités</h1>
      </header>
      <div className="grid gap-6">
        {currentArticles.map((article) => (
          <div key={article.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-news-gray">
              <a href={`/article/${article.id}`} className="text-news-blue hover:underline">{article.title}</a>
            </h2>
            <p className="text-news-gray mt-2">{article.summary}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 0}
          className="bg-news-blue text-white px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-news-accent"
        >
          Précédent
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastArticle >= articles.length}
          className="bg-news-blue text-white px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-news-accent"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default Home;