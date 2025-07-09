export const fetchArticles = async (): Promise<{ id: number; title: string; summary: string; category: string; author: string; created_at: string }[]> => {
  try {
    const response = await fetch('http://localhost:3000/api/articles');
    if (!response.ok) throw new Error('Erreur réseau');
    const data = await response.json();
    return data.map((item: any) => ({
      id: item.id,
      title: item.title,
      summary: item.summary,
      category: item.category,
      author: item.author,
      created_at: item.created_at,
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error);
    return [];
  }
};

export const fetchArticleById = async (id: number): Promise<{ id: number; title: string; summary: string; content: string; category: string; author: string; created_at: string }> => {
  try {
    const response = await fetch(`http://localhost:3000/api/articles/${id}`);
    if (!response.ok) throw new Error('Erreur réseau');
    const data = await response.json();
    return {
      id: data.id,
      title: data.title,
      summary: data.summary,
      content: data.content,
      category: data.category,
      author: data.author,
      created_at: data.created_at,
    };
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'article:', error);
    return { id, title: 'Article non trouvé', summary: '', content: '', category: '', author: '', created_at: '' };
  }
};