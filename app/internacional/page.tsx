import CategoryPage from '../components/CategoryPage';
import { noticiasInternacional } from '../data/noticias-completas';

const trendingTopics = [
  { name: 'Estados Unidos', count: '14.2K' },
  { name: 'China', count: '11.5K' },
  { name: 'Unión Europea', count: '9.8K' },
  { name: 'Brasil', count: '8.7K' },
  { name: 'Mercosur', count: '7.3K' },
];

export default function InternacionalPage() {
  return (
    <CategoryPage
      categoryName="Internacional"
      categorySlug="internacional"
      categoryColor="purple"
      description="Noticias internacionales: política mundial, relaciones exteriores de Argentina y actualidad global."
      noticias={noticiasInternacional}
      trendingTopics={trendingTopics}
    />
  );
}

