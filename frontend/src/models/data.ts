import axios from 'axios';

export const fetchArticles = async (): Promise<{ id: number; title: string; summary: string }[]> => {
  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'fr', // Actualités en français, ajuste selon besoin
        apiKey: 'your_api_key', // Remplace par ta clé API
      },
    });
    return response.data.articles.map((article: any, index: number) => ({
      id: index + 1,
      title: article.title,
      summary: article.description || 'Pas de résumé disponible',
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error);
    return [];
  }
};

export const fetchArticleById = async (id: number): Promise<{ id: number; title: string; summary: string; content: string }> => {
  const articles = await fetchArticles();
  const article = articles.find((a) => a.id === id);
  return article
    ? { ...article, content: `<p>${article.summary || 'Contenu non disponible'}</p>` }
    : { id, title: 'Article non trouvé', summary: '', content: '' };
};