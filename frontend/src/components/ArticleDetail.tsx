import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticleById } from '../models/data';

interface Article {
  id: number;
  title: string;
  summary: string;
  content: string;
}

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (id) {
      fetchArticleById(parseInt(id)).then(setArticle).catch(console.error);
    }
  }, [id]);

  if (!article) return <div className="p-6 text-gray-300">Chargement...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-news-blue to-gray-800 text-white font-sans">
      <header className="bg-news-blue/90 backdrop-blur-md p-6 mb-8 shadow-2xl">
        <h1 className="text-4xl font-extrabold">Détail Explosif</h1>
      </header>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white/10 p-8 rounded-xl shadow-lg border border-white/20">
          <h2 className="text-4xl font-bold text-yellow-400 mb-6">{article.title}</h2>
          <p className="text-gray-300 mb-6">{article.summary}</p>
          <div className="prose text-gray-200 max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
          <a
            href="/"
            className="mt-8 inline-block bg-news-accent text-white px-6 py-3 rounded-full hover:bg-yellow-500 transition-colors"
          >
            Retour aux news
          </a>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;