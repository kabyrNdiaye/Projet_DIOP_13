export const fetchArticles = async (): Promise<{ id: number; title: string; summary: string }[]> => {
  return [
    { id: 1, title: "Article 1", summary: "Résumé 1" },
    { id: 2, title: "Article 2", summary: "Résumé 2" },
  ];
};

export const fetchArticleById = async (id: number): Promise<{ id: number; title: string; summary: string; content: string }> => {
  const articles = await fetchArticles();
  const article = articles.find((a) => a.id === id);
  return article ? { ...article, content: `<p>Contenu détaillé de l'article ${id}</p>` } : { id, title: "Non trouvé", summary: "", content: "" };
};