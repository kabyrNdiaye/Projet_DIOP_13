 export const fetchArticlesByCategory = async (category: string): Promise<{ id: number; title: string; summary: string; category: string; author: string; created_at: string }[]> => {
  try {
    const response = await fetch(`http://localhost:3000/api/articles/category/${encodeURIComponent(category)}`);
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
    console.error('Erreur lors de la récupération des articles par catégorie:', error);
    return [];
  }}
  
export const fetchArticles = async (page: number = 1, limit: number = 3, category?: string): Promise<{ id: number; title: string; summary: string; category: string; author: string; created_at: string }[]> => {
  try {
    const offset = (page - 1) * limit;
    let url = `http://localhost:3000/api/articles?limit=${limit}&offset=${offset}&order=desc`;
    if (category) url += `&category=${encodeURIComponent(category)}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Erreur réseau');
    const data = await response.json();
    return data.map((item: any) => ({
      id: item.id,
      title: item.title,
      summary: item.summary,
      category: item.category, // Assure-toi que cela vient de la réponse
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