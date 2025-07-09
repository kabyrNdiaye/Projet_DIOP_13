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

  if (!article) return <div className="p-6 text-news-gray">Chargement...</div>;

  return (
    <div className="min-h-screen bg-news-white p-6">
      <header className="bg-news-blue text-white p-4 mb-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold">Détail de l'Article</h1>
      </header>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-news-blue mb-4">{article.title}</h2>
        <p className="text-news-gray mb-4">{article.summary}</p>
        <div className="prose text-news-gray" dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>
      <a href="/" className="mt-6 inline-block bg-news-blue text-white px-4 py-2 rounded-lg hover:bg-news-accent">
        Retour à l'accueil
      </a>
    </div>
  );
};

export default ArticleDetail;